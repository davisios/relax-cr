export interface BlogPost {
  slug: string;
  /** Original slug from the WordPress export, kept so legacy URLs can redirect. */
  legacySlug?: string;
  url: string;
  title: string;
  /** SEO title, intentionally different from the on-page H1 (the post title). */
  metaTitle?: string;
  /** SEO description, intentionally different from the listing excerpt. */
  metaDescription?: string;
  description?: string;
  excerpt?: string;
  /** Short "key takeaways" bullets rendered at the top of the article. */
  takeaways?: string[];
  date?: string;
  author?: string;
  category?: string;
  image?: string;
  content?: string;
}

export type BlogSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

export interface BlogPostContent {
  slug: string;
  sections: BlogSection[];
}
