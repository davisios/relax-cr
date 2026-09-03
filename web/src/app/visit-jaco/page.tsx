import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Visit Jacó — Things to Do, Eat & Where to Stay",
  description:
    "Plan your trip to Jacó Beach, Costa Rica: the best tours and activities, top restaurants, and vacation rentals — local tips from Dominique Brousseau.",
  alternates: { canonical: "/visit-jaco" },
};

const SECTIONS = [
  {
    href: "/visit-jaco/tours",
    emoji: "🏄",
    title: "Tours & Activities",
    description:
      "ATV rides, sport fishing, zip lines, crocodile tours, rafting, surf lessons and island trips — adventure is always around the corner.",
  },
  {
    href: "/visit-jaco/restaurants",
    emoji: "🍽️",
    title: "Top Restaurants",
    description:
      "The best places to eat in Jacó — fresh seafood, international fusion, and local favorites picked by someone who lives here.",
  },
  {
    href: "/visit-jaco/vacation-rentals",
    emoji: "🏖️",
    title: "Vacation Rentals",
    description:
      "Beachfront condos, villas with pools and gated communities — stay in Jacó the comfortable way before you decide to buy.",
  },
];

export default function VisitJacoPage() {
  return (
    <div style={{ paddingTop: "74px", background: "#fff" }}>
      {/* Hero */}
      <section
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(100,200,255,.12), transparent 50%), linear-gradient(150deg, #0ea5e9, #0369a1)",
          padding: "72px 28px 64px",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,.75)" }}>
            Central Pacific · Costa Rica
          </span>
          <h1 style={{ margin: "12px 0 0", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, color: "#fff" }}>
            Discover Jacó Beach
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,.88)", maxWidth: "52ch" }}>
            Surf town, food scene, jungle playground — here is everything to do, eat and book on your visit to Jacó.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section style={{ padding: "64px 28px 48px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              style={{
                textDecoration: "none",
                border: "1px solid #ece8df",
                borderRadius: "20px",
                padding: "32px 30px",
                background: "#fff",
                display: "block",
              }}
            >
              <span style={{ fontSize: "34px" }} aria-hidden>
                {section.emoji}
              </span>
              <h2 style={{ margin: "14px 0 8px", fontSize: "22px", fontWeight: 800, color: "#16201d", letterSpacing: "-.5px" }}>
                {section.title}
              </h2>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.65, color: "#5b6660" }}>
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Cross-link to the real estate side */}
      <section style={{ padding: "0 28px 96px" }}>
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            borderRadius: "24px",
            padding: "40px 44px",
            background: "linear-gradient(150deg, #3fa896, #0c6f62)",
            color: "#fff",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div style={{ maxWidth: "52ch" }}>
            <h2 style={{ margin: 0, fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, letterSpacing: "-.8px", lineHeight: 1.15 }}>
              Fell in love with Jacó? You can live here.
            </h2>
            <p style={{ margin: "10px 0 0", fontSize: "15.5px", lineHeight: 1.6, opacity: 0.92 }}>
              Browse condos, houses and lots for sale, or explore the neighborhoods along the Central Pacific coast.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/properties"
              style={{ textDecoration: "none", background: "#fff", color: "#0c6f62", fontWeight: 700, fontSize: "15px", padding: "13px 28px", borderRadius: "999px" }}
            >
              Properties for Sale
            </Link>
            <Link
              href="/neighborhoods"
              style={{ textDecoration: "none", border: "1.5px solid rgba(255,255,255,.6)", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "13px 28px", borderRadius: "999px" }}
            >
              Neighborhoods
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
