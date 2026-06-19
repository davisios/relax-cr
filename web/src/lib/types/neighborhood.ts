export interface NeighborhoodStat {
  value: string;
  label: string;
}

export interface NeighborhoodHighlight {
  icon: string;
  text: string;
}

export interface NeighborhoodProperty {
  id: string;
  title: string;
  type: "house" | "condo" | "lot" | "hotel";
  typeLabel: string;
  beds: number;
  baths: number;
  size: number;
  price: number;
  pal: string;
  badge: string | null;
}

export interface Neighborhood {
  slug: string;
  name: string;
  city: string;
  region: string;
  pal: string;
  listingCount: number;
  tagline: string;
  heading: string;
  stats: NeighborhoodStat[];
  paragraphs: string[];
  highlights: NeighborhoodHighlight[];
  properties: NeighborhoodProperty[];
  description?: string;
  image?: string;
}
