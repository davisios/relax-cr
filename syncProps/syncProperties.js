#!/usr/bin/env node
/**
 * syncProperties.js
 *
 * Rebuilds web/properties.json from the remax-ocr.com public WordPress REST API.
 * Covers every published listing on the office site, regardless of agent —
 * no per-agent CSV exports to maintain.
 *
 * Sources per listing:
 *   - /wp-json/wp/v2/estate_property  → id, slug, title, content, taxonomies
 *   - /wp-json/wp/v2/media?parent=ID  → gallery photos with alt text
 *   - the listing page HTML           → price, beds/baths, sizes, year,
 *                                       coordinates, agent (not in the REST API)
 *
 * Run manually every Monday:
 *   node syncProps/syncProperties.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const BASE = "https://remax-ocr.com";
const OUTPUT_PATH = path.join(__dirname, "..", "web", "properties.json");
const AUDIT_LOG_PATH = path.join(__dirname, "audit.log");
const CONCURRENCY = 6;

// Agents whose listings should not appear on the site (matched by the
// /agents/<slug> link on each listing page).
const EXCLUDED_AGENT_SLUGS = new Set(["alexandrakleinow", "timothygiannone"]);

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

function fetchText(url, redirectCount = 0) {
  if (redirectCount > 5) return Promise.reject(new Error("Too many redirects"));
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (relaxcostarica sync)" } }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        const location = res.headers["location"];
        if (!location) return reject(new Error("Redirect with no Location header"));
        res.resume();
        return resolve(fetchText(new URL(location, url).href, redirectCount + 1));
      }
      if (res.statusCode >= 400) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error(`Timeout for ${url}`));
    });
  });
}

/** fetchText with retries — the office server occasionally times out under load. */
async function fetchTextRetry(url, tries = 3) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fetchText(url);
    } catch (err) {
      if (attempt >= tries || String(err.message).includes("HTTP 4")) throw err;
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

async function fetchJson(url) {
  return JSON.parse(await fetchTextRetry(url));
}

/** Fetch every page of a paginated REST collection. */
async function fetchAllPages(pathAndQuery) {
  const results = [];
  for (let page = 1; ; page++) {
    const sep = pathAndQuery.includes("?") ? "&" : "?";
    let batch;
    try {
      batch = await fetchJson(`${BASE}${pathAndQuery}${sep}per_page=100&page=${page}`);
    } catch (err) {
      // WP returns 400 when paging past the last page
      if (String(err.message).includes("HTTP 400")) break;
      throw err;
    }
    if (!Array.isArray(batch) || batch.length === 0) break;
    results.push(...batch);
    if (batch.length < 100) break;
  }
  return results;
}

/** Run tasks with a fixed concurrency limit. */
async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

// ─── HTML → text ──────────────────────────────────────────────────────────────

function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function htmlToText(html) {
  if (!html) return "";
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<\/(h[1-6]|li|div)>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ─── Listing page scraping (fields the REST API does not expose) ─────────────

function pageDetail(html, label) {
  let m = html.match(new RegExp(`<strong>\\s*${label}\\s*:?\\s*</strong>\\s*([^<]+)`, "i"));
  if (m && m[1].trim()) return decodeEntities(m[1].trim());
  m = html.match(new RegExp(`${label}\\s*:\\s*</[^>]+>\\s*<[^>]+>([^<]+)`, "i"));
  return m ? decodeEntities(m[1].trim()) : "";
}

function parseNumber(text) {
  const m = String(text).replace(/,/g, "").match(/[\d.]+/);
  return m ? parseFloat(m[0]) : null;
}

function scrapeListingPage(html) {
  const priceMatch = html.match(/price_area\">\s*\$?\s*([\d,]+)/);
  // The listing's own pin is in data-cur_lat/long on the map shortcode.
  // ("general_latitude" is the theme's site-wide default — same on every page.)
  const latMatch = html.match(/data-cur_lat="(-?[\d.]+)"/);
  const lngMatch = html.match(/data-cur_long="(-?[\d.]+)"/);
  const agentMatch = html.match(/\/agents\/([a-z0-9-]+)/);

  return {
    price: priceMatch ? parseFloat(priceMatch[1].replace(/,/g, "")) : null,
    bedrooms: parseNumber(pageDetail(html, "Bedrooms")),
    bathrooms: parseNumber(pageDetail(html, "Bathrooms")),
    size: parseNumber(pageDetail(html, "Property Size")),
    lotSize: parseNumber(pageDetail(html, "Lot Size")),
    year: parseNumber(pageDetail(html, "Year Built")),
    garages: pageDetail(html, "Garages") || null,
    address: pageDetail(html, "Address") || null,
    latitude: latMatch ? parseFloat(latMatch[1]) : null,
    longitude: lngMatch ? parseFloat(lngMatch[1]) : null,
    agentSlug: agentMatch ? agentMatch[1] : null,
  };
}

function agentNameFromSlug(slug) {
  if (!slug) return "";
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── Category / status mapping (same targets as before) ──────────────────────

function inferCategory(name) {
  const cat = (name || "").toLowerCase();
  if (cat.includes("condo") || cat.includes("apartment")) return { name: "Condo | Apartment", slug: "condo-apartment" };
  if (cat.includes("lot") || cat.includes("land") || cat.includes("vacant")) return { name: "Lot | Vacant Land", slug: "lot-vacant-land" };
  if (cat.includes("multi") || cat.includes("duplex")) return { name: "Multi-family | Duplex", slug: "multi-family-duplex-triplex" };
  if (cat.includes("hotel") || cat.includes("bnb") || cat.includes("hospitality")) return { name: "Hotel | BNB", slug: "hotel-bnb-apt-building" };
  if (cat.includes("commercial") || cat.includes("office")) return { name: "Commercial", slug: "commercial-building-office-space-warehouse" };
  return { name: "House | Villa", slug: "house-villa" };
}

function statusSlugFromName(name) {
  const s = (name || "").toLowerCase();
  if (s.includes("rental")) return "rental";
  if (s.includes("sold")) return "sold";
  if (s.includes("contract")) return "in-contract";
  if (s.includes("reduced")) return "recently-reduced";
  if (s.includes("exclusive")) return "exclusive";
  return "for-sale";
}

// ─── Image checker ────────────────────────────────────────────────────────────

const imageCheckCache = new Map();

function imageExists(url) {
  if (imageCheckCache.has(url)) return Promise.resolve(imageCheckCache.get(url));
  return new Promise((resolve) => {
    const req = https.request(url, { method: "HEAD" }, (res) => {
      const ok = res.statusCode >= 200 && res.statusCode < 400;
      imageCheckCache.set(url, ok);
      res.resume();
      resolve(ok);
    });
    req.on("error", () => {
      imageCheckCache.set(url, false);
      resolve(false);
    });
    req.setTimeout(8000, () => {
      req.destroy();
      imageCheckCache.set(url, false);
      resolve(false);
    });
    req.end();
  });
}

async function filterValidImages(gallery) {
  const results = await Promise.all(
    gallery.map(async (img) => ((await imageExists(img.url)) ? img : null)),
  );
  return results.filter(Boolean);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function appendAuditLog(entry) {
  fs.appendFileSync(AUDIT_LOG_PATH, JSON.stringify(entry) + "\n", "utf-8");
}

const TAXONOMIES = ["property_category", "property_city", "property_area", "property_features", "property_status"];

async function main() {
  const runAt = new Date().toISOString();

  console.log("🏷  Fetching taxonomy terms...");
  const termMaps = {};
  for (const tax of TAXONOMIES) {
    const terms = await fetchAllPages(`/wp-json/wp/v2/${tax}?_fields=id,name`);
    termMaps[tax] = new Map(terms.map((t) => [t.id, decodeEntities(t.name)]));
    console.log(`  ✓ ${tax}: ${terms.length} terms`);
  }
  const termName = (tax, ids) => (ids && ids.length ? termMaps[tax].get(ids[0]) || null : null);

  console.log("🌐 Fetching all published listings from the REST API...");
  const posts = await fetchAllPages(
    "/wp-json/wp/v2/estate_property?_fields=id,slug,link,title,content,excerpt,date,modified," + TAXONOMIES.join(","),
  );
  console.log(`  ✓ ${posts.length} published listings`);

  console.log(`📄 Fetching galleries and listing pages (${CONCURRENCY} at a time)...`);
  let done = 0;
  const failures = [];
  const skippedRentals = [];
  const skippedExcluded = [];
  const skippedNoImages = [];
  let totalRemoved = 0;
  const allProperties = [];

  const mapped = await mapWithConcurrency(posts, CONCURRENCY, async (post) => {
    try {
      const statusName = termName("property_status", post.property_status);
      const statusSlug = statusSlugFromName(statusName);
      if (statusSlug === "rental") {
        skippedRentals.push({ id: post.id, slug: post.slug });
        return null;
      }

      const [mediaRaw, pageHtml] = await Promise.all([
        fetchAllPages(`/wp-json/wp/v2/media?parent=${post.id}&_fields=source_url,alt_text,title`),
        fetchTextRetry(post.link),
      ]);
      const scraped = scrapeListingPage(pageHtml);

      if (scraped.agentSlug && EXCLUDED_AGENT_SLUGS.has(scraped.agentSlug)) {
        skippedExcluded.push({ id: post.id, slug: post.slug, agent: scraped.agentSlug });
        return null;
      }

      const gallery = mediaRaw
        .filter((m) => m.source_url && /\.(jpe?g|png|webp)$/i.test(m.source_url))
        .map((m) => ({
          id: 0,
          url: m.source_url,
          title: decodeEntities((m.title && m.title.rendered) || ""),
          alt: decodeEntities(m.alt_text || ""),
        }));

      const categoryName = termName("property_category", post.property_category);
      const category = inferCategory(categoryName);
      const cityName = termName("property_city", post.property_city);
      const areaName = termName("property_area", post.property_area);
      const features = (post.property_features || [])
        .map((id) => termMaps.property_features.get(id))
        .filter(Boolean);

      return {
        id: post.id,
        slug: post.slug,
        url: post.link,
        title: decodeEntities(post.title.rendered || ""),
        status: "publish",
        author: agentNameFromSlug(scraped.agentSlug) || "Dominique Brousseau",
        dates: { published: post.date, modified: post.modified },
        content: {
          description: null,
          body: htmlToText(post.content.rendered) || null,
          excerpt: htmlToText(post.excerpt.rendered) || null,
        },
        taxonomy: {
          action: { name: "For Sale", slug: "for-sale" },
          category: { name: category.name, slug: category.slug },
          city: cityName ? { name: cityName, slug: cityName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") } : null,
          area: areaName ? { name: areaName, slug: areaName.toLowerCase().replace(/\s+/g, "-") } : null,
          status: { name: statusName || "For Sale", slug: statusSlug },
          features: features.map((f) => ({ name: f, slug: f.toLowerCase().replace(/\s+/g, "-") })),
        },
        pricing: { property_price: scraped.price || 0 },
        details: {
          property_size: scraped.size,
          property_lot_size: scraped.lotSize,
          property_bedrooms: scraped.bedrooms,
          property_bathrooms: scraped.bathrooms,
          property_year: scraped.year,
          property_garage: scraped.garages,
          stories: null,
        },
        location: {
          property_address: scraped.address,
          property_zip: null,
          property_country: "Costa Rica",
          property_latitude: scraped.latitude,
          property_longitude: scraped.longitude,
        },
        flags: {},
        media: {
          featuredImage: gallery[0] || null,
          gallery,
        },
      };
    } catch (err) {
      failures.push({ id: post.id, slug: post.slug, error: err.message });
      return null;
    } finally {
      done++;
      if (done % 50 === 0) console.log(`  ... ${done}/${posts.length}`);
    }
  });

  console.log(`🔍 Validating images...`);
  for (const prop of mapped) {
    if (!prop) continue;
    const validGallery = await filterValidImages(prop.media.gallery);
    totalRemoved += prop.media.gallery.length - validGallery.length;

    if (validGallery.length === 0) {
      skippedNoImages.push({ id: prop.id, slug: prop.slug, title: prop.title });
      continue;
    }
    prop.media.gallery = validGallery;
    prop.media.featuredImage = validGallery[0];
    allProperties.push(prop);
  }

  console.log(`  Removed ${totalRemoved} broken image(s)`);
  console.log(`  Skipped ${skippedRentals.length} rental(s), ${skippedExcluded.length} from excluded agents, ${skippedNoImages.length} with no valid images, ${failures.length} failed`);
  console.log(`\n✅ Total properties to write: ${allProperties.length}`);

  if (allProperties.length < 100) {
    appendAuditLog({ runAt, mode: "rest", status: "aborted", reason: `Only ${allProperties.length} properties — refusing to overwrite`, failures });
    console.error("❌ Suspiciously few properties. Not overwriting properties.json.");
    process.exit(1);
  }

  const output = {
    export: { generatedAt: new Date().toISOString(), sources: [`${BASE}/wp-json/wp/v2/estate_property`] },
    stats: { total: allProperties.length },
    properties: allProperties,
  };
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf-8");
  console.log(`💾 Written → ${OUTPUT_PATH}`);

  appendAuditLog({
    runAt,
    mode: "rest",
    status: "success",
    totalProperties: allProperties.length,
    brokenImagesRemoved: totalRemoved,
    skippedRentals: skippedRentals.length,
    skippedExcludedAgents: skippedExcluded.length,
    skippedNoImages: skippedNoImages.length,
    skippedProperties: skippedNoImages,
    failures,
  });
  console.log(`📋 Audit log → ${AUDIT_LOG_PATH}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
