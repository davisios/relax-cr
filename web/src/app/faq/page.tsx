import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_ITEMS } from "@/lib/data/faq";
import { getLatestPosts } from "@/lib/data/blog";
import { AGENT_EMAIL, AGENT_PHONE, AGENT_PHONE_LINK } from "@/lib/seo";
import FaqAccordion from "./FaqAccordion";

export const metadata: Metadata = {
  title: "Costa Rica Real Estate FAQ — Buying, Taxes & Closing Costs",
  description:
    "Can foreigners buy property in Costa Rica? What are the closing costs and taxes? Answers to the questions buyers ask most about Jacó Beach real estate.",
  alternates: { canonical: "/faq" },
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  const guides = getLatestPosts(3);

  return (
    <div style={{ paddingTop: "74px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      {/* Hero */}
      <section
        style={{
          padding: "72px 28px 64px",
          background: "linear-gradient(160deg, #f7f5f0 0%, #edf7f5 100%)",
          borderBottom: "1px solid #ece8df",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "13px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#0e7a66",
            }}
          >
            Jacó Real Estate Market
          </span>
          <h1
            style={{
              margin: "12px 0 0",
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-2px",
              fontWeight: 800,
              color: "#16201d",
              lineHeight: 1.05,
            }}
          >
            Your Questions, Answered
          </h1>
          <p
            style={{
              margin: "20px 0 0",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#4a554f",
              maxWidth: "62ch",
            }}
          >
            Navigating a foreign real estate market raises real questions. Dominique has helped hundreds of buyers, investors and vacation-home seekers — here are the answers she gives most often.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section style={{ padding: "56px 28px 0" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Keep learning — internal links */}
      <section style={{ padding: "64px 28px 0" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: "24px",
              fontWeight: 800,
              color: "#16201d",
              letterSpacing: "-.6px",
            }}
          >
            Keep Learning
          </h2>
          <p style={{ margin: "0 0 24px", fontSize: "15.5px", color: "#5b6660", lineHeight: 1.65 }}>
            Go deeper with Dominique&apos;s guides, or start browsing{" "}
            <Link href="/properties" style={{ color: "#0e7a66", fontWeight: 700 }}>
              properties for sale
            </Link>{" "}
            and{" "}
            <Link href="/neighborhoods" style={{ color: "#0e7a66", fontWeight: 700 }}>
              neighborhoods
            </Link>
            .
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "16px" }}>
            {guides.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  border: "1px solid #ece8df",
                  borderRadius: "16px",
                  padding: "20px 22px",
                  background: "#fff",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#0e7a66" }}>
                  {post.category}
                </span>
                <h3 style={{ margin: "8px 0 0", fontSize: "16px", fontWeight: 700, color: "#16201d", lineHeight: 1.35 }}>
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "72px 28px 110px" }}>
        <div
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            borderRadius: "24px",
            padding: "56px 48px",
            background: "radial-gradient(circle at 82% 12%, rgba(255,255,255,.32), transparent 46%), linear-gradient(150deg, #3fa896, #0c6f62)",
            color: "#fff",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "28px",
          }}
        >
          <div style={{ maxWidth: "42ch" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 800,
                letterSpacing: "-1px",
                lineHeight: 1.1,
              }}
            >
              Still have questions?
            </h2>
            <p style={{ margin: "12px 0 0", fontSize: "15.5px", lineHeight: 1.65, opacity: .92 }}>
              I&apos;d be happy to answer anything about Jacó Beach, living in Costa Rica, the real estate market, and beyond.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a
              href={`mailto:${AGENT_EMAIL}`}
              style={{
                textDecoration: "none",
                textAlign: "center",
                background: "#fff",
                color: "#0c6f62",
                fontWeight: 700,
                fontSize: "15px",
                padding: "14px 32px",
                borderRadius: "999px",
              }}
            >
              Email Dominique
            </a>
            <a
              href={`tel:${AGENT_PHONE_LINK}`}
              style={{
                textDecoration: "none",
                textAlign: "center",
                border: "1.5px solid rgba(255,255,255,.6)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
                padding: "14px 32px",
                borderRadius: "999px",
              }}
            >
              {AGENT_PHONE}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
