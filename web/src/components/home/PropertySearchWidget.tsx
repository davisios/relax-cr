"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const PROPERTY_TYPES = [
  { value: "", label: "All Types" },
  { value: "condo-apartment", label: "Condo / Apartment" },
  { value: "house-villa", label: "House / Villa" },
  { value: "lot-vacant-land", label: "Lot / Land" },
  { value: "multi-family-duplex-triplex", label: "Multi-Family" },
  { value: "hotel-bnb-apt-building", label: "Hotel / BnB" },
];

const LOCATIONS = [
  { value: "", label: "All Locations" },
  { value: "jaco", label: "Jacó" },
  { value: "hermosa-beach", label: "Hermosa Beach" },
  { value: "herradura", label: "Herradura" },
  { value: "punta-leona", label: "Punta Leona" },
  { value: "tarcoles", label: "Tárcoles" },
  { value: "esterillos", label: "Esterillos" },
];

const BEDS_OPTIONS = [
  { value: "", label: "Beds" },
  { value: "1", label: "1+ Beds" },
  { value: "2", label: "2+ Beds" },
  { value: "3", label: "3+ Beds" },
  { value: "4", label: "4+ Beds" },
];

const BATHS_OPTIONS = [
  { value: "", label: "Baths" },
  { value: "1", label: "1+ Baths" },
  { value: "2", label: "2+ Baths" },
  { value: "3", label: "3+ Baths" },
];

const PRICE_MAX_OPTIONS = [
  { value: "", label: "Max Price" },
  { value: "200000", label: "Up to $200k" },
  { value: "300000", label: "Up to $300k" },
  { value: "500000", label: "Up to $500k" },
  { value: "750000", label: "Up to $750k" },
  { value: "1000000", label: "Up to $1M" },
  { value: "2000000", label: "Up to $2M" },
];

const selectClass =
  "w-full bg-white text-neutral-800 rounded-lg px-4 py-3 text-sm font-medium border-0 focus:ring-2 focus:ring-ocean-500 outline-none appearance-none cursor-pointer";

export default function PropertySearchWidget() {
  const router = useRouter();
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (location) params.set("city", location);
    if (beds) params.set("beds", beds);
    if (baths) params.set("baths", baths);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-hero">
      {/* Row 1: Type + Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
          {PROPERTY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass}>
          {LOCATIONS.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </div>

      {/* Row 2: Beds + Baths + Max Price */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <select value={beds} onChange={(e) => setBeds(e.target.value)} className={selectClass}>
          {BEDS_OPTIONS.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
        <select value={baths} onChange={(e) => setBaths(e.target.value)} className={selectClass}>
          {BATHS_OPTIONS.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
        <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={selectClass}>
          {PRICE_MAX_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="w-full flex items-center justify-center gap-2 bg-ocean-700 hover:bg-ocean-900 text-white font-sans font-semibold rounded-lg px-6 py-3 text-sm transition-colors"
      >
        <Search size={16} />
        Search Listings
      </button>
    </div>
  );
}
