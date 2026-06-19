import fs from "fs";
import path from "path";
import type { Property } from "@/lib/types/property";

const PAGES_DIR = path.join(
  process.cwd(),
  "..",
  "relaxcostarica-scraper",
  "output",
  "pages"
);

// Parse price string like "$ 190,000" → 190000
function parsePrice(priceStr?: string): number | undefined {
  if (!priceStr) return undefined;
  const num = priceStr.replace(/[^0-9]/g, "");
  return num ? parseInt(num, 10) : undefined;
}

// Extract bedrooms/bathrooms/size from paragraph text
function extractSpecs(text: string) {
  const beds = text.match(/(\d+)\s*Bedroom/i);
  const baths = text.match(/(\d+)\s*Bathroom/i);
  const size = text.match(/Size\s*([\d,]+)\s*m2/i);
  return {
    bedrooms: beds ? parseInt(beds[1]) : undefined,
    bathrooms: baths ? parseInt(baths[1]) : undefined,
    sizeM2: size ? parseInt(size[1].replace(/,/g, "")) : undefined,
  };
}

// Extract property category slug from description or URL
function extractCategory(desc: string, url: string): Property["categorySlug"] {
  const lower = (desc + url).toLowerCase();
  if (lower.includes("condo") || lower.includes("apartment")) return "condo-apartment";
  if (lower.includes("house") || lower.includes("villa")) return "house-villa";
  if (lower.includes("lot") || lower.includes("land")) return "lot-vacant-land";
  if (lower.includes("multi-family") || lower.includes("duplex")) return "multi-family-duplex-triplex";
  if (lower.includes("hotel") || lower.includes("bnb")) return "hotel-bnb-apt-building";
  if (lower.includes("commercial") || lower.includes("office")) return "commercial-building-office-space-warehouse";
  return "house-villa";
}

function extractCategoryLabel(desc: string): string {
  if (desc.includes("Condo | Apartment")) return "Condo | Apartment";
  if (desc.includes("House | Villa")) return "House | Villa";
  if (desc.includes("Lot | Vacant Land")) return "Lot | Vacant Land";
  if (desc.includes("Multi-family")) return "Multi-family | Duplex";
  if (desc.includes("Hotel | BNB") || desc.includes("Hotel | BnB")) return "Hotel | BNB";
  if (desc.includes("Commercial")) return "Commercial";
  return "Property";
}

function parsePropertyFile(filePath: string): Property | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    if (data.type !== "property") return null;

    const details = data.propertyDetails || {};
    const price = parsePrice(details.price);
    const mainText = data.mainContent || "";
    const specs = extractSpecs(mainText);
    const desc = data.description || "";

    // Filter property images (skip logos)
    const images = (data.images || [])
      .filter(
        (img: { src: string; alt: string }) =>
          img.src.includes("wp-content/uploads") &&
          !img.alt?.toLowerCase().includes("logo") &&
          !img.alt?.toLowerCase().includes("thumb") &&
          img.src.match(/\d{4,}/)
      )
      .slice(0, 8);

    return {
      slug: data.slug,
      url: data.url,
      title: data.title,
      description: desc,
      price,
      priceLabel: details.price,
      category: extractCategoryLabel(desc + mainText),
      categorySlug: extractCategory(desc, data.url),
      status: "for-sale",
      images,
      agent: "Dominique Brousseau",
      ...specs,
    };
  } catch {
    return null;
  }
}

export function getAllProperties(): Property[] {
  if (!fs.existsSync(PAGES_DIR)) return getFallbackProperties();

  const files = fs.readdirSync(PAGES_DIR).filter((f) => f.startsWith("property__"));
  const properties = files
    .map((f) => parsePropertyFile(path.join(PAGES_DIR, f)))
    .filter((p): p is Property => p !== null);

  return properties;
}

export function getFeaturedProperties(): Property[] {
  const all = getAllProperties();
  // Prefer properties with images and price
  return all
    .filter((p) => p.images.length > 0 && p.price)
    .sort(() => 0.5 - Math.random())
    .slice(0, 9);
}

export function getPropertyBySlug(slug: string): Property | null {
  const filePath = path.join(PAGES_DIR, `property__${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return parsePropertyFile(filePath);
}

export function getPropertiesByCategory(categorySlug: string): Property[] {
  return getAllProperties().filter((p) => p.categorySlug === categorySlug);
}

export function getPropertyCounts() {
  const all = getAllProperties();
  const counts: Record<string, number> = {};
  for (const p of all) {
    counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
  }
  return counts;
}

// Fallback data when scraper output is not available (e.g., Vercel build)
function getFallbackProperties(): Property[] {
  return FEATURED_PROPERTIES_FALLBACK;
}

export const FEATURED_PROPERTIES_FALLBACK: Property[] = [
  {
    slug: "tropical-condo-steps-from-jaco-beach",
    url: "#",
    title: "Tropical Condo Steps from Jaco Beach",
    price: 175000,
    priceLabel: "$ 175,000",
    category: "Condo | Apartment",
    categorySlug: "condo-apartment",
    status: "for-sale",
    bedrooms: 1,
    bathrooms: 1,
    sizeM2: 56,
    agent: "Dominique Brousseau",
    images: [
      {
        src: "https://relaxcostarica.com/wp-content/uploads/2026/06/Garabito-Central-Pacific-Costa-RicaJaco-For-Sale-109098-525x328.jpeg",
        alt: "Tropical Condo Steps from Jaco Beach",
      },
    ],
  },
  {
    slug: "live-jaco-penthouse-ocean-sunset-views",
    url: "#",
    title: "Live Jacó Penthouse with Ocean and Sunset Views",
    price: 560000,
    priceLabel: "$ 560,000",
    category: "Condo | Apartment",
    categorySlug: "condo-apartment",
    status: "for-sale",
    bedrooms: 3,
    bathrooms: 3,
    sizeM2: 139,
    agent: "Dominique Brousseau",
    images: [
      {
        src: "https://relaxcostarica.com/wp-content/uploads/2026/06/Garabito-Central-Pacific-Costa-RicaJaco-For-Sale-108954-525x328.jpg",
        alt: "Live Jacó Penthouse",
      },
    ],
  },
  {
    slug: "beautiful-3-bedroom-home-hermosa-beach",
    url: "https://relaxcostarica.com/properties/garabito-central-pacific-costa-ricahermosa-beach-hermosa-non-gated-communitycalle-hermosa-108920/",
    title: "NEW Beautiful 3-Bedroom Home with Pool | Hermosa Beach",
    price: 370000,
    priceLabel: "$ 370,000",
    category: "House | Villa",
    categorySlug: "house-villa",
    status: "for-sale",
    city: "Hermosa Beach",
    area: "Hermosa Non-gated community",
    bedrooms: 3,
    bathrooms: 2,
    sizeM2: 130,
    lotSizeM2: 490,
    yearBuilt: 2026,
    garages: "Parking up to 6 vehicles",
    features: [
      "Backyard",
      "Close to town",
      "Fenced Yard",
      "Front Yard",
      "Garden",
      "New Construction",
      "Not Furnished",
      "Pet friendly",
      "Storage",
      "Title | Fully-titled Ownership",
    ],
    agent: "Dominique Brousseau",
    isFeatured: true,
    images: [
      {
        src: "https://relaxcostarica.com/wp-content/uploads/2026/06/Garabito-Central-Pacific-Costa-RicaHermosa-Beach-For-Sale-108920-525x328.jpg",
        alt: "NEW Beautiful 3-Bedroom Home with Pool | Hermosa Beach",
      },
    ],
  },
  {
    slug: "modern-turnkey-viva-jaco-condo",
    url: "#",
    title: 'MODERN "NEW" TURN-KEY VIVA JACO CONDO',
    price: 219000,
    priceLabel: "$ 219,000",
    category: "Condo | Apartment",
    categorySlug: "condo-apartment",
    status: "for-sale",
    bedrooms: 2,
    bathrooms: 1,
    sizeM2: 72,
    agent: "Dominique Brousseau",
    images: [
      {
        src: "https://relaxcostarica.com/wp-content/uploads/2026/06/Garabito-Central-Pacific-Costa-RicaJaco-For-Sale-108867-525x328.jpg",
        alt: "Viva Jaco Condo",
      },
    ],
  },
  {
    slug: "boutique-property-rooftop-jaco-beach",
    url: "#",
    title: "Boutique Property with Rooftop in Jaco Beach",
    price: 2500000,
    priceLabel: "$ 2,500,000",
    category: "Hotel | BNB",
    categorySlug: "hotel-bnb-apt-building",
    status: "for-sale",
    bedrooms: 9,
    bathrooms: 11,
    agent: "Dominique Brousseau",
    images: [
      {
        src: "https://relaxcostarica.com/wp-content/uploads/2026/06/Garabito-Central-Pacific-Costa-RicaJaco-108280-525x328.jpg",
        alt: "Boutique Property Jaco",
      },
    ],
  },
  {
    slug: "stunning-oceanfront-condo-south-jaco",
    url: "#",
    title: "Stunning Oceanfront Condo in South Jacó with Panoramic Views",
    price: 499000,
    priceLabel: "$ 499,000",
    category: "Condo | Apartment",
    categorySlug: "condo-apartment",
    status: "for-sale",
    bedrooms: 2,
    bathrooms: 2,
    sizeM2: 137,
    agent: "Dominique Brousseau",
    images: [
      {
        src: "https://relaxcostarica.com/wp-content/uploads/2026/06/Garabito-Central-Pacific-Costa-RicaJaco-108902-525x328.jpeg",
        alt: "Oceanfront Condo Jaco",
      },
    ],
  },
];
