"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { SlidersHorizontal, X, LayoutGrid, List, ChevronDown } from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";
import type { Property } from "@/lib/types/property";
import { cn } from "@/lib/utils/cn";

// ─── Filter options ───────────────────────────────────────────────────────────

const TYPES = [
  { value: "", label: "All Types" },
  { value: "condo-apartment", label: "Condo / Apartment" },
  { value: "house-villa", label: "House / Villa" },
  { value: "lot-vacant-land", label: "Lot / Land" },
  { value: "multi-family-duplex-triplex", label: "Multi-Family" },
  { value: "hotel-bnb-apt-building", label: "Hotel / BnB" },
];

const CITIES = [
  { value: "", label: "All Locations" },
  { value: "jaco", label: "Jacó" },
  { value: "hermosa-beach", label: "Hermosa Beach" },
  { value: "herradura", label: "Herradura" },
  { value: "punta-leona", label: "Punta Leona" },
  { value: "tarcoles", label: "Tárcoles" },
  { value: "esterillos", label: "Esterillos" },
];

const BEDS_OPTIONS = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

const BATHS_OPTIONS = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
];

const PRICE_MIN_OPTIONS = [
  { value: "", label: "No min" },
  { value: "100000", label: "$100,000" },
  { value: "200000", label: "$200,000" },
  { value: "300000", label: "$300,000" },
  { value: "500000", label: "$500,000" },
  { value: "750000", label: "$750,000" },
  { value: "1000000", label: "$1,000,000" },
];

const PRICE_MAX_OPTIONS = [
  { value: "", label: "No max" },
  { value: "200000", label: "$200,000" },
  { value: "300000", label: "$300,000" },
  { value: "500000", label: "$500,000" },
  { value: "750000", label: "$750,000" },
  { value: "1000000", label: "$1,000,000" },
  { value: "2000000", label: "$2,000,000" },
];

const FEATURES = [
  "Ocean View",
  "Beachfront",
  "Walk to Beach",
  "Pool",
  "Gated Community",
  "Furnished",
  "Partially Furnished",
  "Central A/C",
  "Great View",
  "New Construction",
  "Penthouse",
  "Jacuzzi",
  "Gym",
  "Elevator",
  "Pet friendly",
  "Balcony",
  "Garden",
  "24 hour security",
  "Seller Financing",
  "Wi-fi",
];

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: "1px solid #f0ece3", paddingBottom: "20px", marginBottom: "20px" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0 0 12px",
          fontFamily: "inherit",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "#16201d",
        }}
      >
        {title}
        <ChevronDown
          size={16}
          style={{
            color: "#7a857f",
            transition: "transform .2s ease",
            transform: open ? "rotate(180deg)" : "none",
          }}
        />
      </button>
      {open && children}
    </div>
  );
}

function SelectFilter({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        fontFamily: "inherit",
        fontSize: "14px",
        fontWeight: 500,
        color: "#16201d",
        background: "#fff",
        border: "1.5px solid #e0dccf",
        borderRadius: "10px",
        padding: "10px 14px",
        cursor: "pointer",
        outline: "none",
        appearance: "none",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  properties: Property[];
}

export default function PropertiesClient({ properties }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Read all filters from URL
  const urlType = searchParams.get("type") || "";
  const urlCity = searchParams.get("city") || "";
  const urlBeds = searchParams.get("beds") || "";
  const urlBaths = searchParams.get("baths") || "";
  const urlMinPrice = searchParams.get("minPrice") || "";
  const urlMaxPrice = searchParams.get("maxPrice") || "";
  const urlSort = searchParams.get("sort") || "default";
  const urlFeatures = searchParams.get("features") || "";
  const activeFeatures = urlFeatures ? urlFeatures.split(",") : [];

  // Push updated params to URL
  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`/properties?${params.toString()}`);
    },
    [searchParams, router]
  );

  const clearAll = () => router.push("/properties");

  const toggleFeature = useCallback(
    (feature: string) => {
      const next = activeFeatures.includes(feature)
        ? activeFeatures.filter((f) => f !== feature)
        : [...activeFeatures, feature];
      setParam("features", next.join(","));
    },
    [activeFeatures, setParam]
  );

  const activeCount = [urlType, urlCity, urlBeds, urlBaths, urlMinPrice, urlMaxPrice, urlFeatures].filter(Boolean).length;

  const filtered = useMemo(() => {
    let result = [...properties];

    if (urlType) result = result.filter((p) => p.categorySlug === urlType);
    if (urlCity) {
      result = result.filter(
        (p) =>
          p.citySlug === urlCity ||
          p.city?.toLowerCase().includes(urlCity.toLowerCase())
      );
    }
    if (urlBeds) result = result.filter((p) => (p.bedrooms ?? 0) >= parseInt(urlBeds));
    if (urlBaths) result = result.filter((p) => (p.bathrooms ?? 0) >= parseInt(urlBaths));
    if (urlMinPrice) result = result.filter((p) => (p.price ?? 0) >= parseInt(urlMinPrice));
    if (urlMaxPrice) result = result.filter((p) => (p.price ?? 0) <= parseInt(urlMaxPrice));
    if (activeFeatures.length > 0)
      result = result.filter((p) =>
        activeFeatures.every((f) => p.features?.includes(f))
      );

    if (urlSort === "price-asc") result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (urlSort === "price-desc") result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

    return result;
  }, [properties, urlType, urlCity, urlBeds, urlBaths, urlMinPrice, urlMaxPrice, urlSort, urlFeatures]);

  const sidebar = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <span style={{ fontWeight: 800, fontSize: "16px", color: "#16201d" }}>Filters</span>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              color: "#0e7a66",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <X size={13} /> Clear all
          </button>
        )}
      </div>

      <FilterSection title="Property Type">
        <SelectFilter value={urlType} options={TYPES} onChange={(v) => setParam("type", v)} />
      </FilterSection>

      <FilterSection title="Location">
        <SelectFilter value={urlCity} options={CITIES} onChange={(v) => setParam("city", v)} />
      </FilterSection>

      <FilterSection title="Bedrooms">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {BEDS_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => setParam("beds", o.value)}
              style={{
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: "13.5px",
                padding: "8px 14px",
                borderRadius: "999px",
                cursor: "pointer",
                border: `1.5px solid ${urlBeds === o.value ? "#0e7a66" : "#e0dccf"}`,
                background: urlBeds === o.value ? "#0e7a66" : "#fff",
                color: urlBeds === o.value ? "#fff" : "#3a443f",
                transition: "all .15s ease",
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Bathrooms">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {BATHS_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => setParam("baths", o.value)}
              style={{
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: "13.5px",
                padding: "8px 14px",
                borderRadius: "999px",
                cursor: "pointer",
                border: `1.5px solid ${urlBaths === o.value ? "#0e7a66" : "#e0dccf"}`,
                background: urlBaths === o.value ? "#0e7a66" : "#fff",
                color: urlBaths === o.value ? "#fff" : "#3a443f",
                transition: "all .15s ease",
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <SelectFilter
            value={urlMinPrice}
            options={PRICE_MIN_OPTIONS}
            onChange={(v) => setParam("minPrice", v)}
          />
          <SelectFilter
            value={urlMaxPrice}
            options={PRICE_MAX_OPTIONS}
            onChange={(v) => setParam("maxPrice", v)}
          />
        </div>
      </FilterSection>

      <FilterSection title="Features">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {FEATURES.map((f) => {
            const active = activeFeatures.includes(f);
            return (
              <label
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: active ? "#0e7a66" : "#3a443f",
                }}
              >
                <span
                  onClick={() => toggleFeature(f)}
                  style={{
                    flexShrink: 0,
                    width: "18px",
                    height: "18px",
                    borderRadius: "5px",
                    border: `2px solid ${active ? "#0e7a66" : "#d0ccc2"}`,
                    background: active ? "#0e7a66" : "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all .15s ease",
                  }}
                >
                  {active && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span onClick={() => toggleFeature(f)}>{f}</span>
              </label>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 28px 80px" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "28px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Mobile filter toggle */}
          <button
            className="lg:hidden"
            onClick={() => setDrawerOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: "14px",
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1.5px solid #e0dccf",
              background: activeCount > 0 ? "#0e7a66" : "#fff",
              color: activeCount > 0 ? "#fff" : "#16201d",
              cursor: "pointer",
            }}
          >
            <SlidersHorizontal size={15} />
            Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>

          <span style={{ fontSize: "14px", color: "#7a857f", fontWeight: 600 }}>
            {filtered.length} {filtered.length === 1 ? "listing" : "listings"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <select
            value={urlSort}
            onChange={(e) => setParam("sort", e.target.value)}
            style={{
              fontFamily: "inherit",
              fontSize: "14px",
              fontWeight: 500,
              color: "#16201d",
              background: "#fff",
              border: "1.5px solid #e0dccf",
              borderRadius: "10px",
              padding: "9px 14px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <div style={{ display: "flex", border: "1.5px solid #e0dccf", borderRadius: "10px", overflow: "hidden" }}>
            <button
              onClick={() => setView("grid")}
              style={{
                padding: "9px 12px",
                border: "none",
                cursor: "pointer",
                background: view === "grid" ? "#0e7a66" : "#fff",
                color: view === "grid" ? "#fff" : "#7a857f",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              style={{
                padding: "9px 12px",
                border: "none",
                borderLeft: "1px solid #e0dccf",
                cursor: "pointer",
                background: view === "list" ? "#0e7a66" : "#fff",
                color: view === "list" ? "#fff" : "#7a857f",
                display: "flex",
                alignItems: "center",
              }}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Layout: sidebar + results */}
      <div style={{ display: "flex", gap: "36px", alignItems: "flex-start" }}>
        {/* Desktop sidebar */}
        <aside
          className="hidden lg:block"
          style={{
            flexShrink: 0,
            width: "256px",
            position: "sticky",
            top: "94px",
            maxHeight: "calc(100vh - 110px)",
            overflowY: "auto",
            background: "#fff",
            border: "1px solid #ece8df",
            borderRadius: "18px",
            padding: "24px 22px",
          }}
        >
          {sidebar}
        </aside>

        {/* Results */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#7a857f" }}>
              <p style={{ fontSize: "18px", fontWeight: 600, margin: "0 0 16px" }}>
                No properties match your filters.
              </p>
              <button
                onClick={clearAll}
                style={{
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "14.5px",
                  padding: "11px 24px",
                  borderRadius: "999px",
                  border: "1.5px solid #0e7a66",
                  background: "#fff",
                  color: "#0e7a66",
                  cursor: "pointer",
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "24px",
                gridTemplateColumns: view === "grid" ? "repeat(auto-fill, minmax(290px, 1fr))" : "1fr",
              }}
            >
              {filtered.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 70 }}>
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(11,23,20,.5)", backdropFilter: "blur(4px)" }}
            onClick={() => setDrawerOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "320px",
              background: "#fff",
              boxShadow: "20px 0 60px rgba(0,0,0,.15)",
              overflowY: "auto",
              padding: "24px 22px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#5b6660", padding: "4px" }}
              >
                <X size={20} />
              </button>
            </div>
            {sidebar}
            <button
              onClick={() => setDrawerOpen(false)}
              style={{
                width: "100%",
                marginTop: "8px",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: "15px",
                padding: "14px",
                borderRadius: "999px",
                border: "none",
                background: "#0e7a66",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Show {filtered.length} listings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
