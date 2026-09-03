// Shared between the server page (which resolves each listing's real photo)
// and the client RentalsExplorer (which renders and filters the cards).

export interface RentalImage {
  src: string;
  alt: string;
}

export interface FeaturedRental {
  title: string;
  price: string;
  beds: number;
  baths: number;
  slug: string;
  tags: string[];
  gradient: string;
}

export const FEATURED: FeaturedRental[] = [
  {
    title: "Jacó One-Bedroom Cozy Condo, Walking Distance to the Beach",
    price: "$124,800",
    beds: 1,
    baths: 1,
    slug: "jaco-one-bedroom-cozy-condo-beach-walking-distance",
    tags: ["Walk to Beach", "Air Conditioning", "Furnished"],
    gradient: "linear-gradient(135deg, #8fd6cb, #0c6f62)",
  },
  {
    title: "Jacó Stunning Oceanfront Condo",
    price: "$489,000",
    beds: 2,
    baths: 2,
    slug: "jaco-stunning-oceanfront-condo",
    tags: ["Beachfront", "Ocean View", "Pool"],
    gradient: "linear-gradient(135deg, #ffd7a6, #e76f8e)",
  },
  {
    title: "Nativa Resort Fully Furnished Ocean-View Condo",
    price: "$279,000",
    beds: 2,
    baths: 2,
    slug: "nativa-resort-fully-furnished-ocean-view-two-bedroom-condo",
    tags: ["Gated Community", "Ocean View", "Pool", "Furnished"],
    gradient: "linear-gradient(135deg, #bfe0f2, #3f7fb0)",
  },
  {
    title: "Jacó Beach Cozy Gated One-Bedroom Condo",
    price: "$129,500",
    beds: 1,
    baths: 1,
    slug: "jaco-beach-cozy-gated-one-bedroom-condo",
    tags: ["Gated Community", "24-hour Security", "Walk to Beach"],
    gradient: "linear-gradient(135deg, #bfe39c, #2c7a4f)",
  },
  {
    title: "Nativa Fully Furnished Cozy Two-Bedroom Condo",
    price: "$219,000",
    beds: 2,
    baths: 2,
    slug: "nativa-fully-furnished-cozy-two-bedroom-condo",
    tags: ["Furnished", "Pool", "Gated Community", "Air Conditioning"],
    gradient: "linear-gradient(135deg, #efe2c6, #b1925c)",
  },
  {
    title: "Jacó Villas Paradise — Your Costa Rican Getaway",
    price: "$119,700",
    beds: 2,
    baths: 1,
    slug: "jaco-villas-paradise-your-perfect-costa-rican-getaway",
    tags: ["Pool", "Pet Friendly", "Furnished"],
    gradient: "linear-gradient(135deg, #ffd7a6, #b1925c)",
  },
];
