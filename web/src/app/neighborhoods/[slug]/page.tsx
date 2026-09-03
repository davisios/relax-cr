import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { NEIGHBORHOODS, getNeighborhoodBySlug } from "@/lib/data/neighborhoods";
import { getPropertiesForNeighborhood } from "@/lib/data/properties";
import { getLatestPosts } from "@/lib/data/blog";
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
  // Meta title is intentionally different from the on-page H1 (the neighborhood heading).
  const title = `${neighborhood.name} Real Estate — Homes & Condos for Sale`;
  return {
    title,
    description: neighborhood.tagline,
    alternates: { canonical: `/neighborhoods/${slug}` },
    openGraph: {
      title,
      description: neighborhood.tagline,
      url: `/neighborhoods/${slug}`,
      images: neighborhood.image ? [{ url: neighborhood.image }] : undefined,
    },
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

  const otherNeighborhoods = NEIGHBORHOODS.filter((n) => n.slug !== slug).slice(0, 5);
  const guides = getLatestPosts(3);

  return (
    <>
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

      {/* Internal-link cluster: other areas + buyer guides */}
      <section style={{ padding: "0 28px 96px", background: "#fff" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", borderTop: "1px solid #ece8df", paddingTop: "48px" }}>
          <h2 style={{ margin: "0 0 20px", fontSize: "24px", fontWeight: 800, color: "#16201d", letterSpacing: "-.6px" }}>
            Explore More of the Central Pacific
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "32px" }}>
            {otherNeighborhoods.map((n) => (
              <Link
                key={n.slug}
                href={`/neighborhoods/${n.slug}`}
                style={{
                  textDecoration: "none",
                  border: "1px solid #ece8df",
                  borderRadius: "999px",
                  padding: "9px 18px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0e7a66",
                  background: "#fff",
                }}
              >
                {n.name}
              </Link>
            ))}
            <Link
              href="/properties"
              style={{
                textDecoration: "none",
                borderRadius: "999px",
                padding: "9px 18px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#fff",
                background: "#0e7a66",
              }}
            >
              All listings
            </Link>
          </div>

          <h3 style={{ margin: "0 0 14px", fontSize: "17px", fontWeight: 800, color: "#16201d" }}>
            Buyer Guides
          </h3>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
            {guides.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", fontSize: "15px", fontWeight: 600, color: "#0e7a66" }}>
                  {post.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/faq" style={{ textDecoration: "none", fontSize: "15px", fontWeight: 600, color: "#0e7a66" }}>
                Costa Rica real estate FAQ
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
