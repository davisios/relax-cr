import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Neighborhood } from "@/lib/types/neighborhood";

export default function NeighborhoodCard({ neighborhood }: { neighborhood: Neighborhood }) {
  return (
    <Link
      href={`/neighborhoods/${neighborhood.slug}`}
      className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: neighborhood.image ? `url('${neighborhood.image}')` : undefined }}
        role="img"
        aria-label={`${neighborhood.name}, Costa Rica`}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-card-overlay" />

      {/* Content */}
      <div className="absolute bottom-0 inset-x-0 p-4">
        <div className="flex items-center gap-1.5 mb-1">
          <MapPin size={13} className="text-sand-300" />
          <span className="text-sand-300 text-xs font-sans">
            {neighborhood.listingCount} listings
          </span>
        </div>
        <h3 className="font-display text-white text-lg font-semibold leading-tight group-hover:text-sand-300 transition-colors">
          {neighborhood.name}
        </h3>
      </div>
    </Link>
  );
}
