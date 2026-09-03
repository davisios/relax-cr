import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileStickyCta from "@/components/layout/MobileStickyCta";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { SITE_URL, SITE_NAME, AGENT_NAME, AGENT_PHONE, AGENT_EMAIL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dominique Brousseau | Jaco Beach Real Estate Agent",
    template: "%s | Relax Costa Rica",
  },
  description:
    "Jaco Beach Real Estate Agent — English, Spanish & French. Find your dream property in Costa Rica with Dominique Brousseau, RE/MAX Oceanside Realty.",
  keywords: [
    "Jaco Beach real estate",
    "Costa Rica property",
    "Dominique Brousseau",
    "RE/MAX Jaco",
    "buy property Costa Rica",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const AGENT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: `${AGENT_NAME} — Jaco Beach Real Estate Agent`,
  url: SITE_URL,
  email: AGENT_EMAIL,
  telephone: AGENT_PHONE,
  image: "https://relaxcostarica.com/wp-content/uploads/2023/12/dominique-scaled.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "RE/MAX Oceanside Realty, Calle Pastor Diaz",
    addressLocality: "Jaco",
    addressRegion: "Puntarenas",
    postalCode: "61101",
    addressCountry: "CR",
  },
  areaServed: ["Jaco", "Hermosa Beach", "Herradura", "Punta Leona", "Tarcoles", "Esterillos"],
  knowsLanguage: ["en", "es", "fr"],
  sameAs: [
    "https://www.facebook.com/DominiqueBrousseau.Remax",
    "https://www.instagram.com/dominique.brousseau.remax/",
    "https://www.youtube.com/channel/UCegTFCgBZjEeZcEWWscZrIg",
    "https://www.linkedin.com/in/dominique-brousseau-b9a65a82/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${greatVibes.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(AGENT_JSON_LD) }}
        />
        <GoogleAnalytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileStickyCta />
      </body>
    </html>
  );
}
