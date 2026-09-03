import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Dominique Brousseau — Jaco Beach RE/MAX Agent",
  description:
    "Reach Dominique Brousseau by phone, WhatsApp, or email in English, Spanish, or French. Office at RE/MAX Oceanside Realty, Jaco Beach, Costa Rica.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
