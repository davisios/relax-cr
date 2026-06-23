#!/usr/bin/env node
/**
 * syncProperties.js
 *
 * Downloads CSV exports from RE/MAX OCR and rebuilds web/properties.json.
 *
 * Run manually every Monday:
 *   node syncProps/syncProperties.js
 *
 * Or with local CSV files (for testing):
 *   node syncProps/syncProperties.js --local
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ─── Endpoints ───────────────────────────────────────────────────────────────

const ENDPOINTS = [
  "https://remax-ocr.com/wp-load.php?security_key=66deda82f44ef419&export_id=65&action=get_data",
  "https://remax-ocr.com/wp-load.php?security_key=04e548c0c223f60d&export_id=66&action=get_data",
  "https://remax-ocr.com/wp-load.php?security_key=90784ee0cbbc12b0&export_id=71&action=get_data",
  "https://remax-ocr.com/wp-load.php?security_key=194350ca8ac7255f&export_id=69&action=get_data",
  "https://remax-ocr.com/wp-load.php?security_key=b34d16a13e42c475&export_id=70&action=get_data",
  "https://remax-ocr.com/wp-load.php?security_key=525b9608bdc80b84&export_id=68&action=get_data",
  "https://remax-ocr.com/wp-load.php?security_key=3fa77471ed07f8aa&export_id=67&action=get_data",
  "https://remax-ocr.com/wp-load.php?security_key=538041c95aca0206&export_id=72&action=get_data",
  "https://remax-ocr.com/wp-load.php?security_key=bdf55e47aae54edb&export_id=56&action=get_data",
  "https://remax-ocr.com/wp-load.php?security_key=65a9df4893720098&export_id=73&action=get_data",
];

// Local CSV files used when --local flag is passed
const LOCAL_FILES = [
  path.join(__dirname, "..", "export1.csv"),
  path.join(__dirname, "..", "export2.csv"),
];

const OUTPUT_PATH = path.join(__dirname, "..", "web", "properties.json");

// ─── CSV parser ───────────────────────────────────────────────────────────────

function parseCSV(text) {
  // Strip BOM
  const content = text.replace(/^﻿/, "");
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    const next = content[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(field);
        field = "";
      } else if (ch === "\n") {
        row.push(field);
        field = "";
        if (row.some((c) => c.trim())) rows.push(row);
        row = [];
      } else if (ch === "\r") {
        // skip
      } else {
        field += ch;
      }
    }
  }
  if (field || row.length) {
    row.push(field);
    if (row.some((c) => c.trim())) rows.push(row);
  }

  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cells) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cells[i] !== undefined ? cells[i].trim() : "";
    });
    return obj;
  });
}

// ─── Feature flags → feature names ──────────────────────────────────────────

const FEATURE_FLAG_MAP = {
  pets_allowed: "Pet friendly",
  seller_financing: "Seller Financing",
  furnished: "Furnished",
  not_furnished: "Not Furnished",
  air_conditioning_central: "Central A/C",
  garden: "Garden",
  storage: "Storage",
  washer_and_dryer: "Washer and Dryer",
  "wi-fi": "Wi-fi",
  balcony: "Balcony",
  deck: "Deck",
  fenced_yard: "Fenced Yard",
  front_yard: "Front Yard",
  back_yard: "Backyard",
  gym: "Gym",
  gated_community: "Gated Community",
  jacuzzi: "Jacuzzi",
  maid_room: "Maid Room",
  elevator: "Elevator",
  penthouse: "Penthouse",
  great_view: "Great View",
  close_to_town: "Close to town",
  walk_to_beach: "Walk to Beach",
  beachfront: "Beachfront",
  ocean_view: "Ocean View",
  "24_hour_security": "24 hour security",
};

function extractFeatures(row) {
  const features = [];

  // From boolean flag columns
  for (const [col, name] of Object.entries(FEATURE_FLAG_MAP)) {
    const val = (row[col] || "").toLowerCase();
    if (val === "1" || val === "yes" || val === "true") {
      features.push(name);
    }
  }

  // From "Features & Amenities" comma-separated column (fallback / extra)
  const amenities = row["Features & Amenities"] || "";
  if (amenities) {
    amenities.split(",").forEach((a) => {
      const name = a.trim();
      if (name && !features.includes(name)) features.push(name);
    });
  }

  return features.length ? features : undefined;
}

// ─── Category mapping ─────────────────────────────────────────────────────────

function inferCategory(row) {
  const cat = (row["Categories"] || "").toLowerCase();
  if (cat.includes("condo") || cat.includes("apartment")) return { name: "Condo | Apartment", slug: "condo-apartment" };
  if (cat.includes("lot") || cat.includes("land") || cat.includes("vacant")) return { name: "Lot | Vacant Land", slug: "lot-vacant-land" };
  if (cat.includes("multi") || cat.includes("duplex")) return { name: "Multi-family | Duplex", slug: "multi-family-duplex-triplex" };
  if (cat.includes("hotel") || cat.includes("bnb") || cat.includes("hospitality")) return { name: "Hotel | BNB", slug: "hotel-bnb-apt-building" };
  if (cat.includes("commercial") || cat.includes("office")) return { name: "Commercial", slug: "commercial-building-office-space-warehouse" };
  return { name: "House | Villa", slug: "house-villa" };
}

// ─── Slug from permalink ──────────────────────────────────────────────────────

function slugFromPermalink(permalink) {
  return permalink
    .replace(/^https?:\/\/[^/]+\/properties\//, "")
    .replace(/\/$/, "")
    .replace(/[^a-z0-9-]/gi, "-")
    .toLowerCase() || String(Math.random()).slice(2);
}

// ─── Image URL list from cell ─────────────────────────────────────────────────

function parseImages(cell) {
  if (!cell) return [];
  return cell
    .split(/[\n,|]+/)
    .map((u) => u.trim())
    .filter((u) => u.startsWith("http"));
}

// ─── Map one CSV row → SourceProperty shape ───────────────────────────────────

function rowToSourceProperty(row) {
  const status = (row["Status"] || "").toLowerCase();
  if (status !== "publish") return null;

  const id = parseInt(row["ID"]) || 0;
  const permalink = row["Permalink"] || "";
  const slug = slugFromPermalink(permalink);
  const category = inferCategory(row);
  const price = parseFloat(row["property_price"]) || undefined;
  const images = parseImages(row["Image URL"]);
  const features = extractFeatures(row);

  const cityRaw = row["City"] || "";
  const citySlug = cityRaw.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || undefined;

  const areaRaw = row["Neighborhood"] || "";

  const statusSlug = (() => {
    const s = (row["Property Status"] || "").toLowerCase();
    if (s.includes("sold")) return "sold";
    if (s.includes("contract")) return "in-contract";
    if (s.includes("reduced")) return "recently-reduced";
    if (s.includes("exclusive")) return "exclusive";
    return "for-sale";
  })();

  return {
    id,
    slug,
    url: permalink,
    title: row["Title"] || "",
    status: "publish",
    author: `${row["Author First Name"] || ""} ${row["Author Last Name"] || ""}`.trim() || "Dominique Brousseau",
    dates: {},
    content: {
      description: null,
      body: row["Content"] || null,
      excerpt: null,
    },
    taxonomy: {
      action: { name: row["Action"] || "For Sale", slug: "for-sale" },
      category: { name: category.name, slug: category.slug },
      city: cityRaw ? { name: cityRaw, slug: citySlug } : null,
      area: areaRaw ? { name: areaRaw, slug: areaRaw.toLowerCase().replace(/\s+/g, "-") } : null,
      status: { name: row["Property Status"] || "For Sale", slug: statusSlug },
      features: (features || []).map((f) => ({ name: f, slug: f.toLowerCase().replace(/\s+/g, "-") })),
    },
    pricing: {
      property_price: price || 0,
    },
    details: {
      property_size: parseFloat(row["property_size"]) || null,
      property_lot_size: parseFloat(row["property_lot_size"]) || null,
      property_bedrooms: parseFloat(row["property_bedrooms"]) || null,
      property_bathrooms: parseFloat(row["property_bathrooms"]) || null,
      property_year: parseInt(row["property-year"]) || null,
      property_garage: row["property-garage"] || null,
      stories: parseInt(row["stories"]) || null,
    },
    location: {
      property_address: row["property_address"] || null,
      property_zip: row["property_zip"] || null,
      property_country: "Costa Rica",
      property_latitude: parseFloat(row["property_latitude"]) || null,
      property_longitude: parseFloat(row["property_longitude"]) || null,
    },
    flags: {},
    media: {
      featuredImage: images[0] ? { id: 0, url: images[0], title: "", alt: "" } : null,
      gallery: images.map((url) => ({ id: 0, url, title: "", alt: "" })),
    },
  };
}

// ─── Fetch helper ─────────────────────────────────────────────────────────────

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    }).on("error", reject);
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const useLocal = process.argv.includes("--local");
  const csvTexts = [];

  if (useLocal) {
    console.log("📂 Using local CSV files...");
    for (const file of LOCAL_FILES) {
      if (!fs.existsSync(file)) {
        console.warn(`  ⚠️  File not found: ${file}`);
        continue;
      }
      csvTexts.push(fs.readFileSync(file, "utf-8"));
      console.log(`  ✓ Loaded ${path.basename(file)}`);
    }
  } else {
    console.log("🌐 Fetching from RE/MAX endpoints...");
    for (const url of ENDPOINTS) {
      const exportId = new URL(url).searchParams.get("export_id");
      try {
        const text = await fetchText(url);
        if (!text || text.trim().length === 0) {
          console.warn(`  ⚠️  Empty response for export_id=${exportId}`);
        } else {
          csvTexts.push(text);
          console.log(`  ✓ Fetched export_id=${exportId} (${text.length} bytes)`);
        }
      } catch (err) {
        console.error(`  ✗ Failed export_id=${exportId}:`, err.message);
      }
    }
  }

  if (csvTexts.length === 0) {
    console.error("❌ No CSV data loaded. Aborting.");
    process.exit(1);
  }

  // Parse all CSVs and deduplicate by ID
  const seen = new Set();
  const allProperties = [];

  for (const text of csvTexts) {
    const rows = parseCSV(text);
    console.log(`  Parsed ${rows.length} rows`);

    for (const row of rows) {
      const id = row["ID"];
      if (!id || seen.has(id)) continue;
      seen.add(id);

      const prop = rowToSourceProperty(row);
      if (prop) allProperties.push(prop);
    }
  }

  console.log(`\n✅ Total unique published properties: ${allProperties.length}`);

  // Write output
  const output = {
    export: { generatedAt: new Date().toISOString(), sources: useLocal ? LOCAL_FILES : ENDPOINTS },
    stats: { total: allProperties.length },
    properties: allProperties,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf-8");
  console.log(`💾 Written → ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
