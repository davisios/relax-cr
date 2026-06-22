import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NEIGHBORHOODS, getNeighborhoodBySlug } from "@/lib/data/neighborhoods";
import { getPropertiesForNeighborhood } from "@/lib/data/properties";
import NeighborhoodPage from "@/components/neighborhoods/NeighborhoodPage";

export function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);
  if (!neighborhood) return {};
  return {
    title: `${neighborhood.name} Real Estate`,
    description: neighborhood.tagline,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);
  if (!neighborhood) notFound();

  const properties = getPropertiesForNeighborhood(neighborhood.city);
  const listingCount = properties.length;

  return (
    <NeighborhoodPage
      neighborhood={{
        ...neighborhood,
        listingCount,
        stats: neighborhood.stats.map((stat, index) =>
          index === 0 ? { ...stat, value: String(listingCount) } : stat,
        ),
      }}
      properties={properties}
    />
  );
}
