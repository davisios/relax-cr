import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";
import { FEATURED_PROPERTIES_FALLBACK } from "@/lib/data/properties";

export default function FeaturedProperties() {
  // Use fallback data — in production this could be fetched server-side
  const properties = FEATURED_PROPERTIES_FALLBACK;

  return (
    <section className="section-padding bg-cream">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-jungle-700 font-sans text-sm font-semibold uppercase tracking-widest">
              Latest & Best
            </span>
            <h2 className="section-title mt-3">Featured Properties</h2>
            <p className="section-subtitle mt-2">
              Explore Jaco Beach real estate with our diverse range of options.
            </p>
          </div>
          <Link
            href="/properties"
            className="btn-secondary shrink-0 self-start sm:self-auto"
          >
            View All Listings
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>

        {/* Load more */}
        <div className="mt-10 text-center">
          <Link href="/properties" className="btn-ghost text-ocean-700 font-medium">
            Load more listings
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
