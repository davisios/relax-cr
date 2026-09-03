import { NEIGHBORHOODS } from "@/lib/data/neighborhoods";
import NeighborhoodCard from "./NeighborhoodCard";

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
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {NEIGHBORHOODS.map((n) => (
            <NeighborhoodCard key={n.slug} neighborhood={n} />
          ))}
        </div>
      </div>
    </section>
  );
}
