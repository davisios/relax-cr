export interface PropertiesSourceFile {
  export: {
    sourceFile: string;
    extractedAt: string;
    site: {
      title: string;
      url: string;
      description: string;
      language: string;
      baseSiteUrl: string;
      baseBlogUrl: string;
    };
  };
  stats: {
    totalProperties: number;
    totalAttachments: number;
    publishedProperties: number;
  };
  properties: SourceProperty[];
}

export interface SourceProperty {
  id: number;
  slug: string;
  url: string;
  title: string;
  status: string;
  author: string;
  dates: {
    published: string;
    modified: string;
  };
  content: {
    description: string | null;
    body: string | null;
    excerpt: string | null;
  };
  taxonomy: {
    action: { name: string; slug: string } | null;
    category: { name: string; slug: string } | null;
    city: { name: string; slug: string } | null;
    area: { name: string; slug: string } | null;
    status: { name: string; slug: string } | null;
    features: { name: string; slug: string }[];
  };
  pricing: {
    property_price: number;
  };
  details: {
    property_size: number | null;
    property_lot_size: number | null;
    property_bedrooms: number | null;
    property_bathrooms: number | null;
    property_year: number | null;
    property_garage: string | null;
  };
  flags: {
    prop_featured: number;
  };
  location: {
    property_address: string | null;
    property_latitude: number | null;
    property_longitude: number | null;
  };
  media: {
    featuredImage: { url: string; alt: string | null } | null;
    gallery: { url: string; alt: string | null; title?: string }[];
  };
}
