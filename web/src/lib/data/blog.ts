import type { BlogPost, BlogPostContent } from "@/lib/types/blog";
import fs from "fs";
import path from "path";

const CONTENT_BLOG_DIR = path.join(process.cwd(), "content", "blog");

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "comprehensive-guide-buying-property-jaco-beach",
    legacySlug: "a-comprehensive-guide-to-buying-property-in-jaco-beach",
    url: "https://relaxcostarica.com/real-estate/a-comprehensive-guide-to-buying-property-in-jaco-beach/",
    title: "A Comprehensive Guide to Buying Property in Jaco Beach",
    metaTitle: "How to Buy Property in Jaco Beach: Step-by-Step Guide",
    metaDescription:
      "Learn the full process of buying property in Jaco Beach, Costa Rica — legal steps, closing costs, financing, and what North American buyers must know.",
    excerpt:
      "Costa Rica real estate is an exciting opportunity for North American buyers seeking a vibrant coastal lifestyle. Know the steps before you invest.",
    takeaways: [
      "Foreigners have the same property ownership rights as Costa Rican citizens for titled land.",
      "Closing costs run about 4% of the declared property value and are usually paid by the buyer.",
      "Hire your own bilingual real estate attorney — only a notary public can record the purchase in the National Registry.",
      "Jaco Beach offers the widest range of price points on the Central Pacific coast, from budget condos to oceanfront penthouses.",
    ],
    date: "July 5, 2024",
    author: "Dominique Brousseau",
    category: "Real Estate",
    image:
      "https://relaxcostarica.com/wp-content/uploads/2024/06/istockphoto-950510542-612x612-1.jpg",
  },
  {
    slug: "expats-moving-costa-rica",
    legacySlug: "expats-moving-to-costa-rica",
    url: "https://relaxcostarica.com/real-estate/expats-moving-to-costa-rica/",
    title: "An Expat's Moving to Costa Rica: Questions Answered by Dominique Brousseau",
    metaTitle: "Moving to Costa Rica as an Expat: Common Questions Answered",
    metaDescription:
      "Residency, healthcare, cost of living, and where to settle — a local Jaco Beach agent answers the questions expats ask most before moving to Costa Rica.",
    excerpt:
      "In the last decades we have seen so many expats moving to Costa Rica. Starting the process can feel overwhelming — here are the most common questions answered.",
    takeaways: [
      "You do not need residency to buy property or live part-time in Costa Rica.",
      "The Central Pacific coast combines beach living with quick access to San Jose's airport and hospitals.",
      "Property taxes are only 0.25% of registered value — far below Canada and the United States.",
      "Working with a trilingual local agent removes most of the friction from the relocation process.",
    ],
    date: "December 28, 2023",
    author: "Dominique Brousseau",
    category: "Real Estate",
    image:
      "https://relaxcostarica.com/wp-content/uploads/2023/12/expats-costa-rica.jpg",
  },
  {
    slug: "gated-communities-jaco",
    legacySlug: "gated-communities-in-jaco",
    url: "https://relaxcostarica.com/real-estate/gated-communities-in-jaco/",
    title: "Finding Your Dream Home in Gated Communities in Jaco with Dominique Brousseau",
    metaTitle: "Gated Communities in Jaco: Privacy, Security & Amenities",
    metaDescription:
      "Compare Jaco's gated communities — security, amenities, HOA fees, and lifestyle — and find out which one fits your budget and goals.",
    excerpt:
      "You've come to the perfect location if you're looking for a house that offers privacy, security, and an exclusive lifestyle in Costa Rica.",
    takeaways: [
      "Gated communities around Jaco offer 24/7 security, pools, and managed common areas.",
      "HOA fees vary widely — always review them alongside the purchase price.",
      "Communities like Punta Leona and Nativa combine resort amenities with strong rental potential.",
    ],
    date: "December 28, 2023",
    author: "Dominique Brousseau",
    category: "Real Estate",
    image:
      "https://relaxcostarica.com/wp-content/uploads/2023/12/gated-communities-jaco.jpg",
  },
  {
    slug: "investing-costa-rican-real-estate",
    legacySlug: "investing-in-costa-rican-real-estate",
    url: "https://relaxcostarica.com/real-estate/investing-in-costa-rican-real-estate-a-smart-move/",
    title: "Investing in Costa Rican Real Estate: A Smart Move",
    metaTitle: "Costa Rica Real Estate Investment: Why It Pays Off",
    metaDescription:
      "Political stability, a growing economy, and strong vacation rental demand make Costa Rica one of Latin America's best real estate investment markets.",
    excerpt:
      "Costa Rica offers political stability, a growing economy, and stunning natural beauty — making it one of the best markets for real estate investment in Latin America.",
    takeaways: [
      "Costa Rica is one of Latin America's most politically stable countries, with strong property rights for foreigners.",
      "Jaco's short-term rental market gives investors some of the best returns on the Central Pacific coast.",
      "Tourism growth keeps pushing demand for vacation rentals and second homes upward.",
    ],
    date: "November 15, 2023",
    author: "Dominique Brousseau",
    category: "Investment",
    image:
      "https://relaxcostarica.com/wp-content/uploads/2023/11/investing-costa-rica.jpg",
  },
  {
    slug: "luxury-beachfront-properties-costa-rica",
    legacySlug: "luxury-beachfront-properties-in-costa-rica",
    url: "https://relaxcostarica.com/real-estate/luxury-beachfront-properties-in-costa-rica/",
    title: "Luxury Beachfront Properties in Costa Rica",
    metaTitle: "Costa Rica Luxury Beachfront Homes & Condos for Sale",
    metaDescription:
      "From Jaco to Hermosa Beach — explore Costa Rica's finest beachfront homes and condos, and what makes each stretch of the Central Pacific coast unique.",
    excerpt:
      "From Jaco to Hermosa Beach, explore the finest beachfront properties Costa Rica has to offer and what makes each location unique.",
    takeaways: [
      "True beachfront inventory on the Central Pacific coast is limited, which protects long-term value.",
      "Properties inside the Maritime Zone are concessions, not titled land — know the difference before you buy.",
      "Hermosa Beach and south Jaco offer the best mix of luxury beachfront and rental income.",
    ],
    date: "October 10, 2023",
    author: "Dominique Brousseau",
    category: "Luxury",
    image:
      "https://relaxcostarica.com/wp-content/uploads/2023/10/luxury-beachfront.jpg",
  },
  {
    slug: "process-canadians-buy-real-estate-costa-rica",
    legacySlug: "the-process-for-canadians-to-buy-real-estate-in-costa-rica",
    url: "https://relaxcostarica.com/real-estate/the-process-for-canadians-to-buy-real-estate-in-costa-rica/",
    title: "The Process for Canadians to Buy Real Estate in Costa Rica",
    metaTitle: "Canadians Buying Property in Costa Rica: The Full Process",
    metaDescription:
      "A Canadian agent in Jaco Beach explains how Canadians buy property in Costa Rica — ownership rights, money transfers, taxes, and the closing process.",
    excerpt:
      "As a Canadian herself, Dominique Brousseau walks you through the step-by-step process of purchasing property in Costa Rica as a foreign national.",
    takeaways: [
      "Canadians can own titled Costa Rican property outright — no residency or citizenship required.",
      "Funds are usually wired through an escrow service registered with SUGEF, Costa Rica's financial regulator.",
      "Budget roughly 4% of the purchase price for closing costs, plus low annual property taxes of 0.25%.",
    ],
    date: "September 5, 2023",
    author: "Dominique Brousseau",
    category: "Real Estate",
    image:
      "https://relaxcostarica.com/wp-content/uploads/2023/09/canadians-costa-rica.jpg",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Match a request against the original (pre-cleanup) slug so old URLs can redirect. */
export function getBlogPostByLegacySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.legacySlug === slug);
}

export function getLatestPosts(count = 3): BlogPost[] {
  return BLOG_POSTS.slice(0, count);
}

function loadBlogContent(slug: string): BlogPostContent | null {
  const contentPath = path.join(CONTENT_BLOG_DIR, `${slug}.json`);
  if (!fs.existsSync(contentPath)) return null;

  try {
    return JSON.parse(fs.readFileSync(contentPath, "utf-8")) as BlogPostContent;
  } catch {
    return null;
  }
}

export function getBlogPostContent(slug: string): BlogPostContent | null {
  return loadBlogContent(slug);
}
