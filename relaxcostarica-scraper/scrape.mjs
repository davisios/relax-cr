#!/usr/bin/env node

/**
 * Web scraper para https://relaxcostarica.com/
 *
 * Descubre todas las URLs vía sitemaps Yoast SEO y extrae contenido estructurado.
 *
 * Uso:
 *   npm run scrape
 *   node scrape.mjs --output ./output --concurrency 5 --delay 300
 *   node scrape.mjs --urls-only
 *   node scrape.mjs --types page,post,estate_property
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://relaxcostarica.com";
const SITEMAP_INDEX = `${BASE_URL}/sitemap_index.xml`;

const SITEMAP_TYPE_MAP = {
  "post-sitemap.xml": "blog_post",
  "page-sitemap.xml": "page",
  "estate_property-sitemap.xml": "property",
  "estate_agent-sitemap.xml": "agent",
  "estate_agency-sitemap.xml": "agency",
  "category-sitemap.xml": "blog_category",
  "post_tag-sitemap.xml": "blog_tag",
  "property_category-sitemap.xml": "property_category",
  "property_action_category-sitemap.xml": "property_action",
  "property_city-sitemap.xml": "city",
  "property_area-sitemap.xml": "area",
  "property_features-sitemap.xml": "property_feature",
  "property_status-sitemap.xml": "property_status",
  "property_category_agent-sitemap.xml": "agent_property_category",
  "property_action_category_agent-sitemap.xml": "agent_property_action",
  "property_city_agent-sitemap.xml": "agent_city",
  "property_area_agent-sitemap.xml": "agent_area",
  "property_county_state_agent-sitemap.xml": "agent_county",
  "author-sitemap.xml": "author",
};

const TYPE_ALIASES = {
  post: "blog_post",
  posts: "blog_post",
  blog: "blog_post",
  property: "property",
  properties: "property",
  page: "page",
  pages: "page",
  city: "city",
  cities: "city",
  agent: "agent",
  agents: "agent",
};

function normalizeTypes(typesArg) {
  return new Set(
    typesArg.split(",").map((t) => TYPE_ALIASES[t.trim()] ?? t.trim()),
  );
}

function parseArgs(argv) {
  const args = {
    output: join(__dirname, "output"),
    concurrency: 4,
    delayMs: 400,
    urlsOnly: false,
    types: null,
    maxPages: null,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--output" && argv[i + 1]) args.output = argv[++i];
    else if (arg === "--concurrency" && argv[i + 1])
      args.concurrency = Number(argv[++i]);
    else if (arg === "--delay" && argv[i + 1]) args.delayMs = Number(argv[++i]);
    else if (arg === "--urls-only") args.urlsOnly = true;
    else if (arg === "--max" && argv[i + 1]) args.maxPages = Number(argv[++i]);
    else if (arg === "--types" && argv[i + 1])
      args.types = normalizeTypes(argv[++i]);
    else if (arg === "--help" || arg === "-h") {
      console.log(`
Uso: node scrape.mjs [opciones]

Opciones:
  --output <dir>       Directorio de salida (default: ./output)
  --concurrency <n>    Peticiones simultáneas (default: 4)
  --delay <ms>         Pausa entre peticiones por worker (default: 400)
  --types <lista>      Solo tipos: page,post,property,city,...
  --urls-only          Solo descubrir URLs, sin scrapear contenido
  --max <n>            Limitar número de páginas a scrapear
  --help               Mostrar ayuda
`);
      process.exit(0);
    }
  }

  return args;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "RelaxCostaRica-ContentScraper/1.0 (+https://relaxcostarica.com)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(30_000),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (err) {
      if (attempt === retries) throw err;
      await sleep(1000 * attempt);
    }
  }
}

function parseSitemapLocs(xml) {
  const locs = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    locs.push(match[1].trim());
  }
  return locs;
}

function parseSitemapIndex(xml) {
  const sitemaps = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    const loc = match[1].trim();
    const filename = loc.split("/").pop();
    sitemaps.push({
      url: loc,
      filename,
      type: SITEMAP_TYPE_MAP[filename] ?? "other",
    });
  }
  return sitemaps;
}

function inferTypeFromUrl(url) {
  const path = new URL(url).pathname.replace(/\/$/, "") || "/";

  if (path === "/") return "home";
  if (path.startsWith("/properties/")) return "property";
  if (path.startsWith("/property-type/")) return "property_category";
  if (path.startsWith("/city/")) return "city";
  if (path.startsWith("/area/")) return "area";
  if (path.startsWith("/agent/")) return "agent";
  if (path.startsWith("/agency/")) return "agency";
  if (path.startsWith("/real-estate/") || path.startsWith("/jaco-immobilier/"))
    return "blog_post";
  if (path.startsWith("/category/")) return "blog_category";
  if (path.startsWith("/tag/")) return "blog_tag";
  if (path.startsWith("/author/")) return "author";
  if (path.startsWith("/advanced-search")) return "search";
  if (path.startsWith("/wp-")) return "wordpress_system";

  return "page";
}

function slugFromUrl(url) {
  const path = new URL(url).pathname.replace(/\/$/, "");
  if (!path || path === "/") return "home";
  return path.split("/").filter(Boolean).pop() ?? "unknown";
}

function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function extractJsonLd($) {
  const items = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html() ?? "");
      items.push(data);
    } catch {
      // ignorar JSON-LD inválido
    }
  });
  return items;
}

function extractHeadings($) {
  const headings = [];
  $("h1, h2, h3, h4, h5, h6").each((_, el) => {
    const text = cleanText($(el).text());
    if (text) {
      headings.push({
        level: Number(el.tagName.slice(1)),
        text,
      });
    }
  });
  return headings;
}

function extractParagraphs($, selectors) {
  const paragraphs = new Set();
  for (const selector of selectors) {
    $(selector).each((_, el) => {
      const text = cleanText($(el).text());
      if (text.length > 20) paragraphs.add(text);
    });
  }
  return [...paragraphs];
}

function extractLinks($, pageUrl) {
  const base = new URL(pageUrl);
  const links = [];

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

    try {
      const absolute = new URL(href, base).href;
      if (!absolute.startsWith(BASE_URL)) return;
      const text = cleanText($(el).text());
      links.push({ href: absolute, text: text || null });
    } catch {
      // URL inválida
    }
  });

  const unique = new Map();
  for (const link of links) {
    if (!unique.has(link.href)) unique.set(link.href, link);
  }
  return [...unique.values()];
}

function extractImages($, pageUrl) {
  const base = new URL(pageUrl);
  const images = [];

  $("img[src]").each((_, el) => {
    const src = $(el).attr("src");
    if (!src) return;
    try {
      const absolute = new URL(src, base).href;
      images.push({
        src: absolute,
        alt: cleanText($(el).attr("alt") ?? "") || null,
      });
    } catch {
      // ignorar
    }
  });

  const unique = new Map();
  for (const img of images) {
    if (!unique.has(img.src)) unique.set(img.src, img);
  }
  return [...unique.values()];
}

function extractPropertyDetails($) {
  const details = {};

  const priceSelectors = [
    ".price_area",
    ".listing_main_price",
    ".property_price",
    "[class*='price']",
  ];
  for (const sel of priceSelectors) {
    const text = cleanText($(sel).first().text());
    if (text && /\$|USD|¢/.test(text)) {
      details.price = text;
      break;
    }
  }

  const metaItems = [];
  $(".property_details, .listing_details, .property_meta, .panel-body").each(
    (_, el) => {
      const text = cleanText($(el).text());
      if (text) metaItems.push(text);
    },
  );
  if (metaItems.length) details.metaBlocks = metaItems.slice(0, 5);

  return Object.keys(details).length ? details : null;
}

function extractPageContent(html, url, sitemapType) {
  const $ = cheerio.load(html);

  $("script, style, noscript, iframe").remove();

  const title =
    cleanText($('meta[property="og:title"]').attr("content") ?? "") ||
    cleanText($("title").text()) ||
    null;

  const description =
    cleanText($('meta[name="description"]').attr("content") ?? "") ||
    cleanText($('meta[property="og:description"]').attr("content") ?? "") ||
    null;

  const ogType = $('meta[property="og:type"]').attr("content") ?? null;
  const canonical = $('link[rel="canonical"]').attr("href") ?? url;

  const contentSelectors = [
    "article .entry-content",
    ".entry-content",
    "article",
    "main",
    "#content",
    ".content",
    ".property_content",
    ".single-content",
  ];

  let mainContent = "";
  for (const selector of contentSelectors) {
    const text = cleanText($(selector).first().text());
    if (text.length > mainContent.length) mainContent = text;
  }

  const headings = extractHeadings($);
  const paragraphs = extractParagraphs($, contentSelectors);
  const links = extractLinks($, url);
  const images = extractImages($, url);
  const jsonLd = extractJsonLd($);

  const pageType = sitemapType ?? inferTypeFromUrl(url);
  const propertyDetails =
    pageType === "property" ? extractPropertyDetails($) : null;

  return {
    url,
    canonical,
    slug: slugFromUrl(url),
    type: pageType,
    title,
    description,
    ogType,
    headings,
    paragraphs,
    mainContent: mainContent || null,
    wordCount: mainContent ? mainContent.split(/\s+/).length : 0,
    links: links.slice(0, 100),
    images: images.slice(0, 50),
    jsonLd: jsonLd.length ? jsonLd : null,
    propertyDetails,
    scrapedAt: new Date().toISOString(),
  };
}

async function discoverUrls(typesFilter) {
  console.log("📡 Descubriendo URLs desde sitemap_index.xml...");
  const indexXml = await fetchText(SITEMAP_INDEX);
  const sitemaps = parseSitemapIndex(indexXml);

  const grouped = {};
  const allUrls = [];

  for (const sitemap of sitemaps) {
    if (typesFilter && !typesFilter.has(sitemap.type)) continue;

    console.log(`  → ${sitemap.filename} (${sitemap.type})`);
    const xml = await fetchText(sitemap.url);
    const urls = parseSitemapLocs(xml);

    grouped[sitemap.type] = urls.map((url) => ({
      url,
      slug: slugFromUrl(url),
      sitemap: sitemap.filename,
    }));

    for (const url of urls) {
      allUrls.push({ url, type: sitemap.type, sitemap: sitemap.filename });
    }

    await sleep(200);
  }

  const unique = new Map();
  for (const item of allUrls) {
    if (!unique.has(item.url)) unique.set(item.url, item);
  }

  return {
    sitemaps: sitemaps.map((s) => ({ ...s, count: grouped[s.type]?.length ?? 0 })),
    grouped,
    urls: [...unique.values()],
  };
}

function buildContentStructure(pages) {
  const byType = {};

  for (const page of pages) {
    if (!byType[page.type]) {
      byType[page.type] = {
        type: page.type,
        count: 0,
        pages: [],
      };
    }

    byType[page.type].count++;
    byType[page.type].pages.push({
      url: page.url,
      slug: page.slug,
      title: page.title,
      description: page.description,
      headings: page.headings?.slice(0, 10) ?? [],
      wordCount: page.wordCount ?? 0,
      linkCount: page.links?.length ?? 0,
      imageCount: page.images?.length ?? 0,
      propertyDetails: page.propertyDetails ?? null,
    });
  }

  const navigation = extractSiteNavigation(pages);

  return {
    site: BASE_URL,
    generatedAt: new Date().toISOString(),
    summary: {
      totalPages: pages.length,
      byType: Object.fromEntries(
        Object.entries(byType).map(([type, data]) => [type, data.count]),
      ),
    },
    navigation,
    sections: Object.values(byType).sort((a, b) => b.count - a.count),
  };
}

function extractSiteNavigation(pages) {
  const home = pages.find((p) => p.type === "home" || p.slug === "home");
  if (!home?.links) return [];

  const navLinks = home.links.filter((l) => {
    const path = new URL(l.href).pathname;
    return (
      !path.includes("wp-") &&
      !path.includes("login") &&
      !path.includes("register") &&
      l.text &&
      l.text.length < 60
    );
  });

  const seen = new Set();
  return navLinks.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let index = 0;

  async function runWorker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await worker(items[current], current);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, runWorker),
  );
  return results;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await mkdir(args.output, { recursive: true });

  const discovery = await discoverUrls(args.types);
  const urlsToProcess = args.maxPages
    ? discovery.urls.slice(0, args.maxPages)
    : discovery.urls;

  console.log(`\n✅ ${discovery.urls.length} URLs únicas descubiertas\n`);

  const discoveryPath = join(args.output, "url-discovery.json");
  await writeFile(
    discoveryPath,
    JSON.stringify(
      {
        site: BASE_URL,
        discoveredAt: new Date().toISOString(),
        sitemaps: discovery.sitemaps,
        summary: Object.fromEntries(
          Object.entries(discovery.grouped).map(([type, items]) => [
            type,
            items.length,
          ]),
        ),
        urls: discovery.urls,
      },
      null,
      2,
    ),
  );
  console.log(`💾 URLs guardadas en ${discoveryPath}`);

  if (args.urlsOnly) {
    const structure = buildContentStructure(
      urlsToProcess.map((item) => ({
        url: item.url,
        slug: slugFromUrl(item.url),
        type: item.type,
        title: null,
        description: null,
        headings: [],
        wordCount: 0,
        links: [],
        images: [],
      })),
    );
    const structurePath = join(args.output, "content-structure.json");
    await writeFile(structurePath, JSON.stringify(structure, null, 2));
    console.log(`📋 Estructura (solo URLs) en ${structurePath}`);
    return;
  }

  console.log(
    `🔍 Scrapeando ${urlsToProcess.length} páginas (concurrencia: ${args.concurrency}, delay: ${args.delayMs}ms)...\n`,
  );

  let done = 0;
  let errors = 0;

  const pages = await runPool(urlsToProcess, args.concurrency, async (item) => {
    await sleep(args.delayMs);
    try {
      const html = await fetchText(item.url);
      const content = extractPageContent(html, item.url, item.type);
      done++;
      if (done % 25 === 0 || done === urlsToProcess.length) {
        console.log(`  [${done}/${urlsToProcess.length}] ${item.url}`);
      }
      return content;
    } catch (err) {
      errors++;
      console.warn(`  ⚠️  Error en ${item.url}: ${err.message}`);
      return {
        url: item.url,
        slug: slugFromUrl(item.url),
        type: item.type,
        error: err.message,
        scrapedAt: new Date().toISOString(),
      };
    }
  });

  const pagesDir = join(args.output, "pages");
  await mkdir(pagesDir, { recursive: true });

  for (const page of pages) {
    const filename = `${page.type}__${page.slug}.json`.replace(/[^a-zA-Z0-9._-]/g, "_");
    await writeFile(join(pagesDir, filename), JSON.stringify(page, null, 2));
  }

  const allPagesPath = join(args.output, "all-pages.json");
  await writeFile(allPagesPath, JSON.stringify(pages, null, 2));

  const structure = buildContentStructure(pages.filter((p) => !p.error));
  const structurePath = join(args.output, "content-structure.json");
  await writeFile(structurePath, JSON.stringify(structure, null, 2));

  const report = {
    site: BASE_URL,
    completedAt: new Date().toISOString(),
    total: urlsToProcess.length,
    success: pages.filter((p) => !p.error).length,
    errors,
    output: {
      urlDiscovery: discoveryPath,
      allPages: allPagesPath,
      contentStructure: structurePath,
      pagesDir,
    },
    summary: structure.summary,
  };

  const reportPath = join(args.output, "scrape-report.json");
  await writeFile(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n✅ Completado: ${report.success}/${report.total} páginas`);
  if (errors) console.log(`⚠️  Errores: ${errors}`);
  console.log(`\nArchivos generados:`);
  console.log(`  • ${structurePath}     → estructura jerárquica del sitio`);
  console.log(`  • ${allPagesPath}          → todas las páginas en un JSON`);
  console.log(`  • ${pagesDir}/         → un JSON por página`);
  console.log(`  • ${reportPath}      → resumen de la ejecución`);
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
