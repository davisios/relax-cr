import type { Property } from "@/lib/types/property";

function buildMapEmbedUrl(property: Property): string | null {
  if (property.latitude && property.longitude) {
    return `https://maps.google.com/maps?q=${property.latitude},${property.longitude}&hl=en&z=15&output=embed`;
  }

  const query = [property.address, property.area, property.city, "Costa Rica"]
    .filter(Boolean)
    .join(", ");

  if (!query) return null;

  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=13&output=embed`;
}

function buildMapLinkUrl(property: Property): string | null {
  if (property.latitude && property.longitude) {
    return `https://www.google.com/maps?q=${property.latitude},${property.longitude}`;
  }

  const query = [property.address, property.area, property.city, "Costa Rica"]
    .filter(Boolean)
    .join(", ");

  if (!query) return null;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

interface Props {
  property: Property;
}

export default function PropertyMap({ property }: Props) {
  const embedUrl = buildMapEmbedUrl(property);
  const linkUrl = buildMapLinkUrl(property);

  if (!embedUrl || !linkUrl) return null;

  const locationLabel = [property.address, property.area, property.city, "Costa Rica"]
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ocean-900 mb-4">Location</h2>
      {locationLabel && (
        <p className="text-sm text-neutral-500 mb-4">{locationLabel}</p>
      )}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-100 bg-neutral-100">
        <iframe
          title={`Map of ${property.title}`}
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-sm font-semibold text-ocean-700 hover:text-ocean-900 transition-colors"
      >
        Open in Google Maps →
      </a>
    </div>
  );
}
