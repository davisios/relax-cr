import Link from "next/link";
import { LandPlot, Home, Building2, Hotel } from "lucide-react";

const CATEGORIES = [
  {
    icon: LandPlot,
    label: "Lot | Vacant Land",
    count: 41,
    href: "/properties?type=lot-vacant-land",
    color: "bg-jungle-100 text-jungle-700",
  },
  {
    icon: Home,
    label: "House | Villa",
    count: 60,
    href: "/properties?type=house-villa",
    color: "bg-ocean-100 text-ocean-700",
  },
  {
    icon: Building2,
    label: "Condo | Apartment",
    count: 150,
    href: "/properties?type=condo-apartment",
    color: "bg-sand-100 text-sand-700",
  },
  {
    icon: Hotel,
    label: "Multi-family | Duplex | Triplex",
    count: 12,
    href: "/properties?type=multi-family-duplex-triplex",
    color: "bg-purple-50 text-purple-700",
  },
];

export default function PopularCategories() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-ocean-700 font-sans text-sm font-semibold uppercase tracking-widest">
            What are you looking for?
          </span>
          <h2 className="section-title mt-3">Popular Categories</h2>
          <p className="section-subtitle mx-auto">
            Whether you&apos;re looking to build, invest, or enjoy a low-maintenance lifestyle,
            our selection caters to every need.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {CATEGORIES.map(({ icon: Icon, label, count, href, color }) => (
            <Link
              key={label}
              href={href}
              className="group card p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
                <Icon size={26} />
              </div>
              <h3 className="font-display text-base font-semibold text-ocean-900 leading-snug mb-2">
                {label}
              </h3>
              <span className="font-sans text-sm font-semibold text-neutral-400">
                {count} Listings
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
