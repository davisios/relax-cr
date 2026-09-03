"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FEATURED, type RentalImage } from "./featured-rentals";

const AMENITIES = [
  { icon: "🔒", label: "24-hour Security" },
  { icon: "❄️", label: "Air Conditioning" },
  { icon: "🏖️", label: "Beachfront" },
  { icon: "🛋️", label: "Furnished" },
  { icon: "🔑", label: "Gated Community" },
  { icon: "🌊", label: "Ocean View" },
  { icon: "🐾", label: "Pet Friendly" },
  { icon: "🏊", label: "Pool" },
  { icon: "🚶", label: "Walk to Beach" },
];

export default function RentalsExplorer({
  images,
}: {
  /** First real photo of each listing, keyed by slug — from properties.json via the server page. */
  images: Record<string, RentalImage | undefined>;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (label: string) =>
    setSelected((current) =>
      current.includes(label)
        ? current.filter((l) => l !== label)
        : [...current, label],
    );

  const visible = FEATURED.filter((p) =>
    selected.every((label) => p.tags.includes(label)),
  );

  return (
    <>
      {/* Filter amenities */}
      <section style={{ padding: "48px 28px 0", background: "#f7f5f0", borderBottom: "1px solid #ece8df" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <p style={{ margin: "0 0 18px", fontSize: "13px", fontWeight: 700, color: "#7a857f", textTransform: "uppercase", letterSpacing: "1.5px" }}>
            Filter by amenity
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingBottom: "28px" }}>
            {AMENITIES.map((a) => {
              const active = selected.includes(a.label);
              return (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => toggle(a.label)}
                  aria-pressed={active}
                  style={{
                    background: active ? "#0e7a66" : "#fff",
                    border: active ? "1.5px solid #0e7a66" : "1.5px solid #e0dccf",
                    color: active ? "#fff" : "#3a443f",
                    fontWeight: 600,
                    fontSize: "13.5px",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all .15s ease",
                  }}
                >
                  {a.icon} {a.label}
                </button>
              );
            })}
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => setSelected([])}
                style={{
                  background: "none",
                  border: "none",
                  color: "#0e7a66",
                  fontWeight: 700,
                  fontSize: "13.5px",
                  padding: "8px 10px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textDecoration: "underline",
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section style={{ padding: "56px 28px 80px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, color: "#0e7a66" }}>
            Featured rentals
          </span>
          <h2 style={{ margin: "10px 0 36px", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, color: "#16201d", letterSpacing: "-1.2px" }}>
            Curated picks by Dominique
          </h2>

          {visible.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 24px", border: "1px dashed #e0dccf", borderRadius: "20px", color: "#5b6660" }}>
              <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.6 }}>
                No featured rental matches that combination — but Dominique manages 283+ properties.{" "}
                <Link href="/contact" style={{ color: "#0e7a66", fontWeight: 700 }}>
                  Tell her what you need
                </Link>{" "}
                and she&apos;ll find it.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
              {visible.map((p) => (
                <Link key={p.slug} href={`/properties/${p.slug}`} style={{ textDecoration: "none" }}>
                  <article style={{ background: "#fff", border: "1px solid #ece8df", borderRadius: "20px", overflow: "hidden", cursor: "pointer" }}>
                    <div style={{ height: "210px", background: p.gradient, display: "flex", alignItems: "flex-end", padding: "16px", position: "relative" }}>
                      {images[p.slug] && (
                        <Image
                          src={images[p.slug]!.src}
                          alt={images[p.slug]!.alt || p.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                      )}
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,30,26,.45), transparent 55%)" }} />
                      <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", position: "relative" }}>
                        {p.tags.map((tag) => (
                          <span key={tag} style={{ background: "rgba(255,255,255,.9)", color: "#0e7a66", fontWeight: 700, fontSize: "11.5px", padding: "4px 10px", borderRadius: "999px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: "20px 22px 22px" }}>
                      <h3 style={{ margin: "0 0 10px", fontSize: "17px", fontWeight: 700, color: "#16201d", lineHeight: 1.3 }}>
                        {p.title}
                      </h3>
                      <div style={{ fontSize: "13.5px", color: "#7a857f", fontWeight: 600, marginBottom: "14px" }}>
                        {p.beds} Bd · {p.baths} Ba
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid #f0ece3" }}>
                        <span style={{ fontSize: "22px", fontWeight: 800, color: "#0e7a66", letterSpacing: "-.6px" }}>{p.price}</span>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#16201d" }}>View details →</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* All listings CTA */}
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link
              href="/properties"
              style={{ textDecoration: "none", display: "inline-block", background: "#0e7a66", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "14px 36px", borderRadius: "999px" }}
            >
              Browse all 283 listings →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
