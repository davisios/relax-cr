#!/usr/bin/env node

import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = process.argv[2];

if (!url) {
  console.error("Usage: node scrape-single.mjs <url>");
  process.exit(1);
}

function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function slugFromUrl(pageUrl) {
  const path = new URL(pageUrl).pathname.replace(/\/$/, "");
  if (!path || path === "/") return "home";
  return path.split("/").filter(Boolean).pop() ?? "unknown";
}

async function fetchText(pageUrl) {
  const res = await fetch(pageUrl, {
    headers: {
      "User-Agent": "RelaxCostaRica-ContentScraper/1.0 (+https://relaxcostarica.com)",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

const html = await fetchText(url);
const $ = cheerio.load(html);
$("script, style, noscript, iframe").remove();

const title =
  cleanText($('meta[property="og:title"]').attr("content") ?? "") ||
  cleanText($("title").text()) ||
  null;
const description =
  cleanText($('meta[name="description"]').attr("content") ?? "") ||
  cleanText($('meta[property="og:description"]').attr("content") ?? "") ||
  null;

const headings = [];
$("h1, h2, h3, h4, h5, h6").each((_, el) => {
  const text = cleanText($(el).text());
  if (text) headings.push({ level: Number(el.tagName.slice(1)), text });
});

const contentSelectors = [
  "article .entry-content",
  ".entry-content",
  "article",
  "main",
  "#content",
  ".content",
];
let mainContent = "";
for (const selector of contentSelectors) {
  const text = cleanText($(selector).first().text());
  if (text.length > mainContent.length) mainContent = text;
}

const formFields = [];
$("form input, form select, form textarea").each((_, el) => {
  const tag = el.tagName.toLowerCase();
  const type = $(el).attr("type") || tag;
  const name = $(el).attr("name") || $(el).attr("id") || null;
  const placeholder = $(el).attr("placeholder") || null;
  const required =
    $(el).attr("required") !== undefined || $(el).attr("aria-required") === "true";
  let label = null;
  const id = $(el).attr("id");
  if (id) label = cleanText($(`label[for="${id}"]`).text()) || null;
  if (!label) {
    label =
      cleanText($(el).closest(".form-group, .wpforms-field, p").find("label").first().text()) ||
      null;
  }
  formFields.push({ tag, type, name, label, placeholder, required });
});

const page = {
  url,
  canonical: url,
  slug: slugFromUrl(url),
  type: "page",
  title,
  description,
  headings,
  mainContent,
  formFields,
  scrapedAt: new Date().toISOString(),
};

const outDir = join(__dirname, "output", "pages");
mkdirSync(outDir, { recursive: true });
const filename = `page__${page.slug}.json`;
const outPath = join(outDir, filename);
writeFileSync(outPath, JSON.stringify(page, null, 2));
console.log(`Saved ${outPath}`);
console.log(JSON.stringify(page, null, 2));
