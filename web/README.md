# Relax Costa Rica — Next.js Redesign

Redesign of [relaxcostarica.com](https://relaxcostarica.com/) built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Quick Start

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design tokens
- **Fonts:** Cormorant Garamond (display), Inter (body), Great Vibes (script)
- **Icons:** lucide-react
- **Data:** Scraped JSON from `../relaxcostarica-scraper/output/pages/`

## Project Structure

```
src/
├── app/                  ← Next.js App Router pages
│   ├── layout.tsx        ← Root layout (Navbar, Footer, fonts)
│   ├── page.tsx          ← Home page
│   ├── properties/       ← Listing grid + [slug] detail
│   ├── blog/             ← Blog listing + [slug] post
│   └── contact/          ← Contact form
├── components/
│   ├── layout/           ← Navbar, Footer
│   ├── home/             ← All homepage sections
│   ├── property/         ← PropertyCard, etc.
│   └── ui/               ← StatusBadge, etc.
└── lib/
    ├── data/             ← JSON loaders (properties, neighborhoods, blog)
    ├── types/            ← TypeScript interfaces
    └── utils/            ← cn(), formatPrice(), formatArea()
```

## Data

Property data is loaded from the scraper output in `../relaxcostarica-scraper/output/pages/`. When the scraper directory is available, `getAllProperties()` reads all `property__*.json` files at build time. A set of fallback properties is hardcoded in `lib/data/properties.ts` for Vercel deployments where the scraper directory isn't present.

## Pages Implemented

| Route | Status |
|---|---|
| `/` | ✅ Complete |
| `/properties` | ✅ Complete |
| `/properties/[slug]` | ✅ Complete |
| `/blog` | ✅ Complete |
| `/contact` | ✅ Complete |
| `/neighborhoods` | 🔜 Next |
| `/neighborhoods/[slug]` | 🔜 Next |
| `/agent` | 🔜 Next |
| `/property-valuation` | 🔜 Next |

## Design Tokens

See `tailwind.config.ts` for the full token set. Key colors:
- `ocean-700` `#1B4F72` — primary brand
- `sand-500` `#D4AC0D` — accent / awards
- `jungle-700` `#1E6B3C` — success / listings
- `cream` `#FAF7F2` — default background
