import type { Metadata } from "next";
import { NEIGHBORHOODS } from "@/lib/data/neighborhoods";
import NeighborhoodsIndexGrid from "./NeighborhoodsGrid";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description: "Explore Jacó Beach neighborhoods — find the area that fits your lifestyle and budget on Costa Rica's Central Pacific coast.",
};

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
        <NeighborhoodsIndexGrid neighborhoods={NEIGHBORHOODS} />
      </section>
    </div>
  );
}
