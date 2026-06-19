import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    url: "https://relaxcostarica.com",
    siteName: "Relax Costa Rica",
  },
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
