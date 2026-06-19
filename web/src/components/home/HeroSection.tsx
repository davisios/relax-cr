import Link from "next/link";
import { ChevronDown } from "lucide-react";
import PropertySearchWidget from "./PropertySearchWidget";

export default function HeroSection() {
  return (
    <section className="relative min-h-[55vh] flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://relaxcostarica.com/wp-content/uploads/2021/09/jaco-beach-aerial-1.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center container-page pt-20 pb-6">
        {/* Eyebrow */}
        <span className="inline-block font-sans text-sm font-medium tracking-widest uppercase text-sand-300 mb-4">
          RE/MAX Oceanside Realty · Jaco Beach, Costa Rica
        </span>

        {/* Headline */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-4xl">
          Dominique Brousseau
          <br />
          <span className="text-sand-300">Jaco Beach</span> Real Estate Agent
        </h1>

        {/* Subheadline */}
        <p className="mt-4 font-sans text-base text-white/80 max-w-xl leading-relaxed">
          Fluent in English, Spanish & French — helping you find your dream
          property in Costa Rica&apos;s most vibrant beach town.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mt-5 mb-6">
          <Link href="/properties" className="btn-primary px-8 py-3.5 text-base">
            Browse Listings
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white font-sans font-medium px-8 py-3.5 rounded-md hover:bg-white hover:text-ocean-900 transition-all duration-200 text-base"
          >
            Let&apos;s Connect
          </Link>
        </div>

        {/* Search Widget */}
        <PropertySearchWidget />
      </div>

      {/* Scroll indicator */}
      <div className="relative flex justify-center pb-8 animate-bounce">
        <ChevronDown size={28} className="text-white/50" />
      </div>
    </section>
  );
}
