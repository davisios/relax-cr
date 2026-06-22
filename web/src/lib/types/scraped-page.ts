export interface ScrapedPageHeading {
  level: number;
  text: string;
}

export interface ScrapedFormField {
  tag: string;
  type: string;
  name: string | null;
  label: string | null;
  placeholder: string | null;
  required: boolean;
}

export interface ScrapedPage {
  url: string;
  canonical: string;
  slug: string;
  type: string;
  title: string;
  description: string | null;
  headings: ScrapedPageHeading[];
  formFields?: ScrapedFormField[];
  scrapedAt: string;
}
