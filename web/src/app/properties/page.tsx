import { Suspense } from "react";
import Link from "next/link";
import { Map } from "lucide-react";
import PropertiesClient from "./PropertiesClient";
import { getAllProperties } from "@/lib/data/properties";

export const metadata = {
  title: "Properties for Sale in Jaco Beach, Costa Rica",
  description:
    "Browse all available properties in Jaco Beach, Hermosa, Herradura, Punta Leona and the Central Pacific coast of Costa Rica.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  const properties = getAllProperties();

  return (
    <div className="pt-20 min-h-screen">
      {/* Page Header */}
      <div className="bg-ocean-900 text-white py-14">
        <div className="container-page flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-sand-500 font-sans text-sm font-semibold uppercase tracking-widest">
              Jaco Beach, Costa Rica
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mt-3">
              Properties for Sale
            </h1>
            <p className="text-white/60 mt-3 text-lg">
              {properties.length}+ listings across the Central Pacific coast
            </p>
          </div>
          <Link
            href="/properties/map"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-ocean-900"
          >
            <Map size={17} />
            Map View
          </Link>
        </div>
      </div>

      <Suspense fallback={<div className="container-page py-20 text-center text-neutral-400">Loading properties…</div>}>
        <PropertiesClient properties={properties} />
      </Suspense>
    </div>
  );
}
