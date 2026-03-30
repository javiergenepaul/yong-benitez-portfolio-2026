# Yong Benitez — Portfolio

Personal portfolio website for **Yong Benitez**, a freelance Virtual Assistant & Content Creator with 5+ years of experience in video editing, photo editing, social media marketing, and podcast management.

**Live site:** [yongbenitez.com](https://yongbenitez.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (OKLch color space) |
| UI Components | shadcn/ui + Base UI React |
| Animations | Framer Motion + react-type-animation |
| 3D Background | Three.js |
| i18n | i18next + react-i18next |
| Icons | Lucide React + Simple Icons |
| Theme | next-themes (light / dark) |
| Package Manager | pnpm |

---

## Features

- **Three.js space background** — animated stars, shooting meteorites, and rockets
- **10-language support** — EN, ES, FR, DE, PT, JA, KO, ZH, AR, IT with auto-detection and RTL for Arabic
- **Dark / light mode** — toggle with the theme button or press `D`
- **Typewriter hero** — animated role titles cycling through all 6 roles
- **Animated stats** — counters trigger on scroll via IntersectionObserver
- **Works gallery** — tabbed portfolio with sample videos, graphics, and long-form YouTube content
- **Tools marquee** — dual infinite-scroll rows of 17 software tools with brand icons
- **SEO** — Open Graph, Twitter Card, JSON-LD structured data, sitemap, robots.txt
- **Dynamic OG image** — server-generated preview card at `/opengraph-image`
- **Scroll-reveal animations** — Framer Motion reveals on every section

---

## Getting Started

**Requirements:** Node.js 18+, pnpm

```bash
# Install dependencies
pnpm install

# Start development server (Turbopack)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

```bash
pnpm dev        # Development server with Turbopack
pnpm build      # Production build
pnpm start      # Production server
pnpm lint       # ESLint
pnpm format     # Prettier — formats all .ts/.tsx files in place
pnpm typecheck  # TypeScript type check (no emit)
```

---

## Project Structure

```
app/
├── layout.tsx              # Root layout — metadata, fonts, providers
├── page.tsx                # Single page — composes all sections
├── globals.css             # Tailwind theme tokens (OKLch), keyframes, utilities
├── opengraph-image.tsx     # Dynamic OG image (Next.js ImageResponse)
├── sitemap.ts              # Auto-generated /sitemap.xml
├── robots.ts               # Auto-generated /robots.txt
├── favicon.ico             # Favicon
└── icon.svg                # SVG icon

components/
├── sections/               # Page sections (Hero, About, Services, …)
├── ui/                     # shadcn/ui primitives
├── space-background.tsx    # Three.js animated scene
├── nav.tsx                 # Responsive navbar + language selector
├── language-selector.tsx   # Flag dropdown with 10 languages
├── theme-provider.tsx      # next-themes wrapper
├── i18n-provider.tsx       # i18next client provider
├── reveal.tsx              # Framer Motion scroll-reveal wrapper
├── cursor.tsx              # Custom cursor
└── footer.tsx

lib/
├── i18n.ts                 # i18next config — bundled resources, lng: "en"
├── locales/                # Translation JSON files (en, es, fr, de, pt, ja, ko, zh, ar, it)
└── utils.ts                # cn() helper (clsx + tailwind-merge)
```

### Page Section Order

`Nav` → `Hero` → `Ticker` → `About` → `Services` → `Clients` → `Works` → `Tools` → `Quote` → `Contact` → `Footer`

---

## Internationalization

Language preference is saved to `localStorage` (`yong_lang` key) and restored on mount. Arabic automatically sets `dir="rtl"` on the document root.

Translations live in `lib/locales/<lang>.json`. To add a new language:

1. Add a new JSON file in `lib/locales/`
2. Import it in `lib/i18n.ts` and add to `resources`
3. Add the language code to the `SUPPORTED` array
4. Add the flag + label entry in `components/language-selector.tsx`

---

## Theming

CSS variables are defined in `app/globals.css` under `:root` (light) and `.dark`. Colors use the **OKLch** color space. The primary accent is `oklch(0.59 0.256 323)` (purple).

In dark mode, section backgrounds are semi-transparent so the Three.js space scene shows through. The `html` element background matches the Three.js clear color (`#07091a`) to prevent flash.

Add shadcn/ui components via:

```bash
npx shadcn@latest add <component-name>
```

---

## Deployment

Before deploying, update the `BASE_URL` constant in:

- `app/layout.tsx`
- `app/sitemap.ts`

Replace `https://yongbenitez.com` with your actual domain. The OG image, canonical URL, sitemap, and robots.txt will all update automatically.

Deploy to [Vercel](https://vercel.com) with zero configuration — the project uses the Next.js App Router and edge-compatible routes.

---

## License

All rights reserved © Yong Benitez. The design, content, and branding are personal and not open for reuse.
