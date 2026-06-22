import Link from "next/link";
import BrandLogo from "@/components/layout/BrandLogo";
import {
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

const FOOTER_LINKS = {
  Buy: [
    { label: "Houses & Villas", href: "/properties?type=house-villa" },
    { label: "Condos & Apartments", href: "/properties?type=condo-apartment" },
    { label: "Vacant Lots & Land", href: "/properties?type=lot-vacant-land" },
    { label: "Multi-Family", href: "/properties?type=multi-family-duplex-triplex" },
    { label: "Vacation Rentals", href: "/vacation-rentals" },
  ],
  Explore: [
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Jaco Beach", href: "/neighborhoods/jaco" },
    { label: "Hermosa Beach", href: "/neighborhoods/hermosa-beach" },
    { label: "Top Restaurants", href: "/restaurants" },
    { label: "Tours & Activities", href: "/tours" },
  ],
  Services: [
    { label: "Property Search", href: "/properties" },
    { label: "Property Valuation", href: "/property-valuation" },
    { label: "Meet Dominique", href: "/agent" },
    { label: "Real Estate FAQs", href: "/faq" },
    { label: "Blog", href: "/blog" },
  ],
  Legal: [
    { label: "Terms of Use", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact", href: "/contact" },
  ],
};

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/dominiquejacocostarica",
    icon: Facebook,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@dominiquebrousseau",
    icon: Youtube,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dominiquejacocostarica",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dominique-brousseau",
    icon: Linkedin,
  },
];

export default function Footer() {
  return (
    <footer className="bg-ocean-900 text-white">
      {/* Main footer */}
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <BrandLogo size={52} variant="light" titleSize={20} subtitleSize={11} />
            </div>

            <p className="font-script text-sand-300 text-2xl mb-4">
              Imagine living your Dream everyday…
            </p>

            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Dominique Brousseau — Jaco Beach Real Estate Agent. RE/MAX
              Oceanside Realty. English · Spanish · French.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:+50684365277"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-sand-500" />
                +506 8436-5277
              </a>
              <a
                href="https://wa.me/50684365277"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} className="text-sand-500" />
                WhatsApp
              </a>
              <a
                href="mailto:dbjacocostarica@gmail.com"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <Mail size={16} className="text-sand-500" />
                dbjacocostarica@gmail.com
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-sand-500 hover:text-white transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-sans font-semibold uppercase tracking-widest text-sand-500 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} Dominique Brousseau — RE/MAX Oceanside
            Realty. All rights reserved.
          </p>
          <p>Jaco Beach, Garabito, Puntarenas, Costa Rica</p>
        </div>
      </div>
    </footer>
  );
}
