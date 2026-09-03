import fs from "fs";
import path from "path";
import type { Property, PropertyCategory, PropertyStatus } from "@/lib/types/property";
import type { PropertiesSourceFile, SourceProperty } from "@/lib/types/properties-source";

const PROPERTIES_JSON = path.join(process.cwd(), "properties.json");

const VALID_CATEGORIES: PropertyCategory[] = [
  "condo-apartment",
  "house-villa",
  "lot-vacant-land",
  "multi-family-duplex-triplex",
  "hotel-bnb-apt-building",
  "commercial-building-office-space-warehouse",
];

const VALID_STATUSES: PropertyStatus[] = [
  "for-sale",
  "sold",
  "in-contract",
  "recently-reduced",
  "exclusive",
];

let cachedProperties: Property[] | null = null;
let cachedMtimeMs = 0;

function formatPriceLabel(price: number): string {
  return `$ ${price.toLocaleString("en-US")}`;
}

function inferCategorySlug(raw: SourceProperty): PropertyCategory {
  const slug = raw.taxonomy.category?.slug;
  if (slug && VALID_CATEGORIES.includes(slug as PropertyCategory)) {
    return slug as PropertyCategory;
  }

  const text = `${raw.title} ${raw.content.excerpt ?? ""}`.toLowerCase();
  if (text.includes("condo") || text.includes("apartment")) return "condo-apartment";
  if (text.includes("lot") || text.includes("land")) return "lot-vacant-land";
  if (text.includes("multi-family") || text.includes("duplex")) return "multi-family-duplex-triplex";
  if (text.includes("hotel") || text.includes("bnb")) return "hotel-bnb-apt-building";
  if (text.includes("commercial") || text.includes("office")) return "commercial-building-office-space-warehouse";
  return "house-villa";
}

function inferCategoryLabel(raw: SourceProperty, categorySlug: PropertyCategory): string {
  if (raw.taxonomy.category?.name) return raw.taxonomy.category.name;

  const labels: Record<PropertyCategory, string> = {
    "condo-apartment": "Condo | Apartment",
    "house-villa": "House | Villa",
    "lot-vacant-land": "Lot | Vacant Land",
    "multi-family-duplex-triplex": "Multi-family | Duplex",
    "hotel-bnb-apt-building": "Hotel | BNB",
    "commercial-building-office-space-warehouse": "Commercial",
  };
  return labels[categorySlug];
}

function mapListingStatus(raw: SourceProperty): PropertyStatus {
  const slug = raw.taxonomy.status?.slug;
  if (slug && VALID_STATUSES.includes(slug as PropertyStatus)) {
    return slug as PropertyStatus;
  }
  return "for-sale";
}

function mapImages(raw: SourceProperty): Property["images"] {
  const gallery = raw.media?.gallery ?? [];
  const seen = new Set<string>();

  return gallery
    .filter((img) => {
      if (!img.url || seen.has(img.url)) return false;
      seen.add(img.url);
      const alt = (img.alt ?? img.title ?? "").toLowerCase();
      return !alt.includes("logo") && !alt.includes("thumb");
    })
    .map((img) => ({
      src: img.url,
      alt: img.alt || img.title || raw.title,
    }));
}

// SEO: URLs should carry no digits and no connector words.
const SLUG_STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "of", "in", "on", "at", "to",
  "with", "for", "from", "by", "i",
]);

const ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

/** Spell out an integer as hyphenated words (unit numbers like "201" must stay distinct). */
function numberToWords(value: number): string {
  if (value < 20) return ONES[value];
  if (value < 100) {
    const rest = value % 10;
    return TENS[Math.floor(value / 10)] + (rest ? `-${ONES[rest]}` : "");
  }
  if (value < 1000) {
    const rest = value % 100;
    return `${ONES[Math.floor(value / 100)]}-hundred` + (rest ? `-${numberToWords(rest)}` : "");
  }
  if (value < 1000000) {
    const rest = value % 1000;
    return `${numberToWords(Math.floor(value / 1000))}-thousand` + (rest ? `-${numberToWords(rest)}` : "");
  }
  return String(value)
    .split("")
    .map((d) => ONES[Number(d)])
    .join("-");
}

function cleanSlug(slug: string): string {
  const words = slug
    .split("-")
    .map((word) => (/^\d+$/.test(word) ? numberToWords(Number(word)) : word))
    .filter((word) => word && !SLUG_STOPWORDS.has(word));
  return words.join("-") || slug;
}

function mapSourceProperty(raw: SourceProperty): Property | null {
  if (raw.status !== "publish") return null;

  const categorySlug = inferCategorySlug(raw);
  const price = raw.pricing?.property_price || undefined;
  const images = mapImages(raw);

  return {
    slug: cleanSlug(raw.slug),
    sourceSlug: raw.slug,
    url: raw.url,
    title: raw.title,
    description: raw.content.description || raw.content.body || undefined,
    price,
    priceLabel: price ? formatPriceLabel(price) : undefined,
    category: inferCategoryLabel(raw, categorySlug),
    categorySlug,
    status: mapListingStatus(raw),
    city: raw.taxonomy.city?.name || undefined,
    citySlug: raw.taxonomy.city?.slug || undefined,
    area: raw.taxonomy.area?.name || undefined,
    bedrooms: raw.details.property_bedrooms ?? undefined,
    bathrooms: raw.details.property_bathrooms ?? undefined,
    sizeM2: raw.details.property_size ?? undefined,
    lotSizeM2: raw.details.property_lot_size ?? undefined,
    yearBuilt: raw.details.property_year ?? undefined,
    garages: raw.details.property_garage || undefined,
    features: raw.taxonomy.features?.map((f) => f.name) ?? undefined,
    images,
    agent: raw.author || "Dominique Brousseau",
    isFeatured: raw.flags?.prop_featured === 1,
    latitude: raw.location?.property_latitude ?? undefined,
    longitude: raw.location?.property_longitude ?? undefined,
    address: raw.location?.property_address || undefined,
  };
}

function loadSourceFile(): PropertiesSourceFile | null {
  if (!fs.existsSync(PROPERTIES_JSON)) return null;

  try {
    const raw = fs.readFileSync(PROPERTIES_JSON, "utf-8");
    return JSON.parse(raw) as PropertiesSourceFile;
  } catch {
    return null;
  }
}

function loadAllProperties(): Property[] {
  // Cache keyed on the file's mtime so a fresh sync is picked up without a restart.
  let mtimeMs = 0;
  try {
    mtimeMs = fs.statSync(PROPERTIES_JSON).mtimeMs;
  } catch {
    // missing file — fall through and let loadSourceFile handle it
  }
  if (cachedProperties && mtimeMs === cachedMtimeMs) return cachedProperties;
  cachedMtimeMs = mtimeMs;

  const source = loadSourceFile();
  if (!source) {
    cachedProperties = [];
    return cachedProperties;
  }

  cachedProperties = source.properties
    .map(mapSourceProperty)
    .filter((p): p is Property => p !== null);

  return cachedProperties;
}

export function getAllProperties(): Property[] {
  return loadAllProperties();
}

export function getFeaturedProperties(limit = 6): Property[] {
  return getAllProperties()
    .filter((p) => p.images.length > 0 && p.price)
    .sort((a, b) => {
      const aFeatured = a.isFeatured ? 1 : 0;
      const bFeatured = b.isFeatured ? 1 : 0;
      return bFeatured - aFeatured;
    })
    .slice(0, limit);
}

export function getPropertyBySlug(slug: string): Property | null {
  return getAllProperties().find((p) => p.slug === slug) ?? null;
}

/** Match a request against the original (pre-cleanup) slug so old URLs can redirect. */
export function getPropertyByLegacySlug(slug: string): Property | null {
  return getAllProperties().find((p) => p.sourceSlug === slug) ?? null;
}

export function getPropertiesByCategory(categorySlug: string): Property[] {
  return getAllProperties().filter((p) => p.categorySlug === categorySlug);
}

const NEIGHBORHOOD_CITY_ALIASES: Record<string, string[]> = {
  esterillos: ["esterillos", "bejuco", "parrita"],
};

export function getPropertiesByCity(citySlug: string): Property[] {
  const aliases = NEIGHBORHOOD_CITY_ALIASES[citySlug] ?? [citySlug];

  return getAllProperties().filter((property) => {
    if (property.citySlug && aliases.includes(property.citySlug)) return true;

    const locationText = `${property.title} ${property.area ?? ""} ${property.city ?? ""}`.toLowerCase();
    return aliases.some((alias) => locationText.includes(alias.replace(/-/g, " ")));
  });
}

export function getPropertiesForNeighborhood(citySlug: string): Property[] {
  return getPropertiesByCity(citySlug);
}

export function getPropertyCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const property of getAllProperties()) {
    counts[property.categorySlug] = (counts[property.categorySlug] || 0) + 1;
  }
  return counts;
}
