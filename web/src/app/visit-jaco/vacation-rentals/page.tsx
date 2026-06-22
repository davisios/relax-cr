import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vacation Rentals in Jacó",
  description: "Find the perfect vacation rental in Jacó Beach, Costa Rica — beachfront condos, villas with pools, and gated communities managed by Dominique Brousseau.",
};

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

const FEATURED = [
  {
    title: "Tropical Condo Steps from Jacó Beach",
    price: "$175,000",
    beds: 1,
    baths: 1,
    size: "56 m²",
    slug: "tropical-condo-steps-from-jaco-beach",
    tags: ["Walk to Beach", "Air Conditioning", "Furnished"],
    gradient: "linear-gradient(135deg, #8fd6cb, #0c6f62)",
  },
  {
    title: "Live Jacó Penthouse with Ocean & Sunset Views",
    price: "$560,000",
    beds: 3,
    baths: 3,
    size: "139 m²",
    slug: "live-jaco-penthouse-ocean-sunset-views",
    tags: ["Ocean View", "Pool", "Air Conditioning"],
    gradient: "linear-gradient(135deg, #ffd7a6, #e76f8e)",
  },
  {
    title: "Modern Turn-Key Viva Jacó Condo",
    price: "$219,000",
    beds: 2,
    baths: 1,
    size: "72 m²",
    slug: "modern-turnkey-viva-jaco-condo",
    tags: ["Gated Community", "Pool", "Walk to Beach"],
    gradient: "linear-gradient(135deg, #bfe0f2, #3f7fb0)",
  },
];

export default function VacationRentalsPage() {
  return (
    <div style={{ paddingTop: "74px", background: "#fff" }}>

      {/* Hero */}
      <section style={{
        background: "radial-gradient(circle at 70% 30%, rgba(150,255,220,.08), transparent 50%), linear-gradient(150deg, #3fa896, #0c6f62)",
        padding: "72px 28px 64px",
        color: "#fff",
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,.75)" }}>
            Visit Jacó
          </span>
          <h1 style={{ margin: "12px 0 0", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, color: "#fff" }}>
            Vacation Rentals
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,.88)", maxWidth: "52ch" }}>
            Over 283 vacation rentals in Jacó Beach — beachfront condos, gated villas and ocean-view retreats, all managed by Dominique.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "32px" }}>
            {["Beachfront", "Ocean View", "Pool", "Gated Community", "Pet Friendly"].map((tag) => (
              <span key={tag} style={{ background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.35)", color: "#fff", fontWeight: 600, fontSize: "13px", padding: "7px 15px", borderRadius: "999px" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Filter amenities */}
      <section style={{ padding: "48px 28px 0", background: "#f7f5f0", borderBottom: "1px solid #ece8df" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <p style={{ margin: "0 0 18px", fontSize: "13px", fontWeight: 700, color: "#7a857f", textTransform: "uppercase", letterSpacing: "1.5px" }}>
            Filter by amenity
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingBottom: "28px" }}>
            {AMENITIES.map((a) => (
              <span
                key={a.label}
                style={{ background: "#fff", border: "1.5px solid #e0dccf", color: "#3a443f", fontWeight: 600, fontSize: "13.5px", padding: "8px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "6px" }}
              >
                {a.icon} {a.label}
              </span>
            ))}
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
            {FEATURED.map((p) => (
              <Link key={p.slug} href={`/properties/${p.slug}`} style={{ textDecoration: "none" }}>
                <article style={{ background: "#fff", border: "1px solid #ece8df", borderRadius: "20px", overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ height: "210px", background: p.gradient, display: "flex", alignItems: "flex-end", padding: "16px" }}>
                    <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
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
                      {p.beds} Bd · {p.baths} Ba · {p.size}
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

      {/* Contact */}
      <section style={{ padding: "0 28px 100px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", background: "linear-gradient(150deg, #3fa896, #0c6f62)", borderRadius: "24px", padding: "52px 48px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px", color: "#fff" }}>
          <div style={{ maxWidth: "50ch" }}>
            <h3 style={{ margin: 0, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-1px" }}>
              Looking for the perfect rental?
            </h3>
            <p style={{ margin: "12px 0 0", fontSize: "15.5px", lineHeight: 1.65, opacity: .92 }}>
              Tell Dominique what you need — dates, budget, amenities — and she'll find your ideal match from 283+ properties.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="mailto:dbjacocostarica@gmail.com" style={{ textDecoration: "none", textAlign: "center", background: "#fff", color: "#0c6f62", fontWeight: 700, fontSize: "15px", padding: "14px 32px", borderRadius: "999px" }}>
              Email Dominique
            </a>
            <a href="https://wa.me/50684365277" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", textAlign: "center", border: "1.5px solid rgba(255,255,255,.6)", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "14px 32px", borderRadius: "999px" }}>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
