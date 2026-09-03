"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/data/faq";

function FaqRow({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid #f0ece3",
      }}
    >
      <h2 style={{ margin: 0 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
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
      </h2>

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

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <>
      {items.map((item, i) => (
        <FaqRow key={item.id} question={item.question} answer={item.answer} index={i + 1} />
      ))}
    </>
  );
}
