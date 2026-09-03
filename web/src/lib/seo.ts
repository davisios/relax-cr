export const SITE_URL = "https://relaxcostarica.com";
export const SITE_NAME = "Relax Costa Rica";
export const AGENT_NAME = "Dominique Brousseau";
export const AGENT_PHONE = "+506 8436-5277";
export const AGENT_PHONE_LINK = "+50684365277";
export const AGENT_EMAIL = "dbjacocostarica@gmail.com";

/** Trim free-form text to a meta-description-friendly length. */
export function metaDescription(text: string | undefined, fallback: string): string {
  const source = (text ?? "").replace(/\s+/g, " ").trim();
  if (!source) return fallback;
  if (source.length <= 158) return source;
  const cut = source.slice(0, 158);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
