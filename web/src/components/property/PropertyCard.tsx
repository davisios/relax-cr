import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize2, User } from "lucide-react";
import { formatPrice, formatArea } from "@/lib/utils/format";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Property } from "@/lib/types/property";
import { cn } from "@/lib/utils/cn";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const heroImage = property.images[0];
  const href = `/properties/${property.slug}`;
  const isLot = property.categorySlug === "lot-vacant-land";
  const areaM2 = isLot ? property.lotSizeM2 ?? property.sizeM2 : property.sizeM2;
  const showBedrooms = !isLot && (property.bedrooms ?? 0) > 0;
  const showBathrooms = !isLot && (property.bathrooms ?? 0) > 0;
  const showSpecs = showBedrooms || showBathrooms || areaM2;

  return (
    <Link
      href={href}
      className={cn(
        "group card overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {heroImage ? (
          <Image
            src={heroImage.src}
            alt={heroImage.alt || property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-100 to-ocean-200 flex items-center justify-center">
            <span className="text-ocean-400 text-sm">No image</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-card-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={property.status} />
        </div>

        {/* Category tag */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="badge bg-white/90 text-ocean-900 text-[11px]">
            {property.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-display text-lg font-semibold text-ocean-900 leading-snug line-clamp-2 group-hover:text-ocean-700 transition-colors">
          {property.title}
        </h3>

        {/* Specs */}
        {showSpecs && (
          <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
            {showBedrooms && (
              <span className="flex items-center gap-1">
                <Bed size={14} />
                {property.bedrooms}
              </span>
            )}
            {showBathrooms && (
              <span className="flex items-center gap-1">
                <Bath size={14} />
                {property.bathrooms}
              </span>
            )}
            {areaM2 && (
              <span className="flex items-center gap-1">
                <Maximize2 size={14} />
                {formatArea(areaM2)}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
          <span className="font-display text-xl font-bold text-ocean-900">
            {formatPrice(property.price)}
          </span>
          {property.agent && (
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <User size={12} />
              {property.agent.split(" ")[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
