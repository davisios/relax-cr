import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Dominique Brousseau | Jaco Beach Real Estate",
};

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-ocean-900 text-white py-14">
        <div className="container-page">
          <span className="text-sand-500 font-sans text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mt-3">
            Let&apos;s Connect
          </h1>
          <p className="text-white/60 mt-3 text-lg max-w-xl">
            Whether you have questions about a listing or want to start your Costa Rica real estate journey — reach out in English, Spanish, or French.
          </p>
        </div>
      </div>

      <div className="container-page py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-3xl font-semibold text-ocean-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-5">
                <a href="tel:+50684365277" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-ocean-100 flex items-center justify-center group-hover:bg-ocean-700 transition-colors">
                    <Phone size={20} className="text-ocean-700 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Phone</p>
                    <p className="font-medium text-ocean-900">+506 8436-5277</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/50684365277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-jungle-100 flex items-center justify-center group-hover:bg-jungle-700 transition-colors">
                    <MessageCircle size={20} className="text-jungle-700 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">WhatsApp</p>
                    <p className="font-medium text-ocean-900">+506 8436-5277</p>
                  </div>
                </a>

                <a href="mailto:dbjacocostarica@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-sand-100 flex items-center justify-center group-hover:bg-sand-500 transition-colors">
                    <Mail size={20} className="text-sand-700 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Email</p>
                    <p className="font-medium text-ocean-900">dbjacocostarica@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <MapPin size={20} className="text-neutral-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Office</p>
                    <p className="font-medium text-ocean-900">RE/MAX Oceanside Realty</p>
                    <p className="text-sm text-neutral-500">Jaco Beach, Garabito, Puntarenas, Costa Rica</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Member note */}
            <div className="p-5 bg-ocean-100 rounded-xl">
              <p className="text-sm text-ocean-700 font-medium">
                Member of RE/MAX Oceanside Realty — Platinum Club 2022–2023, Hall of Fame 2022
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="card p-8">
            <h2 className="font-display text-2xl font-semibold text-ocean-900 mb-6">
              Send a Message
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none transition"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none transition"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none transition"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  I am interested in…
                </label>
                <select className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none appearance-none bg-white">
                  <option>Buying a property</option>
                  <option>Selling my property</option>
                  <option>Property valuation</option>
                  <option>General information</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Tell me about what you're looking for…"
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center py-3.5">
                Send Message
              </button>

              <p className="text-xs text-neutral-400 text-center">
                You&apos;ll hear back within 24 hours · English · Español · Français
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
