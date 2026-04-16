import type { Metadata } from "next"
import { Geist, Geist_Mono, Roboto_Slab } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/components/i18n-provider"
import { SpaceBackground } from "@/components/space-background"
import { cn } from "@/lib/utils"

const fontSans  = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono  = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const fontSerif = Roboto_Slab({ subsets: ["latin"], variable: "--font-serif" })

const BASE_URL   = "https://yongbenitez.netlify.app"
const FULL_NAME  = "Yong Benitez"
const TITLE      = "Yong Benitez – Virtual Assistant & Content Creator"
const DESCRIPTION =
  "Freelance virtual assistant offering video editing, social media support, podcast management, and admin systems for global clients."

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:  TITLE,
    template: `%s | ${FULL_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "virtual assistant",
    "freelance VA",
    "video editing",
    "social media manager",
    "photo editing",
    "podcast manager",
    "content creator",
    "remote assistant",
    "social media marketing",
    "Yong Benitez",
    "Filipino virtual assistant",
  ],
  authors:  [{ name: FULL_NAME, url: BASE_URL }],
  creator:  FULL_NAME,
  publisher: FULL_NAME,

  // ── Open Graph ──────────────────────────────────────────────────────────────
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         BASE_URL,
    siteName:    TITLE,
    title:       TITLE,
    description: DESCRIPTION,
    images: [
      {
        url:    "/opengraph-image",
        width:  1200,
        height: 630,
        alt:    TITLE,
      },
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    title:       TITLE,
    description: DESCRIPTION,
    images:      ["/opengraph-image"],
  },

  // ── Indexing ────────────────────────────────────────────────────────────────
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  // ── Alternate languages (i18n) ───────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en": `${BASE_URL}`,
      "es": `${BASE_URL}?lang=es`,
      "fr": `${BASE_URL}?lang=fr`,
      "de": `${BASE_URL}?lang=de`,
      "pt": `${BASE_URL}?lang=pt`,
      "ja": `${BASE_URL}?lang=ja`,
      "ko": `${BASE_URL}?lang=ko`,
      "zh": `${BASE_URL}?lang=zh`,
      "ar": `${BASE_URL}?lang=ar`,
      "it": `${BASE_URL}?lang=it`,
    },
  },

}
// app/favicon.ico and app/icon.svg are auto-detected by Next.js App Router — no icons field needed

// ── JSON-LD Structured Data ──────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name:     FULL_NAME,
  jobTitle: "Virtual Assistant & Content Creator",
  url:      BASE_URL,
  image:    `${BASE_URL}/opengraph-image`,
  description: DESCRIPTION,
  knowsAbout: [
    "Video Editing",
    "Photo Editing",
    "Social Media Marketing",
    "Podcast Management",
    "Content Creation",
    "Virtual Assistance",
    "Brand Strategy",
  ],
  hasOccupation: {
    "@type":       "Occupation",
    name:          "Virtual Assistant",
    occupationLocation: { "@type": "Country", name: "Philippines" },
    description:   "Freelance virtual assistant providing video editing, social media management, and administrative support to global clients.",
  },
  offers: {
    "@type":       "Offer",
    name:          "Freelance Virtual Assistant Services",
    description:   "Video editing, photo editing, social media marketing, podcast management, and general VA services.",
    availability:  "https://schema.org/InStock",
    areaServed:    "Worldwide",
  },
  sameAs: [
    // Add your actual social profile URLs below
    // "https://www.linkedin.com/in/yongbenitez",
    // "https://www.instagram.com/yongbenitez",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, fontMono.variable, fontSerif.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SpaceBackground />
        <I18nProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
