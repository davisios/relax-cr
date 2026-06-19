# Relax Costa Rica — Next.js Redesign Architecture

> Based on `relaxcostarica.com` scraper data and the Claude Design file `Relax Costa Rica Home.dc.html`.
> **Note:** The Claude Design URL requires browser authentication. Connect the Chrome extension and reload to import the live design tokens.

---

## 1. Component Inventory

### Layout / Shell
| Component | Description |
|---|---|
| `Navbar` | Sticky top bar — logo, primary nav, language switcher (EN / ES / FR), CTA button |
| `MobileMenu` | Slide-in drawer for mobile navigation |
| `Footer` | Logo, nav columns (Buy, Sell, Explore, Legal), social links, contact info |

### Home Page Sections (top → bottom)
| Component | Section Heading | Key Content |
|---|---|---|
| `HeroSection` | — | Full-bleed background image/video, tagline, `PropertySearchWidget` |
| `PropertySearchWidget` | — | Filters: type, city, bedrooms, bathrooms, price range, amenities. "Search Listings" + "Advanced Search" |
| `AgentHighlight` | "Live your dream everyday" | Dominique bio teaser, 3 CTA cards (Home Search, Valuation, Let's Connect) |
| `MeetDominique` | "Meet Dominique" | Photo, full bio (EN/ES/FR), social links, Contact Me button |
| `NeighborhoodsGrid` | "Featured Neighborhoods" | 8 neighborhood cards with listing counts (Jaco, Hermosa, Herradura, Esterillos, Tarcoles, Punta Leona, Bejuco, Los Sueños) |
| `FeaturedProperties` | "Featured Properties" | Carousel/grid of `PropertyCard` components |
| `WhyChooseMe` | "Why Choose Me" | Stat block + awards: Platinum Club, 100% Club, President's Club, Hall of Fame 2022 |
| `TestimonialsCarousel` | "Client Testimonials" | Rotating quotes with reviewer name |
| `PopularCategories` | "Popular Categories" | 4 property type cards with listing counts |
| `BlogPreview` | "Our Blog" | 3 latest blog post cards |
| `SellerCTA` | "Are you selling your home?" | "Get Estimation" button |
| `BuyerCTA` | "Are you looking to buy?" | "Search Listings" button |

### Reusable UI Components
| Component | Description |
|---|---|
| `PropertyCard` | Image carousel thumbnail, price, type badge, beds/baths/size, agent name, status badge |
| `NeighborhoodCard` | Background image, name, listing count |
| `BlogCard` | Featured image, date, title, excerpt |
| `CategoryCard` | Icon + label + listing count |
| `TestimonialCard` | Quote, reviewer name |
| `AwardBadge` | Icon + label (Platinum Club, etc.) |
| `SearchFilter` | Dropdown or multi-select filter pill |
| `PriceRangeSlider` | Dual-handle slider ($0 – $10M) |
| `StatusBadge` | "For Sale" / "In Contract" / "Sold" / "Recently Reduced" / "Exclusive" |
| `PropertyTypeTag` | "Condo | Apartment", "House | Villa", etc. |
| `SocialLinks` | Facebook, YouTube, Instagram, WhatsApp, LinkedIn |
| `ContactForm` | Name, email, phone, message, time picker, submit |
| `LanguageSwitcher` | EN / ES / FR toggle |
| `LoadMoreButton` | Pagination trigger for property lists |

---

## 2. Design System

### Aesthetic Direction
Luxury coastal real estate. Warm, aspirational, trustworthy. Blends tropical greenery with ocean blues and warm sand tones. Photography-first layout — components step back to let hero images breathe.

### Brand Voice
- English, Spanish, French (multilingual throughout)
- Warm and personal ("Imagine living your dream every day")
- RE/MAX affiliation — credibility badges prominent

---

## 3. Typography Scale

### Font Families
| Role | Family | Weights |
|---|---|---|
| **Display / Headlines** | `Cormorant Garamond` (serif) | 400, 600, 700 |
| **Body / UI** | `Inter` (sans-serif) | 400, 500, 600 |
| **Accent / Signature** | `Great Vibes` (script) | 400 — used sparingly for "Dominique" signature only |

### Type Scale (rem / px at 16px base)
| Token | rem | px | Usage |
|---|---|---|---|
| `text-xs` | 0.75 | 12 | Labels, legal fine print |
| `text-sm` | 0.875 | 14 | Captions, meta, badges |
| `text-base` | 1 | 16 | Body text |
| `text-lg` | 1.125 | 18 | Lead paragraphs |
| `text-xl` | 1.25 | 20 | Card titles |
| `text-2xl` | 1.5 | 24 | Section sub-headings |
| `text-3xl` | 1.875 | 30 | Section headings |
| `text-4xl` | 2.25 | 36 | Page headings |
| `text-5xl` | 3 | 48 | Hero sub-headline |
| `text-6xl` | 3.75 | 60 | Hero headline |
| `text-7xl` | 4.5 | 72 | Display / splash only |

### Line Heights
- Display: `leading-tight` (1.15)
- Headings: `leading-snug` (1.375)
- Body: `leading-relaxed` (1.625)

---

## 4. Color Tokens

### Palette
| Token | Hex | Usage |
|---|---|---|
| `color.ocean.900` | `#0D2B3E` | Darkest navy — footer bg, text on light |
| `color.ocean.700` | `#1B4F72` | Primary brand color — buttons, nav active |
| `color.ocean.500` | `#2E86C1` | Links, hover states |
| `color.ocean.100` | `#D6EAF8` | Light accent bg |
| `color.jungle.700` | `#1E6B3C` | Success, "For Sale" badge |
| `color.jungle.500` | `#27AE60` | Secondary CTA hover |
| `color.jungle.100` | `#D5F5E3` | Light tint bg |
| `color.sand.700` | `#9A7D0A` | Warm dark gold |
| `color.sand.500` | `#D4AC0D` | Award badges, highlight |
| `color.sand.300` | `#F9E79F` | Subtle warm bg |
| `color.sand.100` | `#FDFBEE` | Page background alternative |
| `color.cream` | `#FAF7F2` | Default page bg |
| `color.neutral.900` | `#1A1A1A` | Primary text |
| `color.neutral.700` | `#3D3D3D` | Secondary text |
| `color.neutral.500` | `#6B6B6B` | Muted text, placeholders |
| `color.neutral.300` | `#C4C4C4` | Borders, dividers |
| `color.neutral.100` | `#F5F5F5` | Card backgrounds |
| `color.white` | `#FFFFFF` | |
| `color.error` | `#E74C3C` | Form errors |
| `color.sold` | `#922B21` | "Sold" status badge |
| `color.inContract` | `#784212` | "In Contract" badge |
| `color.exclusive` | `#6C3483` | "Exclusive" badge |
| `color.reduced` | `#1A5276` | "Recently Reduced" badge |

---

## 5. Spacing System

### Base Unit: 4px

| Token | px | rem |
|---|---|---|
| `space-0` | 0 | 0 |
| `space-1` | 4 | 0.25 |
| `space-2` | 8 | 0.5 |
| `space-3` | 12 | 0.75 |
| `space-4` | 16 | 1 |
| `space-5` | 20 | 1.25 |
| `space-6` | 24 | 1.5 |
| `space-8` | 32 | 2 |
| `space-10` | 40 | 2.5 |
| `space-12` | 48 | 3 |
| `space-16` | 64 | 4 |
| `space-20` | 80 | 5 |
| `space-24` | 96 | 6 |
| `space-32` | 128 | 8 |
| `space-40` | 160 | 10 |
| `space-48` | 192 | 12 |

### Section Vertical Rhythm
- Section padding: `py-20` (80px) desktop / `py-12` (48px) mobile
- Container max-width: `max-w-7xl` (1280px), centered, `px-4 sm:px-6 lg:px-8`
- Card gap: `gap-6` (24px)
- Grid columns: 1 → 2 → 3 → 4 responsive

### Border Radius
| Token | px | Usage |
|---|---|---|
| `rounded-sm` | 4 | Badges, pills |
| `rounded` | 6 | Inputs |
| `rounded-md` | 8 | Buttons |
| `rounded-lg` | 12 | Cards |
| `rounded-xl` | 16 | Feature cards |
| `rounded-2xl` | 24 | Hero search widget |
| `rounded-full` | 9999 | Avatars, icon buttons |

---

## 6. Tailwind Theme Configuration

```js
// tailwind.config.ts (preview — not final code)
theme: {
  extend: {
    colors: {
      ocean: {
        100: '#D6EAF8',
        500: '#2E86C1',
        700: '#1B4F72',
        900: '#0D2B3E',
      },
      jungle: {
        100: '#D5F5E3',
        500: '#27AE60',
        700: '#1E6B3C',
      },
      sand: {
        100: '#FDFBEE',
        300: '#F9E79F',
        500: '#D4AC0D',
        700: '#9A7D0A',
      },
      cream: '#FAF7F2',
      neutral: {
        100: '#F5F5F5',
        300: '#C4C4C4',
        500: '#6B6B6B',
        700: '#3D3D3D',
        900: '#1A1A1A',
      },
    },
    fontFamily: {
      display: ['Cormorant Garamond', 'Georgia', 'serif'],
      sans: ['Inter', 'system-ui', 'sans-serif'],
      script: ['Great Vibes', 'cursive'],
    },
    fontSize: {
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      '6xl': ['3.75rem', { lineHeight: '1.15' }],
      '5xl': ['3rem', { lineHeight: '1.2' }],
    },
    spacing: {
      '18': '4.5rem',
      '22': '5.5rem',
      '88': '22rem',
      '128': '32rem',
    },
    maxWidth: {
      '8xl': '88rem',
      '9xl': '96rem',
    },
    boxShadow: {
      'card': '0 2px 12px rgba(0,0,0,0.08)',
      'card-hover': '0 8px 32px rgba(0,0,0,0.14)',
      'hero': '0 20px 60px rgba(13,43,62,0.35)',
    },
    backgroundImage: {
      'hero-gradient': 'linear-gradient(to bottom, rgba(13,43,62,0.3) 0%, rgba(13,43,62,0.65) 100%)',
      'card-overlay': 'linear-gradient(to top, rgba(13,43,62,0.8) 0%, transparent 60%)',
    },
    transitionTimingFunction: {
      'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
},
```

---

## 7. Page Architecture (Next.js App Router)

```
app/
├── layout.tsx                    ← Root layout: Navbar, Footer, fonts, i18n
├── page.tsx                      ← / Home
│
├── properties/
│   ├── page.tsx                  ← /properties — listing grid with sidebar filters
│   └── [slug]/
│       └── page.tsx              ← /properties/[slug] — property detail
│
├── neighborhoods/
│   ├── page.tsx                  ← /neighborhoods — 8-neighborhood overview
│   └── [slug]/
│       └── page.tsx              ← /neighborhoods/jaco etc.
│
├── search/
│   └── page.tsx                  ← /search — advanced search results
│
├── agent/
│   └── page.tsx                  ← /agent — Dominique full profile
│
├── blog/
│   ├── page.tsx                  ← /blog — post listing
│   └── [slug]/
│       └── page.tsx              ← /blog/[slug] — individual post
│
├── property-valuation/
│   └── page.tsx                  ← /property-valuation — valuation request form
│
├── vacation-rentals/
│   └── page.tsx                  ← /vacation-rentals
│
├── contact/
│   └── page.tsx                  ← /contact — contact form + map
│
└── [locale]/                     ← Optional i18n prefix (fr/, es/)
    └── ...mirrors above

lib/
├── data/                         ← Scraped JSON loaders / static data helpers
│   ├── properties.ts
│   ├── neighborhoods.ts
│   ├── blog.ts
│   └── agent.ts
├── types/
│   ├── property.ts
│   ├── neighborhood.ts
│   └── blog.ts
└── utils/
    ├── formatPrice.ts
    ├── formatArea.ts
    └── cn.ts                     ← clsx/twMerge helper

components/
├── layout/
│   ├── Navbar.tsx
│   ├── MobileMenu.tsx
│   └── Footer.tsx
├── home/
│   ├── HeroSection.tsx
│   ├── PropertySearchWidget.tsx
│   ├── AgentHighlight.tsx
│   ├── MeetDominique.tsx
│   ├── NeighborhoodsGrid.tsx
│   ├── FeaturedProperties.tsx
│   ├── WhyChooseMe.tsx
│   ├── TestimonialsCarousel.tsx
│   ├── PopularCategories.tsx
│   ├── BlogPreview.tsx
│   └── SellerBuyerCTA.tsx
├── property/
│   ├── PropertyCard.tsx
│   ├── PropertyGrid.tsx
│   ├── PropertyFilters.tsx
│   ├── PropertyDetail.tsx
│   └── PropertyImageGallery.tsx
├── neighborhood/
│   ├── NeighborhoodCard.tsx
│   └── NeighborhoodDetail.tsx
├── blog/
│   ├── BlogCard.tsx
│   └── BlogDetail.tsx
└── ui/
    ├── Button.tsx
    ├── Badge.tsx
    ├── StatusBadge.tsx
    ├── SearchFilter.tsx
    ├── PriceRangeSlider.tsx
    ├── Carousel.tsx
    ├── ContactForm.tsx
    ├── SocialLinks.tsx
    └── LanguageSwitcher.tsx
```

### Data Strategy
- **Static generation (SSG)** for all property, neighborhood, and blog pages — JSON from scraper baked in at build time
- **Incremental Static Regeneration (ISR)** for property listings — `revalidate: 3600` to refresh hourly
- **Client-side search** using the scraped `all-pages.json` index, filtered via URL params
- No external API at launch — all data lives in `lib/data/` parsed from `output/pages/*.json`

### Key Routes & Data Sources
| Route | Primary Data File |
|---|---|
| `/` | `page__home.json` + latest 9 properties |
| `/properties` | All `property__*.json` files |
| `/properties/[slug]` | `property__[slug].json` |
| `/neighborhoods` | `content-structure.json` → cities section |
| `/neighborhoods/[slug]` | `city__[slug].json` |
| `/agent` | `agent__dominique-brousseau.json` |
| `/blog` | All `blog_post__*.json` files |
| `/blog/[slug]` | `blog_post__[slug].json` |
| `/search` | Client-side filter over `all-pages.json` |
