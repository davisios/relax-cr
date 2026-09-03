import type { PropertyStatus } from "@/lib/types/property";

export interface MapListing {
  slug: string;
  title: string;
  price: number | null;
  priceLabel: string | null;
  status: PropertyStatus;
  category: string;
  city: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  sizeM2: number | null;
  image: { src: string; alt: string } | null;
  lat: number;
  lng: number;
}
