import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, MapPin, Phone, MessageCircle, ArrowLeft, Check, Car, Calendar } from "lucide-react";
import { getAllProperties, getPropertyBySlug } from "@/lib/data/properties";
import { formatPrice, formatArea } from "@/lib/utils/format";
import StatusBadge from "@/components/ui/StatusBadge";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyMap from "@/components/property/PropertyMap";
import PropertyDescription from "@/components/property/PropertyDescription";
import PropertyGallery from "@/components/property/PropertyGallery";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug);
  if (!property) return { title: "Property Not Found" };
  return {
    title: property.title,
    description: property.description,
  };
}

export async function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export default function PropertyDetailPage({ params }: Props) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const similar = getAllProperties()
    .filter((p) => p.slug !== property.slug && p.categorySlug === property.categorySlug)
    .slice(0, 3);

  return (
    <div className="pt-20 min-h-screen">
      {/* Back */}
      <div className="container-page pt-6">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-ocean-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Listings
        </Link>
      </div>

      {/* Image gallery */}
      <div className="container-page mt-4">
        <PropertyGallery images={property.images} title={property.title} />
      </div>

      {/* Content */}
      <div className="container-page py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title block */}
            <div>
              <div className="flex items-start gap-3 flex-wrap mb-2">
                <StatusBadge status={property.status} />
                <span className="badge bg-neutral-100 text-neutral-600">
                  {property.category}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-ocean-900 leading-tight">
                {property.title}
              </h1>
              {property.city && (
                <div className="flex items-center gap-1.5 mt-3 text-neutral-500">
                  <MapPin size={15} />
                  <span className="text-sm">{property.city}, Costa Rica</span>
                </div>
              )}
            </div>

            {/* Specs */}
            {(property.bedrooms || property.bathrooms || property.sizeM2) && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.bedrooms && (
                  <div className="flex flex-col items-center p-4 bg-ocean-100 rounded-xl">
                    <Bed size={20} className="text-ocean-700 mb-2" />
                    <p className="font-display text-2xl font-bold text-ocean-900">{property.bedrooms}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex flex-col items-center p-4 bg-ocean-100 rounded-xl">
                    <Bath size={20} className="text-ocean-700 mb-2" />
                    <p className="font-display text-2xl font-bold text-ocean-900">{property.bathrooms}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">Bathrooms</p>
                  </div>
                )}
                {property.sizeM2 && (
                  <div className="flex flex-col items-center p-4 bg-ocean-100 rounded-xl">
                    <Maximize2 size={20} className="text-ocean-700 mb-2" />
                    <p className="font-display text-2xl font-bold text-ocean-900">{formatArea(property.sizeM2)}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">Built size</p>
                  </div>
                )}
                {property.lotSizeM2 && (
                  <div className="flex flex-col items-center p-4 bg-ocean-100 rounded-xl">
                    <Maximize2 size={20} className="text-ocean-700 mb-2" />
                    <p className="font-display text-2xl font-bold text-ocean-900">{formatArea(property.lotSizeM2)}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">Lot size</p>
                  </div>
                )}
              </div>
            )}

            {/* Additional details */}
            {(property.garages || property.yearBuilt || property.area) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {property.area && (
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                    <MapPin size={16} className="text-ocean-700 shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-400">Area</p>
                      <p className="text-sm font-semibold text-neutral-700">{property.area}</p>
                    </div>
                  </div>
                )}
                {property.garages && (
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                    <Car size={16} className="text-ocean-700 shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-400">Parking</p>
                      <p className="text-sm font-semibold text-neutral-700">{property.garages}</p>
                    </div>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                    <Calendar size={16} className="text-ocean-700 shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-400">Year Built</p>
                      <p className="text-sm font-semibold text-neutral-700">{property.yearBuilt}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-ocean-900 mb-4">Description</h2>
                <PropertyDescription text={property.description} />
              </div>
            )}

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-ocean-900 mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-neutral-700">
                      <Check size={14} className="text-jungle-700 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <PropertyMap property={property} />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Price card */}
            <div className="card p-6 sticky top-24">
              <p className="font-display text-4xl font-bold text-ocean-900">
                {formatPrice(property.price)}
              </p>
              <p className="text-sm text-neutral-400 mt-1">Asking price · For Sale</p>

              <div className="mt-6 space-y-3">
                <a
                  href="https://wa.me/50684365277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-sm"
                >
                  <MessageCircle size={16} />
                  WhatsApp Dominique
                </a>
                <a
                  href="tel:+50684365277"
                  className="btn-secondary w-full justify-center text-sm"
                >
                  <Phone size={16} />
                  +506 8436-5277
                </a>
                <Link href="/contact" className="btn-ghost w-full justify-center text-sm">
                  Send a Message
                </Link>
              </div>

              {/* Agent mini bio */}
              <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-ocean-100 overflow-hidden flex-shrink-0">
                  <Image
                    src="https://relaxcostarica.com/wp-content/uploads/2021/09/cropped-DB-Real-Estate-200.png"
                    alt="Dominique Brousseau"
                    width={48}
                    height={48}
                    className="object-cover bg-white"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-ocean-900">Dominique Brousseau</p>
                  <p className="text-xs text-neutral-400">RE/MAX Oceanside Realty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar listings */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-3xl font-semibold text-ocean-900 mb-8">
              Similar Listings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
