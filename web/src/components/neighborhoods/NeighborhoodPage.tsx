"use client";

import { useState } from "react";
import Link from "next/link";
import type { Neighborhood, NeighborhoodProperty } from "@/lib/types/neighborhood";

const PALETTES: Record<string, string[]> = {
  ocean: ["#8fd6cb", "#2fa494", "#0c6f62"],
  sunset: ["#ffd7a6", "#ff9b78", "#e76f8e"],
  jungle: ["#bfe39c", "#5fae6e", "#2c7a4f"],
  sand: ["#efe2c6", "#d8bd8e", "#b1925c"],
  sky: ["#bfe0f2", "#7bb6dd", "#3f7fb0"],
};

const TABS = [
  { key: "all", label: "All" },
  { key: "house", label: "Houses" },
  { key: "condo", label: "Condos" },
  { key: "lot", label: "Lots" },
  { key: "hotel", label: "Hotels" },
];

function bgFor(pal: string, idx: number) {
  const c = PALETTES[pal] || PALETTES.ocean;
  const angle = 120 + idx * 48;
  const x = 26 + idx * 18;
  return `radial-gradient(circle at ${x}% 22%, rgba(255,255,255,.42), transparent 46%), linear-gradient(${angle}deg, ${c[0]}, ${c[1]} 55%, ${c[2]})`;
}

function heroBgFor(pal: string) {
  const c = PALETTES[pal] || PALETTES.ocean;
  return `radial-gradient(circle at 72% 16%, rgba(255,255,255,.38), transparent 44%), linear-gradient(155deg, ${c[0]} 0%, ${c[1]} 48%, ${c[2]} 100%)`;
}

function PropertyCard({ prop }: { prop: NeighborhoodProperty }) {
  const [imgIdx, setImgIdx] = useState(0);

  const move = (dir: number) =>
    setImgIdx((i) => ((i + dir + 3) % 3));

  const specs =
    prop.type === "lot"
      ? `${prop.size.toLocaleString()} m² lot`
      : `${prop.beds} Bd · ${prop.baths} Ba${prop.size ? ` · ${prop.size} m²` : ""}`;

  return (
    <article
      style={{
        background: "#fff",
        border: "1px solid #ece8df",
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform .3s ease, box-shadow .3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 44px -22px rgba(20,60,52,.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "none";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div
        style={{
          position: "relative",
          height: "236px",
          background: bgFor(prop.pal, imgIdx),
          transition: "background .45s ease",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            background: "rgba(255,255,255,.94)",
            color: "#0e7a66",
            fontWeight: 700,
            fontSize: "12px",
            letterSpacing: ".4px",
            padding: "6px 12px",
            borderRadius: "999px",
          }}
        >
          {prop.typeLabel}
        </span>
        {prop.badge && (
          <span
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              background: "#ff7a59",
              color: "#fff",
              fontWeight: 800,
              fontSize: "11px",
              letterSpacing: "1px",
              padding: "6px 11px",
              borderRadius: "999px",
            }}
          >
            {prop.badge}
          </span>
        )}
        <button
          onClick={() => move(-1)}
          style={{
            position: "absolute",
            top: "50%",
            left: "12px",
            transform: "translateY(-50%)",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,.9)",
            color: "#16201d",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,.15)",
          }}
        >
          ‹
        </button>
        <button
          onClick={() => move(1)}
          style={{
            position: "absolute",
            top: "50%",
            right: "12px",
            transform: "translateY(-50%)",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,.9)",
            color: "#16201d",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,.15)",
          }}
        >
          ›
        </button>
        <div
          style={{
            position: "absolute",
            bottom: "13px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              onClick={() => setImgIdx(i)}
              style={{
                width: i === imgIdx ? "20px" : "7px",
                height: "7px",
                borderRadius: "999px",
                background: i === imgIdx ? "#fff" : "rgba(255,255,255,.6)",
                transition: "all .3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 20px 22px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#7a857f",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {prop.typeLabel}
        </div>
        <h3
          style={{
            margin: "9px 0 0",
            fontSize: "18.5px",
            lineHeight: 1.3,
            letterSpacing: "-.4px",
            fontWeight: 700,
            color: "#16201d",
          }}
        >
          {prop.title}
        </h3>
        <div style={{ margin: "13px 0 16px", color: "#5b6660", fontSize: "14px", fontWeight: 600 }}>
          {specs}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "16px",
            borderTop: "1px solid #f0ece3",
          }}
        >
          <span style={{ fontSize: "23px", fontWeight: 800, letterSpacing: "-.8px", color: "#0e7a66" }}>
            ${prop.price.toLocaleString()}
          </span>
          <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#16201d", display: "flex", alignItems: "center", gap: "5px" }}>
            View <span style={{ fontSize: "16px" }}>→</span>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function NeighborhoodPage({ neighborhood }: { neighborhood: Neighborhood }) {
  const [filterType, setFilterType] = useState("all");

  const filtered = neighborhood.properties.filter(
    (p) => filterType === "all" || p.type === filterType
  );

  const activeTab = TABS.find((t) => t.key === filterType)!;
  const resultLabel =
    filterType === "all"
      ? `${neighborhood.properties.length} ${neighborhood.properties.length === 1 ? "property" : "properties"} for sale in ${neighborhood.name} right now.`
      : `${filtered.length} of ${neighborhood.properties.length} listings match · ${activeTab.label}.`;

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Hero */}
      <section
        id="top"
        style={{
          position: "relative",
          minHeight: "74vh",
          display: "flex",
          alignItems: "flex-end",
          padding: "120px 28px 56px",
          background: neighborhood.image
            ? `url(${neighborhood.image}) center/cover no-repeat`
            : heroBgFor(neighborhood.pal),
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg,rgba(8,50,45,.18) 0%,transparent 32%,rgba(7,40,36,.66) 100%)",
          }}
        />
        <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", width: "100%", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              color: "rgba(255,255,255,.85)",
              fontSize: "13.5px",
              fontWeight: 600,
              marginBottom: "18px",
            }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,.85)", textDecoration: "none" }}>Home</Link>
            <span style={{ opacity: .6 }}>/</span>
            <Link href="/neighborhoods" style={{ color: "rgba(255,255,255,.85)", textDecoration: "none" }}>Neighborhoods</Link>
            <span style={{ opacity: .6 }}>/</span>
            <span style={{ color: "#fff" }}>{neighborhood.name}</span>
          </div>

          <span
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,.2)",
              border: "1px solid rgba(255,255,255,.38)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "12.5px",
              letterSpacing: ".4px",
              padding: "7px 15px",
              borderRadius: "999px",
              backdropFilter: "blur(4px)",
            }}
          >
            {neighborhood.region}
          </span>

          <h1
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(46px, 8vw, 108px)",
              lineHeight: .95,
              letterSpacing: "-3px",
              fontWeight: 800,
              color: "#fff",
              textShadow: "0 2px 30px rgba(8,50,45,.3)",
            }}
          >
            {neighborhood.name}
          </h1>

          <p
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(16px, 1.6vw, 20px)",
              lineHeight: 1.5,
              color: "rgba(255,255,255,.94)",
              maxWidth: "48ch",
              fontWeight: 500,
            }}
          >
            {neighborhood.tagline}
          </p>

          <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "14px" }}>
            {neighborhood.stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(255,255,255,.14)",
                  border: "1px solid rgba(255,255,255,.28)",
                  backdropFilter: "blur(6px)",
                  borderRadius: "14px",
                  padding: "14px 22px",
                  minWidth: "120px",
                }}
              >
                <div style={{ fontSize: "26px", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: "rgba(255,255,255,.82)", marginTop: "3px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section style={{ padding: "80px 28px 64px", background: "#ffffff" }}>
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "60px",
            alignItems: "start",
          }}
        >
          <div>
            <span style={{ fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, color: "#0e7a66" }}>
              About the area
            </span>
            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "clamp(28px, 3.4vw, 40px)",
                letterSpacing: "-1.4px",
                fontWeight: 800,
                color: "#16201d",
                lineHeight: 1.08,
              }}
            >
              {neighborhood.heading}
            </h2>
            {neighborhood.paragraphs.map((text, i) => (
              <p key={i} style={{ margin: "18px 0 0", fontSize: "16.5px", lineHeight: 1.72, color: "#4a554f" }}>
                {text}
              </p>
            ))}
          </div>

          <aside
            style={{
              background: "#f7f5f0",
              border: "1px solid #ece8df",
              borderRadius: "20px",
              padding: "30px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 800, color: "#16201d", letterSpacing: "-.4px" }}>
              Why buyers love {neighborhood.name}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "20px" }}>
              {neighborhood.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: "26px",
                      height: "26px",
                      borderRadius: "8px",
                      background: "#e7f4f0",
                      color: "#0e7a66",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      marginTop: "1px",
                    }}
                  >
                    {h.icon}
                  </span>
                  <span style={{ fontSize: "15px", lineHeight: 1.5, color: "#3a443f", fontWeight: 500 }}>
                    {h.text}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="#contact"
              style={{
                marginTop: "24px",
                textDecoration: "none",
                display: "block",
                textAlign: "center",
                background: "#0e7a66",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14.5px",
                padding: "13px 20px",
                borderRadius: "999px",
                transition: "background .25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0a5f50")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0e7a66")}
            >
              Ask about {neighborhood.name}
            </a>
          </aside>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" style={{ padding: "40px 28px 96px", background: "#ffffff" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "20px",
              marginBottom: "30px",
              paddingTop: "28px",
              borderTop: "1px solid #f0ece3",
            }}
          >
            <div>
              <span style={{ fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, color: "#0e7a66" }}>
                Properties for sale
              </span>
              <h2
                style={{
                  margin: "10px 0 0",
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  letterSpacing: "-1.4px",
                  fontWeight: 800,
                  color: "#16201d",
                }}
              >
                Homes for sale in {neighborhood.name}
              </h2>
              <p style={{ margin: "9px 0 0", fontSize: "15.5px", color: "#5b6660" }}>{resultLabel}</p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
              {TABS.map((tab) => {
                const active = filterType === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setFilterType(tab.key)}
                    style={{
                      fontFamily: "inherit",
                      fontWeight: 700,
                      fontSize: "14px",
                      padding: "10px 18px",
                      borderRadius: "999px",
                      cursor: "pointer",
                      transition: "all .2s ease",
                      border: `1.5px solid ${active ? "#0e7a66" : "#e0dccf"}`,
                      background: active ? "#0e7a66" : "#fff",
                      color: active ? "#fff" : "#3a443f",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
                gap: "28px",
              }}
            >
              {filtered.map((prop) => (
                <PropertyCard key={prop.id} prop={prop} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "64px 20px", color: "#7a857f" }}>
              <p style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>
                No {activeTab.label.toLowerCase()} listings in {neighborhood.name} right now.
              </p>
              <button
                onClick={() => setFilterType("all")}
                style={{
                  marginTop: "16px",
                  border: "1px solid #0e7a66",
                  background: "#fff",
                  color: "#0e7a66",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "14.5px",
                  padding: "11px 22px",
                  borderRadius: "999px",
                  cursor: "pointer",
                }}
              >
                Show all types
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" style={{ padding: "0 28px 110px", background: "#ffffff" }}>
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            borderRadius: "24px",
            padding: "60px 48px",
            background: "radial-gradient(circle at 82% 12%,rgba(255,255,255,.32),transparent 46%), linear-gradient(150deg,#3fa896,#0c6f62)",
            color: "#fff",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "30px",
          }}
        >
          <div style={{ maxWidth: "54ch" }}>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(26px, 3.2vw, 38px)",
                fontWeight: 800,
                letterSpacing: "-1.2px",
                lineHeight: 1.08,
              }}
            >
              Curious what's available in {neighborhood.name}?
            </h3>
            <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: 1.6, opacity: .92 }}>
              Dominique knows {neighborhood.name} street by street. Tell her what you're looking for and she'll send curated listings that fit — in English, Spanish or French.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a
              href="mailto:dbjacocostarica@gmail.com"
              style={{
                textDecoration: "none",
                textAlign: "center",
                background: "#fff",
                color: "#0c6f62",
                fontWeight: 700,
                fontSize: "15px",
                padding: "15px 34px",
                borderRadius: "999px",
                transition: "transform .2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              Email Dominique
            </a>
            <a
              href="tel:+50684365277"
              style={{
                textDecoration: "none",
                textAlign: "center",
                border: "1.5px solid rgba(255,255,255,.6)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
                padding: "15px 34px",
                borderRadius: "999px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,.6)")}
            >
              +506 8436-5277
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
