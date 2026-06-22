import fs from "fs";
import path from "path";
import type { ScrapedPage } from "@/lib/types/scraped-page";

const SCRAPER_PAGES_DIR = path.join(
  process.cwd(),
  "..",
  "relaxcostarica-scraper",
  "output",
  "pages",
);

const CONTENT_PAGES_DIR = path.join(process.cwd(), "content", "pages");

function loadPage(slug: string): ScrapedPage | null {
  const scraperPath = path.join(SCRAPER_PAGES_DIR, `page__${slug}.json`);
  const contentPath = path.join(CONTENT_PAGES_DIR, `${slug}.json`);
  const filePath = fs.existsSync(scraperPath)
    ? scraperPath
    : fs.existsSync(contentPath)
      ? contentPath
      : null;

  if (!filePath) return null;

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as ScrapedPage;
  } catch {
    return null;
  }
}

export function getPropertyValuationPage(): ScrapedPage {
  const page = loadPage("property-valuation");
  if (!page) {
    throw new Error("Property valuation page content not found");
  }
  return page;
}

export function getPageHeading(page: ScrapedPage, index: number, fallback: string): string {
  return page.headings[index]?.text ?? fallback;
}
