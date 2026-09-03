import type { Metadata } from "next";
import { getPropertyBySlug } from "@/lib/data/properties";
import { FEATURED, type RentalImage } from "./featured-rentals";
import RentalsExplorer from "./RentalsExplorer";

export const metadata: Metadata = {
  title: "Vacation Rentals in Jacó",
  description: "Find the perfect vacation rental in Jacó Beach, Costa Rica — beachfront condos, villas with pools, and gated communities managed by Dominique Brousseau.",
  alternates: { canonical: "/visit-jaco/vacation-rentals" },
};

export default function VacationRentalsPage() {
  const images: Record<string, RentalImage | undefined> = {};
  for (const rental of FEATURED) {
    const property = getPropertyBySlug(rental.slug);
    const photo = property?.images[0];
    if (photo) images[rental.slug] = { src: photo.src, alt: photo.alt };
  }

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
        </div>
      </section>

      <RentalsExplorer images={images} />

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
