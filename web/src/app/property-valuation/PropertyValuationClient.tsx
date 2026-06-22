"use client";

import { useState } from "react";
import { BarChart3, MapPin, Shield, Clock, Phone, Mail } from "lucide-react";

const BENEFITS = [
  {
    icon: BarChart3,
    title: "Accurate market analysis",
    text: "Get a realistic estimate based on current listings and recent sales across Jacó, Hermosa, Herradura and the Central Pacific coast.",
  },
  {
    icon: MapPin,
    title: "Local expertise",
    text: "Dominique knows every neighborhood — from beachfront condos to hillside villas — and what buyers are actually paying today.",
  },
  {
    icon: Shield,
    title: "No obligation",
    text: "Your valuation request is completely free. There is no pressure to list — just honest, professional guidance.",
  },
  {
    icon: Clock,
    title: "Fast response",
    text: "Submit the form and hear back within 24 hours in English, Spanish or French.",
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "inherit",
  fontSize: "14px",
  border: "1.5px solid #e0dccf",
  borderRadius: "10px",
  padding: "11px 14px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 700,
  color: "#3a443f",
  marginBottom: "6px",
};

interface Props {
  heroTitle: string;
  formTitle: string;
}

export default function PropertyValuationClient({ heroTitle, formTitle }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: "74px", minHeight: "100vh", background: "#fff" }}>
      <section
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(255,255,255,.12), transparent 50%), linear-gradient(150deg, #3fa896, #0c6f62)",
          padding: "72px 28px 64px",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "13px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "rgba(255,255,255,.75)",
            }}
          >
            Property Valuation
          </span>
          <h1
            style={{
              margin: "12px 0 0",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.05,
              color: "#fff",
            }}
          >
            {heroTitle}
          </h1>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: "18px",
              lineHeight: 1.65,
              color: "rgba(255,255,255,.88)",
              maxWidth: "52ch",
            }}
          >
            Thinking of selling? Request a free property estimation from Dominique Brousseau,
            RE/MAX Oceanside Realty — your trusted Jaco Beach real estate agent.
          </p>
        </div>
      </section>

      <section style={{ padding: "64px 28px 100px" }}>
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: "64px",
            alignItems: "start",
          }}
          className="property-valuation-grid"
        >
          <div>
            <h2
              style={{
                margin: "0 0 32px",
                fontSize: "26px",
                fontWeight: 800,
                color: "#16201d",
                letterSpacing: "-.6px",
              }}
            >
              Why get a valuation?
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <div key={title} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: "#e7f4f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color="#0e7a66" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#16201d" }}>
                      {title}
                    </p>
                    <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: 1.6, color: "#5b6660" }}>
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "36px",
                background: "#f7f5f0",
                border: "1px solid #ece8df",
                borderRadius: "18px",
                padding: "24px 26px",
              }}
            >
              <p style={{ margin: "0 0 16px", fontWeight: 800, fontSize: "15px", color: "#16201d" }}>
                Prefer to talk directly?
              </p>
              <a
                href="tel:+50684365277"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <Phone size={17} color="#0e7a66" />
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#16201d" }}>
                  +506 8436-5277
                </span>
              </a>
              <a
                href="mailto:dbjacocostarica@gmail.com"
                style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Mail size={17} color="#0e7a66" />
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#16201d" }}>
                  dbjacocostarica@gmail.com
                </span>
              </a>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #ece8df",
              borderRadius: "24px",
              padding: "40px",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "#16201d" }}>
                  Request received!
                </h3>
                <p style={{ margin: "10px 0 0", color: "#5b6660", fontSize: "15px" }}>
                  Dominique will review your property details and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h2
                  style={{
                    margin: "0 0 28px",
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#16201d",
                    letterSpacing: "-.4px",
                  }}
                >
                  {formTitle}
                </h2>
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input type="text" name="first_name" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input type="text" name="last_name" style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input type="email" name="email" required style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Mobile *</label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      placeholder="+506 8436-5277"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div>
                      <label style={labelStyle}>Country</label>
                      <input type="text" name="country" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input type="text" name="city" style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Address</label>
                    <input type="text" name="address" style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Message *</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your property — type, size, location, features…"
                      style={{ ...inputStyle, resize: "none" }}
                    />
                  </div>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "13px",
                      color: "#5b6660",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="wpestate_agree_gdpr"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      style={{ marginTop: "2px" }}
                    />
                    I consent to having my information saved
                  </label>

                  <button
                    type="submit"
                    disabled={!consent}
                    style={{
                      width: "100%",
                      fontFamily: "inherit",
                      fontWeight: 700,
                      fontSize: "15px",
                      padding: "14px",
                      borderRadius: "999px",
                      border: "none",
                      background: consent ? "#0e7a66" : "#b8c5c0",
                      color: "#fff",
                      cursor: consent ? "pointer" : "not-allowed",
                      transition: "background .2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (consent) e.currentTarget.style.background = "#0a5f50";
                    }}
                    onMouseLeave={(e) => {
                      if (consent) e.currentTarget.style.background = "#0e7a66";
                    }}
                  >
                    Send Email
                  </button>

                  <p style={{ textAlign: "center", fontSize: "12.5px", color: "#7a857f", margin: 0 }}>
                    Free · No obligation · English · Español · Français
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .property-valuation-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
