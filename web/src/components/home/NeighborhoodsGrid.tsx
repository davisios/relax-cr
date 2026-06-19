import Link from "next/link";
import { MapPin } from "lucide-react";
import { NEIGHBORHOODS } from "@/lib/data/neighborhoods";

export default function NeighborhoodsGrid() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sand-700 font-sans text-sm font-semibold uppercase tracking-widest">
            Where do you want to live?
          </span>
          <h2 className="section-title mt-3">Featured Neighborhoods</h2>
          <p className="section-subtitle mx-auto">
            Dominique ensures smooth and successful transactions, helping clients find
            their dream properties in these beautiful coastal areas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {NEIGHBORHOODS.map((n) => {
            return (
              <Link
                key={n.slug}
                href={`/neighborhoods/${n.slug}`}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: n.image ? `url('${n.image}')` : undefined }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-card-overlay" />

                {/* Content */}
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin size={13} className="text-sand-300" />
                    <span className="text-sand-300 text-xs font-sans">
                      {n.listingCount} listings
                    </span>
                  </div>
                  <h3 className="font-display text-white text-lg font-semibold leading-tight group-hover:text-sand-300 transition-colors">
                    {n.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
