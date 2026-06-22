import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours & Activities in Jacó",
  description: "ATV rides, sport fishing, zip lines, crocodile tours, horseback riding, rafting and more — the best tours and activities in Jacó Beach, Costa Rica.",
};

const TOURS = [
  {
    name: "ATV Tours",
    emoji: "🏍️",
    tag: "Adventure",
    description: "Explore the rainforest for stunning views, hidden waterfalls, and wildlife in their natural habitat. Multiple vehicle options to accommodate different riding preferences.",
    highlights: ["Rainforest trails", "Hidden waterfalls", "Wildlife viewing", "All skill levels"],
    image: "https://relaxcostarica.com/wp-content/uploads/2022/01/ATV-Rentals-Jaco-Costa-Rica.jpg",
  },
  {
    name: "Sport Fishing",
    emoji: "🎣",
    tag: "Ocean",
    description: "Pursue world-class sport fishing on the Pacific with boat sizes ranging from small center consoles to large offshore yachts. Marlin, sailfish, tuna and more.",
    highlights: ["Pacific offshore fishing", "Multiple boat sizes", "Experienced captains", "Half & full-day trips"],
    image: "https://relaxcostarica.com/wp-content/uploads/2022/01/Sport-Fishing-Jaco-Costa-Rica.jpg",
  },
  {
    name: "Zip Line / Canopy Tour",
    emoji: "🌿",
    tag: "Aerial",
    description: "Descend through the mountainside canopy with sweeping views of the Pacific Ocean. Spot monkeys, toucans and sloths along the platforms while feeling the rush.",
    highlights: ["Ocean views", "Wildlife spotting", "Multiple cables", "Beginner-friendly"],
    image: "https://relaxcostarica.com/wp-content/uploads/2022/01/Zip-LineCanopy-Tour-in-Uvita-Costa-Rica.jpg",
  },
  {
    name: "Crocodile Tour",
    emoji: "🐊",
    tag: "Wildlife",
    description: "Take a boat along the famous Tárcoles River to observe wild crocodiles up close in their natural environment. Educational guides share local history and ecology.",
    highlights: ["Tárcoles River", "Wild crocodiles", "Educational guide", "Photography friendly"],
    image: "https://relaxcostarica.com/wp-content/uploads/2022/01/Crocodile-Tour-Jaco-Costa-Rica.jpg",
  },
  {
    name: "Horseback Riding",
    emoji: "🐴",
    tag: "Nature",
    description: "Leisurely trail rides through jungle and beach paths, including natural pools for a quick dip. Family-friendly and suitable for all experience levels.",
    highlights: ["Beach & jungle trails", "Natural pools", "Family-friendly", "All experience levels"],
    image: "https://relaxcostarica.com/wp-content/uploads/2022/01/Horseback-Tour-Jaco.jpg",
  },
  {
    name: "White Water Rafting",
    emoji: "🚣",
    tag: "Adrenaline",
    description: "Navigate thrilling river rapids for an adrenaline rush you won't forget. Half-day and full-day options available — full-day trips head south to world-class Class IV rapids.",
    highlights: ["Class III & IV rapids", "Half & full-day", "Certified guides", "All gear included"],
    image: "https://relaxcostarica.com/wp-content/uploads/2022/01/Rafting-Tour-Jaco-Costa-Rica.jpg",
  },
  {
    name: "Tortuga Island Tour",
    emoji: "🏝️",
    tag: "Island",
    description: "Full-day island excursion including fresh food, beverages, snorkeling, tube rides, a nature hike, margaritas and rum punch. One of the most popular day trips from Jacó.",
    highlights: ["Full-day trip", "Snorkeling included", "Food & drinks", "Nature hike"],
    image: "https://relaxcostarica.com/wp-content/uploads/2022/01/Tortuga-Island-Tour-Jaco-Costa-Rica.jpg",
  },
  {
    name: "Surf Lessons",
    emoji: "🏄",
    tag: "Water",
    description: "Professional instruction for all skill levels — from first-timers to intermediate surfers looking to improve technique. Scheduled daily based on the best tides.",
    highlights: ["All skill levels", "Daily scheduling", "Board & rash guard", "Certified instructors"],
    image: "https://relaxcostarica.com/wp-content/uploads/2022/01/Surf-Lessons-Jaco-Costa-Rica.jpg",
  },
];

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Adventure: { bg: "#fef3c7", color: "#92400e" },
  Ocean: { bg: "#e0f2fe", color: "#0369a1" },
  Aerial: { bg: "#f0fdf4", color: "#166534" },
  Wildlife: { bg: "#fef9c3", color: "#713f12" },
  Nature: { bg: "#ecfdf5", color: "#065f46" },
  Adrenaline: { bg: "#fff1f2", color: "#be123c" },
  Island: { bg: "#eff6ff", color: "#1d4ed8" },
  Water: { bg: "#e0f2fe", color: "#0c4a6e" },
};

export default function ToursPage() {
  return (
    <div style={{ paddingTop: "74px", background: "#fff" }}>

      {/* Hero */}
      <section style={{
        background: "radial-gradient(circle at 70% 30%, rgba(100,200,255,.12), transparent 50%), linear-gradient(150deg, #0ea5e9, #0369a1)",
        padding: "72px 28px 64px",
        color: "#fff",
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,.75)" }}>
            Visit Jacó
          </span>
          <h1 style={{ margin: "12px 0 0", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, color: "#fff" }}>
            Tours & Activities
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,.88)", maxWidth: "52ch" }}>
            Crocodiles, surfboards, zip lines and island boats — adventure is always around the corner in Jacó.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "64px 28px 100px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px" }}>
          {TOURS.map((t) => {
            const tagStyle = TAG_COLORS[t.tag] || { bg: "#f0ece3", color: "#3a443f" };
            return (
              <article
                key={t.name}
                style={{ background: "#fff", border: "1px solid #ece8df", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column" }}
              >
                {/* Image */}
                <div style={{ height: "200px", backgroundImage: `url(${t.image})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.4), transparent 60%)" }} />
                  <span style={{ position: "absolute", top: "14px", left: "14px", background: "rgba(255,255,255,.9)", color: tagStyle.color, fontWeight: 700, fontSize: "12px", padding: "5px 12px", borderRadius: "999px" }}>
                    {t.tag}
                  </span>
                  <span style={{ position: "absolute", bottom: "14px", left: "14px", fontSize: "28px" }}>{t.emoji}</span>
                </div>

                <div style={{ padding: "22px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h2 style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: 800, color: "#16201d", letterSpacing: "-.4px" }}>
                    {t.name}
                  </h2>
                  <p style={{ margin: "0 0 18px", fontSize: "14.5px", lineHeight: 1.7, color: "#5b6660", flex: 1 }}>
                    {t.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "18px" }}>
                    {t.highlights.map((h) => (
                      <span key={h} style={{ fontSize: "12px", fontWeight: 600, color: "#3a443f", background: "#f7f5f0", padding: "4px 10px", borderRadius: "999px", border: "1px solid #ece8df" }}>
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                  <a
                    href="/contact"
                    style={{ textDecoration: "none", textAlign: "center", background: "#0e7a66", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "12px", borderRadius: "999px" }}
                  >
                    Book with Dominique
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 28px 100px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", background: "linear-gradient(150deg, #3fa896, #0c6f62)", borderRadius: "24px", padding: "52px 48px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px", color: "#fff" }}>
          <div style={{ maxWidth: "48ch" }}>
            <h3 style={{ margin: 0, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-1px" }}>
              Ready for an adventure?
            </h3>
            <p style={{ margin: "12px 0 0", fontSize: "15.5px", lineHeight: 1.65, opacity: .92 }}>
              Dominique can connect you with the best operators in Jacó — just ask.
            </p>
          </div>
          <a href="https://wa.me/50684365277" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", background: "#fff", color: "#0c6f62", fontWeight: 700, fontSize: "15px", padding: "14px 32px", borderRadius: "999px" }}>
            WhatsApp Dominique
          </a>
        </div>
      </section>

    </div>
  );
}
