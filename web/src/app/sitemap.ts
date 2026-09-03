import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllProperties } from "@/lib/data/properties";
import { BLOG_POSTS } from "@/lib/data/blog";
import { NEIGHBORHOODS } from "@/lib/data/neighborhoods";

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/properties", priority: 0.9, changeFrequency: "daily" },
  { path: "/properties/map", priority: 0.7, changeFrequency: "daily" },
  { path: "/neighborhoods", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/property-valuation", priority: 0.6, changeFrequency: "yearly" },
  { path: "/visit-jaco", priority: 0.5, changeFrequency: "monthly" },
  { path: "/visit-jaco/tours", priority: 0.5, changeFrequency: "monthly" },
  { path: "/visit-jaco/restaurants", priority: 0.5, changeFrequency: "monthly" },
  { path: "/visit-jaco/vacation-rentals", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const propertyEntries: MetadataRoute.Sitemap = getAllProperties().map((property) => ({
    url: `${SITE_URL}/properties/${property.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const neighborhoodEntries: MetadataRoute.Sitemap = NEIGHBORHOODS.map((neighborhood) => ({
    url: `${SITE_URL}/neighborhoods/${neighborhood.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...propertyEntries, ...neighborhoodEntries, ...blogEntries];
}
