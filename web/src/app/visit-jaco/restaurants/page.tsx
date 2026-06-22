import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Restaurants in Jacó",
  description: "The best places to eat in Jacó Beach, Costa Rica — from fresh seafood to international fusion and authentic Indian cuisine.",
};

const RESTAURANTS = [
  {
    name: "Graffiti Restro Cafe & Wine Bar",
    cuisine: "International Fusion",
    phone: "+506 2643-1708",
    website: "https://www.graffitirestro.com",
    description: "A bistro featuring a blackboard menu that changes daily based on the freshest local produce. Embraces sustainable practices and showcases Costa Rican street culture alongside fine dining.",
    emoji: "🍷",
    highlight: "Daily-changing menu",
  },
  {
    name: "Lemon Zest",
    cuisine: "Contemporary American",
    phone: "+506 2643-2591",
    website: "https://www.lemonzestjaco.com",
    description: "Fresh, locally-sourced ingredients and vibrant flavors in a relaxed setting. Known for signature dishes and creative cocktails that keep locals and visitors coming back.",
    emoji: "🍋",
    highlight: "Locally-sourced",
  },
  {
    name: "Hola India",
    cuisine: "Indian",
    phone: "+506 6258-2652",
    website: "https://holaindianrestaurantjaco.com",
    description: "Authentic Indian cuisine featuring spicy curries, tandoori preparations, and classic dishes prepared with imported spices in the heart of Jacó Beach.",
    emoji: "🍛",
    highlight: "Authentic tandoori",
  },
  {
    name: "Rayana Bar y Restaurante",
    cuisine: "Caribbean",
    phone: "+506 2201-7299",
    website: "https://www.facebook.com/RayanaCR",
    description: "Fresh seafood, tropical fruits, and Caribbean spices in a relaxed atmosphere. A favorite for its laid-back vibe and flavors that transport you straight to the islands.",
    emoji: "🦞",
    highlight: "Fresh seafood",
  },
  {
    name: "Tsunami Sushi",
    cuisine: "Japanese",
    phone: "+506 2643-1635",
    website: "https://www.tsunamisushi.com",
    description: "Fresh sushi, sashimi, and Japanese-inspired dishes in a modern ambiance. High-quality ingredients and creative rolls make this a standout in the Jacó dining scene.",
    emoji: "🍣",
    highlight: "Fresh daily fish",
  },
  {
    name: "KoKo Gastro Bar",
    cuisine: "Fusion",
    phone: "+506 2102-0411",
    website: "https://koko-gastro-bar.negocio.site",
    description: "A beachfront fusion restaurant perfect for enjoying the stunning Costa Rican sunset with creative cuisine and signature cocktails. The setting alone is worth the visit.",
    emoji: "🌅",
    highlight: "Beachfront views",
  },
];

export default function RestaurantsPage() {
  return (
    <div style={{ paddingTop: "74px", background: "#fff" }}>

      {/* Hero */}
      <section style={{
        background: "radial-gradient(circle at 75% 25%, rgba(255,220,100,.15), transparent 50%), linear-gradient(150deg, #f97316, #c2410c)",
        padding: "72px 28px 64px",
        color: "#fff",
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,.75)" }}>
            Visit Jacó
          </span>
          <h1 style={{ margin: "12px 0 0", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, color: "#fff" }}>
            Top Restaurants
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,.88)", maxWidth: "52ch" }}>
            From fresh ceviche to tandoori and sunset cocktails — Jacó's dining scene is as vibrant as its surf culture.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "64px 28px 100px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px" }}>
          {RESTAURANTS.map((r) => (
            <article
              key={r.name}
              style={{
                background: "#fff",
                border: "1px solid #ece8df",
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Color bar */}
              <div style={{ height: "8px", background: "linear-gradient(90deg, #f97316, #c2410c)" }} />

              <div style={{ padding: "28px 28px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "14px" }}>
                  <span style={{ fontSize: "32px", lineHeight: 1 }}>{r.emoji}</span>
                  <div>
                    <h2 style={{ margin: 0, fontSize: "19px", fontWeight: 800, color: "#16201d", letterSpacing: "-.4px" }}>
                      {r.name}
                    </h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#c2410c", background: "#fff7ed", padding: "3px 10px", borderRadius: "999px", border: "1px solid #fed7aa" }}>
                        {r.cuisine}
                      </span>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#0e7a66", background: "#e7f4f0", padding: "3px 10px", borderRadius: "999px" }}>
                        ✓ {r.highlight}
                      </span>
                    </div>
                  </div>
                </div>

                <p style={{ margin: "0 0 20px", fontSize: "14.5px", lineHeight: 1.7, color: "#5b6660", flex: 1 }}>
                  {r.description}
                </p>

                <div style={{ borderTop: "1px solid #f0ece3", paddingTop: "16px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                  <a
                    href={`tel:${r.phone.replace(/\s/g, "")}`}
                    style={{ fontSize: "13.5px", fontWeight: 700, color: "#16201d", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}
                  >
                    📞 {r.phone}
                  </a>
                  {r.website && (
                    <a
                      href={r.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "13.5px", fontWeight: 700, color: "#0e7a66", textDecoration: "none", marginLeft: "auto" }}
                    >
                      Visit website →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 28px 100px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", background: "linear-gradient(150deg, #3fa896, #0c6f62)", borderRadius: "24px", padding: "52px 48px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px", color: "#fff" }}>
          <div style={{ maxWidth: "48ch" }}>
            <h3 style={{ margin: 0, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-1px" }}>
              Planning a trip to Jacó?
            </h3>
            <p style={{ margin: "12px 0 0", fontSize: "15.5px", lineHeight: 1.65, opacity: .92 }}>
              Ask Dominique for her local favourites — she's been living and surfing in Jacó since 2008.
            </p>
          </div>
          <a href="/contact" style={{ textDecoration: "none", background: "#fff", color: "#0c6f62", fontWeight: 700, fontSize: "15px", padding: "14px 32px", borderRadius: "999px" }}>
            Get in touch
          </a>
        </div>
      </section>

    </div>
  );
}
