"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    id: 1,
    question: "Can foreigners buy property in Costa Rica?",
    answer: "Contrary to common misconceptions, foreigners — whether residents or non-residents — enjoy the same rights as citizens when it comes to owning Costa Rica real estate. Yes, you can legally own your piece of paradise!",
  },
  {
    id: 2,
    question: "What's the difference between a TITLED property and a CONCESSION?",
    answer: "Most properties in Costa Rica are titled, ensuring secure ownership. However, understanding the distinction between titled and concession properties is crucial. The Maritime Zone (ZMT), located within 50 meters of the high tide line, falls under concessions. While non-citizens can own up to 49% of a concession, the majority is public and protected.",
  },
  {
    id: 3,
    question: "Is there a National Register of all properties in Costa Rica?",
    answer: "To maintain transparency, all titled, IDA, and concession properties are registered in the National Registry. Having a bilingual real estate attorney/notary is paramount, as only they can record a purchase in the National Registry through a protocolized deed.",
  },
  {
    id: 4,
    question: "Should I hire a real estate attorney/notary?",
    answer: "Citizens, residents, and non-residents alike should hire an attorney for their real estate purchases. I recommend you hire your own bilingual real estate attorney/notary public — someone who specializes in real estate, so you are well represented. Only a notary public can record a purchase in the National Registry. I can personally refer you to trustworthy, professional attorneys. Don't hesitate to ask me.",
  },
  {
    id: 5,
    question: "Are home inspections common?",
    answer: "While home inspections aren't common in Costa Rica, they are highly recommended. A trustworthy home inspector or contractor can evaluate your potential purchase thoroughly. You can also buy homeowners' insurance at reasonable rates, with options like earthquake or theft coverage.",
  },
  {
    id: 6,
    question: "How much are municipal taxes in Costa Rica?",
    answer: "Costa Rica collects property taxes, though they are very low compared to Canada and the United States. Properties are taxed at 0.25% of the registered value at the municipality.",
  },
  {
    id: 7,
    question: "Does Costa Rica have a central multiple listing service (MLS)?",
    answer: "There is no central MLS in Costa Rica. The most complete website to search in the area is RE/MAX. Point2Homes.com also offers listings from different agents and agencies, but it's often not up-to-date — you may find properties listed for sale that have actually been sold for months or even years.",
  },
  {
    id: 8,
    question: "How much are the closing costs?",
    answer: "Typically, the buyer is responsible for closing costs, calculated as a percentage of the property's value. Registration fees, notary and attorney fees, documentary stamps, and transfer taxes will typically total around 4% of the property's declared value. Buyer and seller can sometimes agree to split that cost.",
  },
  {
    id: 9,
    question: "How much is the agent commission, and who pays it?",
    answer: "In and around the Jacó Beach area, the real estate commission is 6% + tax of the purchase price. The seller is legally responsible for paying the entire real estate commission, unless the buyer agrees to split that cost.",
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid #f0ece3",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "24px",
          padding: "28px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "inherit",
        }}
      >
        <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
          <span
            style={{
              flexShrink: 0,
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: open ? "#0e7a66" : "#f0ece3",
              color: open ? "#fff" : "#7a857f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 800,
              transition: "all .2s ease",
              marginTop: "2px",
            }}
          >
            {String(index).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#16201d",
              lineHeight: 1.3,
              letterSpacing: "-.3px",
            }}
          >
            {question}
          </span>
        </div>
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "1.5px solid #e0dccf",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#5b6660",
            fontSize: "18px",
            fontWeight: 400,
            marginTop: "2px",
            transition: "transform .25s ease",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? "600px" : "0",
          transition: "max-height .35s ease",
        }}
      >
        <p
          style={{
            margin: "0 0 28px 46px",
            fontSize: "16px",
            lineHeight: 1.75,
            color: "#4a554f",
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ paddingTop: "74px" }}>
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
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              index={i + 1}
            />
          ))}
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
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 800,
                letterSpacing: "-1px",
                lineHeight: 1.1,
              }}
            >
              Still have questions?
            </h3>
            <p style={{ margin: "12px 0 0", fontSize: "15.5px", lineHeight: 1.65, opacity: .92 }}>
              I'd be happy to answer anything about Jacó Beach, living in Costa Rica, the real estate market, and beyond.
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
                padding: "14px 32px",
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
                padding: "14px 32px",
                borderRadius: "999px",
                transition: "border-color .2s ease",
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
