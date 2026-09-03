import Link from "next/link";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { AGENT_PHONE_LINK } from "@/lib/seo";

export default function MobileStickyCta() {
  return (
    <div
      className="mobile-sticky-cta"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 55,
        gridTemplateColumns: "1fr 1fr 1.4fr",
        gap: "1px",
        background: "#e0dccf",
        borderTop: "1px solid #e0dccf",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <a
        href={`tel:${AGENT_PHONE_LINK}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "7px",
          padding: "13px 8px",
          background: "#fff",
          color: "#16201d",
          fontSize: "13.5px",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        <Phone size={16} color="#0e7a66" />
        Call
      </a>
      <a
        href={`https://wa.me/${AGENT_PHONE_LINK.replace("+", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "7px",
          padding: "13px 8px",
          background: "#fff",
          color: "#16201d",
          fontSize: "13.5px",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        <MessageCircle size={16} color="#25d366" />
        WhatsApp
      </a>
      <Link
        href="/contact"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "7px",
          padding: "13px 8px",
          background: "#0e7a66",
          color: "#fff",
          fontSize: "13.5px",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        <CalendarCheck size={16} />
        Contact Dominique
      </Link>
    </div>
  );
}
