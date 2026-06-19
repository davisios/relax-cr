export type PropertyStatus =
  | "for-sale"
  | "sold"
  | "in-contract"
  | "recently-reduced"
  | "exclusive";

export type PropertyCategory =
  | "condo-apartment"
  | "house-villa"
  | "lot-vacant-land"
  | "multi-family-duplex-triplex"
  | "hotel-bnb-apt-building"
  | "commercial-building-office-space-warehouse";

export interface PropertyImage {
  src: string;
  alt: string;
}

export interface Property {
  slug: string;
  url: string;
  title: string;
  description?: string;
  price?: number;
  priceLabel?: string;
  category: string;
  categorySlug: PropertyCategory;
  status: PropertyStatus;
  city?: string;
  area?: string;
  bedrooms?: number;
  bathrooms?: number;
  sizeM2?: number;
  lotSizeM2?: number;
  yearBuilt?: number;
  garages?: string;
  features?: string[];
  images: PropertyImage[];
  agent?: string;
  isFeatured?: boolean;
}
