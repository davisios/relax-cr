import { SITE_URL, AGENT_NAME, AGENT_EMAIL, AGENT_PHONE } from "@/lib/seo";
import { getAllProperties } from "@/lib/data/properties";
import { BLOG_POSTS } from "@/lib/data/blog";
import { NEIGHBORHOODS } from "@/lib/data/neighborhoods";

export const dynamic = "force-static";

export function GET(): Response {
  const properties = getAllProperties();

  const lines: string[] = [
    "# Relax Costa Rica",
    "",
    `> ${AGENT_NAME} is a trilingual (English, Spanish, French) real estate agent with RE/MAX Oceanside Realty in Jaco Beach, Costa Rica. This site lists properties for sale on the Central Pacific coast (Jaco, Hermosa Beach, Herradura, Punta Leona, Tarcoles, Esterillos), neighborhood guides, and buyer resources for foreigners purchasing real estate in Costa Rica.`,
    "",
    `Contact: ${AGENT_EMAIL} · ${AGENT_PHONE} (phone and WhatsApp)`,
    "",
    "## Main pages",
    "",
    `- [Properties for sale](${SITE_URL}/properties): all active listings with prices, photos, and details`,
    `- [Neighborhoods](${SITE_URL}/neighborhoods): area guides for the Central Pacific coast`,
    `- [FAQ](${SITE_URL}/faq): answers on foreign ownership, titles vs. concessions, taxes, and closing costs`,
    `- [Property valuation](${SITE_URL}/property-valuation): free valuation request for sellers`,
    `- [Contact](${SITE_URL}/contact): reach ${AGENT_NAME} in English, Spanish, or French`,
    "",
    "## Neighborhoods",
    "",
    ...NEIGHBORHOODS.map(
      (n) => `- [${n.name}](${SITE_URL}/neighborhoods/${n.slug}): ${n.tagline}`,
    ),
    "",
    "## Listings",
    "",
    ...properties.map(
      (p) =>
        `- [${p.title}](${SITE_URL}/properties/${p.slug}): ${[p.category, p.city, p.priceLabel].filter(Boolean).join(", ")}`,
    ),
    "",
    "## Blog",
    "",
    ...BLOG_POSTS.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt ?? ""}`),
    "",
    "## Visit Jaco",
    "",
    `- [Tours and activities](${SITE_URL}/visit-jaco/tours)`,
    `- [Restaurants](${SITE_URL}/visit-jaco/restaurants)`,
    `- [Vacation rentals](${SITE_URL}/visit-jaco/vacation-rentals)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
