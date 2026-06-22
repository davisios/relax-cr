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
    description:
      "A beloved Jacó bistro with a blackboard menu that changes daily based on the freshest local produce. The team embraces sustainable practices and celebrates Costa Rican street culture alongside fine dining — making every visit genuinely different. Expect inventive flavor combinations, natural wines, and an atmosphere that feels equally at home for a romantic dinner or a casual glass after the beach.",
    images: [
      "https://relaxcostarica.com/wp-content/uploads/2022/01/Graffiti-Jaco.jpg",
      "https://relaxcostarica.com/wp-content/uploads/2024/05/DSCF7870.jpg",
    ],
  },
  {
    name: "Lemon Zest",
    cuisine: "Contemporary American",
    phone: "+506 2643-2591",
    website: "https://www.lemonzestjaco.com",
    description:
      "A Jacó institution known for vibrant flavors built on locally sourced ingredients. Chef Keith Reville has been delighting guests with his American-inspired menu since 2008 — the breakfasts are legendary and the lunch menu keeps things fresh with daily specials. The relaxed, open-air setting draws both expats and tourists who quickly make it a repeat stop.",
    images: [
      "https://relaxcostarica.com/wp-content/uploads/2022/01/Lemon-Zest-Jaco.jpg",
      "https://relaxcostarica.com/wp-content/uploads/2024/05/440948209_1365013151059983_6734090680247102845_n-1536x1382.jpg",
    ],
  },
  {
    name: "Hola India",
    cuisine: "Indian",
    phone: "+506 6258-2652",
    website: "https://holaindianrestaurantjaco.com",
    description:
      "Authentic Indian cuisine prepared with imported spices in the heart of Jacó Beach. The menu spans spicy curries, fresh naans from the tandoor, and vegetarian-friendly dishes that satisfy both purists and newcomers to Indian food. An unexpected gem on the Pacific coast — and regularly packed because of it.",
    images: [
      "https://relaxcostarica.com/wp-content/uploads/2022/01/Hola-India-Jaco.jpg",
      "https://relaxcostarica.com/wp-content/uploads/2024/05/indian-catering-jaco.jpeg",
    ],
  },
  {
    name: "Rayana Bar y Restaurante",
    cuisine: "Caribbean Seafood",
    phone: "+506 2201-7299",
    website: "https://www.facebook.com/RayanaCR",
    description:
      "Fresh seafood, tropical fruits, and Caribbean spices served in a relaxed open-air space that captures the laid-back soul of Jacó. Rayana is the kind of spot you stumble on, eat the freshest fish of your trip, and then come back every night. Great cocktails, friendly service, and unbeatable price-to-quality.",
    images: [
      "https://relaxcostarica.com/wp-content/uploads/2022/01/Rayana-Jaco.jpg",
      "https://relaxcostarica.com/wp-content/uploads/2024/05/422906404_903969045064907_8304631220088729744_n.jpg",
    ],
  },
  {
    name: "Tsunami Sushi",
    cuisine: "Japanese",
    phone: "+506 2643-1635",
    website: "https://www.tsunamisushi.com",
    description:
      "High-quality sushi, sashimi, and Japanese-inspired plates in a sleek modern space. The fish is delivered fresh daily and the rolls — some with creative Costa Rican twists — are consistently well executed. A reliable, upscale option when you want something refined without the formality.",
    images: [
      "https://relaxcostarica.com/wp-content/uploads/2024/05/25551913_1390593457718750_3071739498729685756_n.jpg",
      "https://relaxcostarica.com/wp-content/uploads/2024/05/25592094_1390593544385408_9207384800220647542_n.jpg",
    ],
  },
  {
    name: "KoKo Gastro Bar",
    cuisine: "Fusion",
    phone: "+506 2102-0411",
    website: "https://koko-gastro-bar.negocio.site",
    description:
      "A beachfront fusion restaurant with one of the best sunset views in Jacó. The kitchen runs from creative tapas to heartier plates, and the cocktail program is genuinely inventive. Come for the food, stay for the atmosphere — the golden hour here is hard to beat.",
    images: [
      "https://relaxcostarica.com/wp-content/uploads/2024/05/445241923_18127615780345767_1329046612072157366_n-1229x1536.jpg",
      "https://relaxcostarica.com/wp-content/uploads/2024/05/404966871_18108583477345767_161498127276458342_n.jpg",
    ],
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
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,.75)" }}>
            Visit Jacó
          </span>
          <h1 style={{ margin: "12px 0 0", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, color: "#fff" }}>
            Top Restaurants
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,.88)", maxWidth: "52ch" }}>
            From fresh ceviche to tandoori and sunset cocktails — Jacó&apos;s dining scene is as vibrant as its surf culture.
          </p>
        </div>
      </section>

      {/* Restaurant list */}
      <section style={{ padding: "72px 28px 100px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          {RESTAURANTS.map((r, i) => (
            <article
              key={r.name}
              style={{
                paddingTop: i === 0 ? 0 : "64px",
                paddingBottom: "64px",
                borderBottom: i < RESTAURANTS.length - 1 ? "1px solid #ece8df" : "none",
              }}
            >
              {/* Cuisine tag */}
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#c2410c", background: "#fff7ed", padding: "3px 10px", borderRadius: "999px", border: "1px solid #fed7aa" }}>
                {r.cuisine}
              </span>

              {/* Name + contacts */}
              <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px" }}>
                <h2 style={{ margin: 0, fontSize: "clamp(22px, 2.8vw, 30px)", fontWeight: 800, color: "#16201d", letterSpacing: "-.8px" }}>
                  {r.name}
                </h2>
                <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", alignItems: "center" }}>
                  <a href={`tel:${r.phone.replace(/\s/g, "")}`} style={{ fontSize: "13.5px", fontWeight: 600, color: "#7a857f", textDecoration: "none" }}>
                    {r.phone}
                  </a>
                  {r.website && (
                    <a href={r.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", fontWeight: 700, color: "#0e7a66", textDecoration: "none" }}>
                      Visit website →
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p style={{ margin: "18px 0 28px", fontSize: "16.5px", lineHeight: 1.78, color: "#4a554f" }}>
                {r.description}
              </p>

              {/* Images */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                {r.images.map((src, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: "1 1 260px",
                      height: "260px",
                      borderRadius: "14px",
                      backgroundImage: `url(${src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: "#f0ece3",
                    }}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 28px 100px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", background: "linear-gradient(150deg, #3fa896, #0c6f62)", borderRadius: "24px", padding: "52px 48px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px", color: "#fff" }}>
          <div style={{ maxWidth: "48ch" }}>
            <h3 style={{ margin: 0, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-1px" }}>
              Planning a trip to Jacó?
            </h3>
            <p style={{ margin: "12px 0 0", fontSize: "15.5px", lineHeight: 1.65, opacity: .92 }}>
              Ask Dominique for her local favourites — she&apos;s been living and surfing in Jacó since 2008.
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
