import Link from "next/link";
import type { Metadata } from "next";
import { NEIGHBORHOODS } from "@/lib/data/neighborhoods";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description: "Explore Jacó Beach neighborhoods — find the area that fits your lifestyle and budget on Costa Rica's Central Pacific coast.",
};

const PALETTES: Record<string, string[]> = {
  ocean: ["#8fd6cb", "#2fa494", "#0c6f62"],
  sunset: ["#ffd7a6", "#ff9b78", "#e76f8e"],
  jungle: ["#bfe39c", "#5fae6e", "#2c7a4f"],
  sand: ["#efe2c6", "#d8bd8e", "#b1925c"],
  sky: ["#bfe0f2", "#7bb6dd", "#3f7fb0"],
};

function heroBgFor(pal: string) {
  const c = PALETTES[pal] || PALETTES.ocean;
  return `linear-gradient(155deg, ${c[0]} 0%, ${c[1]} 55%, ${c[2]} 100%)`;
}

export default function NeighborhoodsIndexPage() {
  return (
    <div style={{ paddingTop: "74px" }}>
      {/* Header */}
      <section style={{ padding: "72px 28px 56px", background: "#fff" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, color: "#0e7a66" }}>
            Central Pacific · Costa Rica
          </span>
          <h1
            style={{
              margin: "12px 0 0",
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-2px",
              fontWeight: 800,
              color: "#16201d",
              lineHeight: 1,
            }}
          >
            Explore Neighborhoods
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: "18px", lineHeight: 1.6, color: "#5b6660", maxWidth: "52ch" }}>
            From surf-town energy to private gated reserves — find the area that matches your lifestyle and budget.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "0 28px 100px", background: "#fff" }}>
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "28px",
          }}
        >
          {NEIGHBORHOODS.map((n) => (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid #ece8df",
                  transition: "transform .3s ease, box-shadow .3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 44px -22px rgba(20,60,52,.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "none";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    height: "200px",
                    background: n.image
                      ? `url(${n.image}) center/cover no-repeat`
                      : heroBgFor(n.pal),
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "20px",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,30,26,.55), transparent 60%)" }} />
                  <span
                    style={{
                      position: "relative",
                      background: "rgba(255,255,255,.2)",
                      border: "1px solid rgba(255,255,255,.4)",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "12px",
                      padding: "5px 12px",
                      borderRadius: "999px",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {n.region}
                  </span>
                </div>
                <div style={{ padding: "22px 22px 24px", background: "#fff" }}>
                  <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "#16201d", letterSpacing: "-.5px" }}>
                    {n.name}
                  </h2>
                  <p style={{ margin: "8px 0 0", fontSize: "14.5px", lineHeight: 1.6, color: "#5b6660" }}>
                    {n.tagline}
                  </p>
                  <div
                    style={{
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: "1px solid #f0ece3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#0e7a66" }}>
                      {n.listingCount} listings
                    </span>
                    <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#16201d", display: "flex", alignItems: "center", gap: "5px" }}>
                      Explore <span style={{ fontSize: "15px" }}>→</span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
