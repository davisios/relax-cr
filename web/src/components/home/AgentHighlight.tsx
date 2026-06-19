import Link from "next/link";
import { Home, BarChart2, MessageCircle } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Home,
    label: "Home Search",
    desc: "Browse all available listings in Jaco Beach",
    href: "/properties",
  },
  {
    icon: BarChart2,
    label: "Property Valuation",
    desc: "Get a free estimate of your property's value",
    href: "/property-valuation",
  },
  {
    icon: MessageCircle,
    label: "Let's Connect",
    desc: "Reach out in English, Spanish, or French",
    href: "/contact",
  },
];

export default function AgentHighlight() {
  return (
    <section className="section-padding bg-ocean-900 text-white">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-sand-500 font-sans text-sm font-semibold uppercase tracking-widest">
              Pura Vida Lifestyle
            </span>
            <h2 className="section-title text-white mt-3">
              Live your dream everyday
            </h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">
              Dominique Brousseau stands out to clients, developers, and industry
              professionals alike for her exceptional talents, innovative spirit, and
              unwavering dedication to helping clients achieve their Costa Rica dream.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              Fluent in <strong className="text-white">English, Spanish, and French</strong>,
              Dominique effectively bridges cultural gaps, ensuring a seamless experience
              for her diverse clientele. With over{" "}
              <strong className="text-white">10 years of experience</strong> and backed by
              her extensive network, she consistently exceeds expectations in the vibrant
              Jaco Beach real estate market.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, label, desc, href }) => (
              <Link
                key={label}
                href={href}
                className="group p-5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-sand-500/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-sand-500/20 flex items-center justify-center mb-4 group-hover:bg-sand-500/40 transition-colors">
                  <Icon size={20} className="text-sand-300" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-1">
                  {label}
                </h3>
                <p className="text-sm text-white/60 leading-snug">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
