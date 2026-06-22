import Link from "next/link";
import { ChevronDown } from "lucide-react";
import PropertySearchWidget from "./PropertySearchWidget";
import HeroSlideshow from "./HeroSlideshow";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <HeroSlideshow />
      <div className="absolute inset-0 bg-hero-gradient" />

      <div className="relative z-10 w-full container-page px-4 py-28 md:py-32 flex flex-col items-center justify-center text-center">
        <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-sand-300 mb-5 max-w-3xl">
          Dominique Brousseau · Jaco Beach Real Estate Agent
        </p>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] max-w-5xl">
          Top Real Estate Listings in Jacó Beach, Costa Rica
        </h1>

        <p className="mt-5 font-sans text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
          Fluent in English, Spanish & French — helping you find your dream
          property in Costa Rica&apos;s most vibrant beach town.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mt-8 mb-10">
          <Link href="/properties" className="bg-[#1EB6A7] text-white rounded-full px-8 py-3.5 text-base">
            Browse Listings
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white font-sans font-medium px-8 py-3.5 rounded-md hover:bg-white hover:text-ocean-900 transition-all duration-200 text-base"
          >
            Let&apos;s Connect
          </Link>
        </div>

        <div className="w-full flex justify-center">
          <PropertySearchWidget />
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center animate-bounce pointer-events-none">
        <ChevronDown size={28} className="text-white/50" />
      </div>
    </section>
  );
}
