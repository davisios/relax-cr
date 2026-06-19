import Image from "next/image";
import Link from "next/link";
import { Facebook, Youtube, Instagram, Linkedin, MessageCircle } from "lucide-react";

const SOCIAL = [
  { href: "https://www.facebook.com/dominiquejacocostarica", icon: Facebook, label: "Facebook" },
  { href: "https://www.youtube.com/@dominiquebrousseau", icon: Youtube, label: "YouTube" },
  { href: "https://www.instagram.com/dominiquejacocostarica", icon: Instagram, label: "Instagram" },
  { href: "https://wa.me/50684365277", icon: MessageCircle, label: "WhatsApp" },
  { href: "https://www.linkedin.com/in/dominique-brousseau", icon: Linkedin, label: "LinkedIn" },
];

export default function MeetDominique() {
  return (
    <section id="meet-dominique" className="section-padding bg-cream">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-hero">
              <Image
                src="/images/dominique.jpg"
                alt="Dominique Brousseau Jaco Real Estate Agent"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-5 -right-5 lg:-right-8 bg-ocean-700 text-white rounded-xl p-5 shadow-lg">
              <p className="font-display text-3xl font-bold">10+</p>
              <p className="text-sm text-white/80 font-sans mt-1">
                Years of Experience
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-jungle-700 font-sans text-sm font-semibold uppercase tracking-widest">
              Meet Your Agent
            </span>
            <h2 className="section-title mt-3">Meet Dominique</h2>

            <p className="font-script text-ocean-700 text-2xl mt-4">
              Imagine living your Dream everyday…
            </p>

            <div className="mt-6 space-y-4 text-neutral-600 leading-relaxed">
              <p>
                After traveling to several countries, I arrived in Costa Rica in{" "}
                <strong className="text-neutral-800">2008</strong> and fell in love
                with its lifestyle. I feel blessed and fortunate to be selling that
                lifestyle to many others who desire to make their dreams a reality and
                live in paradise!
              </p>
              <p>
                People will usually describe me as a positive and motivated person.
                Not only am I a Jaco Beach real estate agent, but I am also the mother
                of three little monkeys — so it is my pleasure to offer families the
                needed advice.
              </p>
              <p>
                When I am not working, you will probably find me on the beach surfing
                with my kids and enjoying the best sunsets that Costa Rica has to offer!
              </p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6 mb-8">
              {SOCIAL.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-full bg-neutral-100 text-neutral-500 hover:bg-ocean-700 hover:text-white transition-all"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>

            <Link href="/agent" className="btn-primary">
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
