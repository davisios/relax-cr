import type { BlogPost } from "@/lib/types/blog";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "a-comprehensive-guide-to-buying-property-in-jaco-beach",
    url: "https://relaxcostarica.com/real-estate/a-comprehensive-guide-to-buying-property-in-jaco-beach/",
    title: "A Comprehensive Guide to Buying Property in Jaco Beach",
    excerpt:
      "Costa Rica real estate is an exciting opportunity for North American buyers seeking a vibrant coastal lifestyle. Know the steps before you invest.",
    date: "July 5, 2024",
    author: "Dominique Brousseau",
    category: "Real Estate",
    image:
      "https://relaxcostarica.com/wp-content/uploads/2024/07/buying-property-jaco-beach.jpg",
  },
  {
    slug: "expats-moving-to-costa-rica",
    url: "https://relaxcostarica.com/real-estate/expats-moving-to-costa-rica/",
    title: "An Expat's Moving to Costa Rica: Questions Answered by Dominique Brousseau",
    excerpt:
      "In the last decades we have seen so many expats moving to Costa Rica. Starting the process can feel overwhelming — here are the most common questions answered.",
    date: "December 28, 2023",
    author: "Dominique Brousseau",
    category: "Real Estate",
    image:
      "https://relaxcostarica.com/wp-content/uploads/2023/12/expats-costa-rica.jpg",
  },
  {
    slug: "gated-communities-in-jaco",
    url: "https://relaxcostarica.com/real-estate/gated-communities-in-jaco/",
    title: "Finding Your Dream Home in Gated Communities in Jaco with Dominique Brousseau",
    excerpt:
      "You've come to the perfect location if you're looking for a house that offers privacy, security, and an exclusive lifestyle in Costa Rica.",
    date: "December 28, 2023",
    author: "Dominique Brousseau",
    category: "Real Estate",
    image:
      "https://relaxcostarica.com/wp-content/uploads/2023/12/gated-communities-jaco.jpg",
  },
  {
    slug: "investing-in-costa-rican-real-estate",
    url: "https://relaxcostarica.com/real-estate/investing-in-costa-rican-real-estate-a-smart-move/",
    title: "Investing in Costa Rican Real Estate: A Smart Move",
    excerpt:
      "Costa Rica offers political stability, a growing economy, and stunning natural beauty — making it one of the best markets for real estate investment in Latin America.",
    date: "November 15, 2023",
    author: "Dominique Brousseau",
    category: "Investment",
    image:
      "https://relaxcostarica.com/wp-content/uploads/2023/11/investing-costa-rica.jpg",
  },
  {
    slug: "luxury-beachfront-properties-in-costa-rica",
    url: "https://relaxcostarica.com/real-estate/luxury-beachfront-properties-in-costa-rica/",
    title: "Luxury Beachfront Properties in Costa Rica",
    excerpt:
      "From Jaco to Hermosa Beach, explore the finest beachfront properties Costa Rica has to offer and what makes each location unique.",
    date: "October 10, 2023",
    author: "Dominique Brousseau",
    category: "Luxury",
    image:
      "https://relaxcostarica.com/wp-content/uploads/2023/10/luxury-beachfront.jpg",
  },
  {
    slug: "the-process-for-canadians-to-buy-real-estate-in-costa-rica",
    url: "https://relaxcostarica.com/real-estate/the-process-for-canadians-to-buy-real-estate-in-costa-rica/",
    title: "The Process for Canadians to Buy Real Estate in Costa Rica",
    excerpt:
      "As a Canadian herself, Dominique Brousseau walks you through the step-by-step process of purchasing property in Costa Rica as a foreign national.",
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

export function getLatestPosts(count = 3): BlogPost[] {
  return BLOG_POSTS.slice(0, count);
}
