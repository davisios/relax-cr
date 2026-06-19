import { Trophy, Star, Award, Users } from "lucide-react";

const AWARDS = [
  { icon: Trophy, title: "Platinum Club", subtitle: "2022 – 2023" },
  { icon: Star, title: "100% Club", subtitle: "2017 – 2021" },
  { icon: Award, title: "President's Club", subtitle: "2015 – 2016" },
  { icon: Users, title: "Hall of Fame", subtitle: "2022" },
];

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "3", label: "Languages" },
  { value: "283+", label: "Listings" },
  { value: "100%", label: "Dedicated" },
];

export default function WhyChooseMe() {
  return (
    <section className="section-padding bg-sand-100 overflow-hidden">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sand-700 font-sans text-sm font-semibold uppercase tracking-widest">
            Your Trusted Expert
          </span>
          <h2 className="section-title mt-3">Why Choose Me</h2>
          <p className="section-subtitle mx-auto">
            Benefit from the expertise of a specialist who knows the area intimately
            and prioritizes your interests.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-5xl font-bold text-ocean-900">{value}</p>
              <p className="font-sans text-sm text-neutral-500 mt-2">{label}</p>
            </div>
          ))}
        </div>

        {/* Awards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {AWARDS.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-card"
            >
              <div className="w-12 h-12 rounded-full bg-sand-300 flex items-center justify-center mb-4">
                <Icon size={22} className="text-sand-700" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ocean-900">
                {title}
              </h3>
              <p className="font-sans text-sm text-neutral-500 mt-1">{subtitle}</p>
            </div>
          ))}
        </div>

        {/* RE/MAX note */}
        <p className="text-center text-sm text-neutral-400 mt-8">
          10 Year RE/MAX Anniversary — 2024 · Hall of Fame: Top producers with $1M+ in gross commissions
        </p>
      </div>
    </section>
  );
}
