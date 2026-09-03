import type { Metadata } from "next";
import { getAllProperties } from "@/lib/data/properties";
import MapViewClient from "./MapViewClient";
import type { MapListing } from "./types";

export const metadata: Metadata = {
  title: "Property Map — Browse Listings Across the Central Pacific",
  description:
    "Explore every property for sale in Jaco Beach, Hermosa, Herradura, Punta Leona and Esterillos on an interactive map with live prices.",
  alternates: { canonical: "/properties/map" },
};

export default function PropertyMapPage() {
  const listings: MapListing[] = getAllProperties()
    .filter((p) => p.latitude && p.longitude)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      price: p.price ?? null,
      priceLabel: p.priceLabel ?? null,
      status: p.status,
      category: p.category,
      city: p.city ?? null,
      bedrooms: p.bedrooms ?? null,
      bathrooms: p.bathrooms ?? null,
      sizeM2: p.sizeM2 ?? null,
      image: p.images[0] ? { src: p.images[0].src, alt: p.images[0].alt } : null,
      lat: p.latitude as number,
      lng: p.longitude as number,
    }));

  return <MapViewClient listings={listings} />;
}
