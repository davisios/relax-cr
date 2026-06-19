import Link from "next/link";
import { TrendingUp, Search } from "lucide-react";

export default function SellerBuyerCTA() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seller CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-ocean-900 text-white p-10 flex flex-col justify-between min-h-[280px]">
            {/* BG decoration */}
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-ocean-700 opacity-30" />
            <div className="absolute -right-4 -bottom-8 w-32 h-32 rounded-full bg-sand-500 opacity-20" />

            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                <TrendingUp size={22} className="text-sand-300" />
              </div>
              <p className="font-sans text-sm font-semibold uppercase tracking-widest text-sand-500 mb-2">
                For Sellers
              </p>
              <h3 className="font-display text-3xl font-semibold text-white mb-3">
                Are you selling your home?
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Get a free market estimation and learn how Dominique&apos;s modern
                marketing approach can get your property sold faster.
              </p>
            </div>

            <Link
              href="/property-valuation"
              className="relative mt-8 self-start inline-flex items-center gap-2 bg-sand-500 hover:bg-sand-700 text-white font-sans font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Get Estimation
            </Link>
          </div>

          {/* Buyer CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-jungle-700 text-white p-10 flex flex-col justify-between min-h-[280px]">
            {/* BG decoration */}
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-jungle-500 opacity-30" />
            <div className="absolute -right-4 -bottom-8 w-32 h-32 rounded-full bg-ocean-100 opacity-10" />

            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                <Search size={22} className="text-jungle-100" />
              </div>
              <p className="font-sans text-sm font-semibold uppercase tracking-widest text-jungle-100 mb-2">
                For Buyers
              </p>
              <h3 className="font-display text-3xl font-semibold text-white mb-3">
                Are you looking to buy a home?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Browse 280+ listings across Jaco Beach, Hermosa, Herradura, Punta
                Leona and more. Find your Costa Rica dream property today.
              </p>
            </div>

            <Link
              href="/properties"
              className="relative mt-8 self-start inline-flex items-center gap-2 bg-white text-jungle-700 font-sans font-semibold px-6 py-3 rounded-lg hover:bg-jungle-100 transition-colors"
            >
              Search Listings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
