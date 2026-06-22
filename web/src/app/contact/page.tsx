"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MessageCircle, Clock, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

const DOMINIQUE_IMAGE =
  "https://relaxcostarica.com/wp-content/uploads/2023/12/dominique-scaled.jpg";

const BIO_PARAGRAPHS = [
  "After traveling to several countries, I arrived in Costa Rica in 2008 and fell in love with its lifestyle. I feel blessed and fortunate to be selling that lifestyle to many others who desire to make their dreams a reality and live in paradise!",
  "Give yourself the chance to receive assistance and direction from a specialist who is knowledgeable about the area and will put your interests first. Over 10 years of experience in real estate combined with a modern and youthful marketing approach is your recipe for success. My business is built on dedication, communication, determination, and trust, while embodying the ability to cater to and adapt to all of my clients needs.",
  "People will usually define me as a positive and motivated person. Staying positive and focusing on helping is my way to go. As a mother of three little monkeys, it will be my pleasure to offer families needed advice (not actual monkeys, right?).",
  "When I am not working, you will probably find me on the beach surfing with my kids and enjoying the best sunsets that Costa Rica has to offer!",
];

const HOURS = [
  { day: "Monday – Friday", time: "9:00 am – 5:00 pm" },
  { day: "Saturday", time: "10:30 am – 4:00 pm" },
  { day: "Sunday", time: "Closed" },
];

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/DominiqueBrousseau.Remax",
    icon: Facebook,
    color: "#1877f2",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dominique.brousseau.remax/",
    icon: Instagram,
    color: "#e1306c",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCegTFCgBZjEeZcEWWscZrIg",
    icon: Youtube,
    color: "#ff0000",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dominique-brousseau-b9a65a82/",
    icon: Linkedin,
    color: "#0077b5",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: "74px", minHeight: "100vh", background: "#fff" }}>

      {/* Hero */}
      <section style={{
        background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,.12), transparent 50%), linear-gradient(150deg, #3fa896, #0c6f62)",
        padding: "72px 28px 64px",
        color: "#fff",
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,.75)" }}>
            Get In Touch
          </span>
          <h1 style={{ margin: "12px 0 0", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, color: "#fff" }}>
            Let&apos;s Connect
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,.88)", maxWidth: "52ch" }}>
            Whether you have questions about a listing or want to start your Costa Rica real estate journey — reach out in English, Spanish or French.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: "64px 28px 100px" }}>
        <div
          style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "64px", alignItems: "start" }}
          className="contact-page-grid"
        >

          {/* Left: Dominique profile + contact info */}
          <div>
            {/* Photo */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                borderRadius: "20px",
                overflow: "hidden",
                marginBottom: "28px",
                background: "#e7f4f0",
              }}
            >
              <Image
                src={DOMINIQUE_IMAGE}
                alt="Dominique Brousseau Jaco Real Estate Agent"
                fill
                sizes="(max-width: 900px) 100vw, 540px"
                style={{ objectFit: "cover", objectPosition: "top center" }}
                unoptimized
              />
            </div>

            <h2 style={{ margin: "0 0 8px", fontSize: "26px", fontWeight: 800, color: "#16201d", letterSpacing: "-.6px", lineHeight: 1.2 }}>
              Dominique Brousseau Jaco Real Estate Agent
            </h2>
            <p style={{ margin: "0 0 20px", fontSize: "15px", color: "#5b6660", lineHeight: 1.6 }}>
              RE/MAX Oceanside Realty, Calle Pastor Diaz entrance to INVU corner building<br />
              Puntarenas Jaco Beach, 61101
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              <a href="tel:+50684365277" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                <Phone size={17} color="#0e7a66" />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#7a857f" }}>Mobile:</span>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#16201d" }}>+506 8436-5277</span>
              </a>
              <a href="https://wa.me/50684365277" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                <MessageCircle size={17} color="#0e7a66" />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#7a857f" }}>WhatsApp:</span>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#16201d" }}>+506 8436-5277</span>
              </a>
              <a href="mailto:dbjacocostarica@gmail.com" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                <Mail size={17} color="#0e7a66" />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#7a857f" }}>Email:</span>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#16201d" }}>dbjacocostarica@gmail.com</span>
              </a>
            </div>

            {/* Bio */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
              {BIO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} style={{ margin: 0, fontSize: "15px", lineHeight: 1.7, color: "#3a443f" }}>
                  {paragraph}
                </p>
              ))}
              <p style={{ margin: 0, fontSize: "17px", fontWeight: 700, fontStyle: "italic", color: "#0e7a66" }}>
                Imagine living your Dream everyday…
              </p>
            </div>

            {/* Hours */}
            <div style={{ marginTop: "36px", background: "#f7f5f0", border: "1px solid #ece8df", borderRadius: "18px", padding: "24px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <Clock size={17} color="#0e7a66" />
                <span style={{ fontWeight: 800, fontSize: "15px", color: "#16201d" }}>Office Hours</span>
              </div>
              {HOURS.map((h) => (
                <div key={h.day} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #ece8df" }}>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#3a443f" }}>{h.day}</span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: h.time === "Closed" ? "#c0392b" : "#0e7a66" }}>{h.time}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ marginTop: "32px" }}>
              <p style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: 700, color: "#7a857f", textTransform: "uppercase", letterSpacing: "1.5px" }}>Follow Dominique</p>
              <div style={{ display: "flex", gap: "12px" }}>
                {SOCIAL.map(({ label, href, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "#f7f5f0",
                      border: "1px solid #ece8df",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      transition: "background .2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = color; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#f7f5f0"; }}
                  >
                    <Icon size={18} color={color} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: "#fff", border: "1px solid #ece8df", borderRadius: "24px", padding: "40px" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "#16201d" }}>Message sent!</h3>
                <p style={{ margin: "10px 0 0", color: "#5b6660", fontSize: "15px" }}>
                  Dominique will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h2 style={{ margin: "0 0 28px", fontSize: "22px", fontWeight: 800, color: "#16201d", letterSpacing: "-.4px" }}>
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    {["First Name", "Last Name"].map((label) => (
                      <div key={label}>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#3a443f", marginBottom: "6px" }}>{label}</label>
                        <input
                          type="text"
                          required
                          style={{ width: "100%", fontFamily: "inherit", fontSize: "14px", border: "1.5px solid #e0dccf", borderRadius: "10px", padding: "11px 14px", outline: "none", boxSizing: "border-box" }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#3a443f", marginBottom: "6px" }}>Email</label>
                    <input type="email" required style={{ width: "100%", fontFamily: "inherit", fontSize: "14px", border: "1.5px solid #e0dccf", borderRadius: "10px", padding: "11px 14px", outline: "none", boxSizing: "border-box" }} />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#3a443f", marginBottom: "6px" }}>Phone / WhatsApp</label>
                    <input type="tel" style={{ width: "100%", fontFamily: "inherit", fontSize: "14px", border: "1.5px solid #e0dccf", borderRadius: "10px", padding: "11px 14px", outline: "none", boxSizing: "border-box" }} placeholder="+1 (555) 000-0000" />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#3a443f", marginBottom: "6px" }}>I am interested in…</label>
                    <select style={{ width: "100%", fontFamily: "inherit", fontSize: "14px", border: "1.5px solid #e0dccf", borderRadius: "10px", padding: "11px 14px", outline: "none", background: "#fff", appearance: "none", boxSizing: "border-box" }}>
                      <option>Buying a property</option>
                      <option>Selling my property</option>
                      <option>Vacation rental</option>
                      <option>Property valuation</option>
                      <option>General information</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#3a443f", marginBottom: "6px" }}>Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me what you're looking for…"
                      style={{ width: "100%", fontFamily: "inherit", fontSize: "14px", border: "1.5px solid #e0dccf", borderRadius: "10px", padding: "11px 14px", outline: "none", resize: "none", boxSizing: "border-box" }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      fontFamily: "inherit",
                      fontWeight: 700,
                      fontSize: "15px",
                      padding: "14px",
                      borderRadius: "999px",
                      border: "none",
                      background: "#0e7a66",
                      color: "#fff",
                      cursor: "pointer",
                      transition: "background .2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#0a5f50")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#0e7a66")}
                  >
                    Send Message
                  </button>

                  <p style={{ textAlign: "center", fontSize: "12.5px", color: "#7a857f", margin: 0 }}>
                    You'll hear back within 24 hours · English · Español · Français
                  </p>
                </form>
              </>
            )}
          </div>

        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .contact-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
