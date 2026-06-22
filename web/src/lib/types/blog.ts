export interface BlogPost {
  slug: string;
  url: string;
  title: string;
  description?: string;
  excerpt?: string;
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
