import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NEIGHBORHOODS, getNeighborhoodBySlug } from "@/lib/data/neighborhoods";
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
  return <NeighborhoodPage neighborhood={neighborhood} />;
}
