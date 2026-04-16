"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { ImageIcon } from "lucide-react"

type FilterCat = "all" | "video" | "gallery" | "youtube"
const tabIds: FilterCat[] = ["all", "video", "gallery", "youtube"]

// ── Sample short-form videos / reels ─────────────────────────────────────────
const sampleVideos = [
  {
    type: "video" as const,
    cat: "video" as const,
    title: "Real Estate Promo Reel",
    sub: "Robin Michael · Social Media",
    thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "0:45",
    badgeLabel: "🎬 Short Reel",
    badgeCls: "bg-primary text-white",
    playBg: "bg-primary/90",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    desc: "Social media promo reel for real estate listings — hooks, captions, fast cuts.",
  },
  {
    type: "video" as const,
    cat: "video" as const,
    title: "Short-Form Video Ad",
    sub: "Savage Sales · TikTok / Reels",
    thumb: "https://img.youtube.com/vi/kXYiU_JCYtU/hqdefault.jpg",
    duration: "0:30",
    badgeLabel: "🎬 TikTok / Reel",
    badgeCls: "bg-primary text-white",
    playBg: "bg-primary/90",
    embedUrl: "https://www.youtube.com/embed/kXYiU_JCYtU",
    desc: "Short-form video ad for Savage Sales — product showcase with transitions and captions.",
  },
  {
    type: "video" as const,
    cat: "video" as const,
    title: "Podcast Episode Highlight",
    sub: "Talking Shift with Craig · Clip",
    thumb: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
    duration: "2:30",
    badgeLabel: "🎙️ Podcast Clip",
    badgeCls: "bg-violet-500 text-white",
    playBg: "bg-violet-500/90",
    embedUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    desc: "Highlight clip from Talking Shift with Craig — clean cuts, captions, audiogram.",
  },
  {
    type: "video" as const,
    cat: "video" as const,
    title: "Instagram Growth Campaign",
    sub: "BMP Network · Engagement",
    thumb: "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg",
    duration: "1:12",
    badgeLabel: "📱 Social Clip",
    badgeCls: "bg-blue-500 text-white",
    playBg: "bg-blue-500/90",
    embedUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    desc: "Social media campaign for BMP Network — grew engagement by 3x in 60 days.",
  },
]

// ── Graphic design / photo editing gallery ────────────────────────────────────
const graphicsGallery = [
  {
    type: "gallery" as const,
    cat: "gallery" as const,
    title: "Social Media Graphics Pack",
    sub: "BMP Network · Instagram",
    thumb: "",
    desc: "Custom Instagram post graphics — feed aesthetic, brand colors, consistent layout.",
  },
  {
    type: "gallery" as const,
    cat: "gallery" as const,
    title: "YouTube Thumbnail Set",
    sub: "Talking Shift with Craig · YouTube",
    thumb: "",
    desc: "Eye-catching YouTube thumbnails designed to maximize click-through rate.",
  },
  {
    type: "gallery" as const,
    cat: "gallery" as const,
    title: "Brand Identity Mockups",
    sub: "Coach Me Laura · Branding",
    thumb: "",
    desc: "Visual identity assets — logo usage, color palette, typography, and social templates.",
  },
  {
    type: "gallery" as const,
    cat: "gallery" as const,
    title: "Instagram Carousel Design",
    sub: "Outcamping UK · Instagram",
    thumb: "",
    desc: "Swipeable carousel posts crafted to boost saves and shares for the outdoor brand.",
  },
  {
    type: "gallery" as const,
    cat: "gallery" as const,
    title: "Canva Presentation Deck",
    sub: "Procore Inc · Internal",
    thumb: "",
    desc: "Clean, branded presentation deck built in Canva for internal business use.",
  },
  {
    type: "gallery" as const,
    cat: "gallery" as const,
    title: "Promotional Flyer Suite",
    sub: "American Air HVAC · Marketing",
    thumb: "",
    desc: "Print-ready and digital flyers for seasonal HVAC promotions and service offers.",
  },
]

// ── Long-form YouTube / vlogs ─────────────────────────────────────────────────
const longFormVideos = [
  {
    type: "youtube" as const,
    cat: "youtube" as const,
    title: "Full Property Tour – Luxury Listing",
    sub: "Robin Michael · YouTube",
    thumb: "https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg",
    duration: "12:30",
    badgeLabel: "▶ YouTube",
    badgeCls: "bg-red-600 text-white",
    playBg: "bg-red-600/90",
    embedUrl: "https://www.youtube.com/embed/2Vv-BfVoq4g",
    desc: "Full walkthrough video of a luxury real estate listing — edited for YouTube and MLS use.",
  },
  {
    type: "youtube" as const,
    cat: "youtube" as const,
    title: "Podcast Full Episode – Season 2",
    sub: "Talking Shift with Craig · YouTube",
    thumb: "https://img.youtube.com/vi/ZZ5LpwO-An4/hqdefault.jpg",
    duration: "48:10",
    badgeLabel: "▶ YouTube",
    badgeCls: "bg-red-600 text-white",
    playBg: "bg-red-600/90",
    embedUrl: "https://www.youtube.com/embed/ZZ5LpwO-An4",
    desc: "Full podcast episode produced, edited, and published to YouTube — intro, outro, chapters.",
  },
  {
    type: "youtube" as const,
    cat: "youtube" as const,
    title: "Client Feedback Highlight Reel",
    sub: "Multiple Clients · Testimonials",
    thumb: "https://img.youtube.com/vi/kXYiU_JCYtU/hqdefault.jpg",
    duration: "3:15",
    badgeLabel: "▶ YouTube",
    badgeCls: "bg-red-600 text-white",
    playBg: "bg-red-600/90",
    embedUrl: "https://www.youtube.com/embed/kXYiU_JCYtU",
    desc: "A compilation of client feedback and results — real impact across all services.",
  },
]

const allWorks = [...sampleVideos, ...graphicsGallery, ...longFormVideos]

// ── Gallery placeholder colours (cycles through items) ────────────────────────
const galleryGradients = [
  "from-primary/20 via-purple-500/10 to-blue-500/10",
  "from-blue-500/20 via-cyan-500/10 to-teal-500/10",
  "from-purple-500/20 via-pink-500/10 to-primary/10",
  "from-teal-500/20 via-green-500/10 to-blue-500/10",
  "from-orange-500/20 via-yellow-500/10 to-primary/10",
  "from-violet-500/20 via-purple-500/10 to-pink-500/10",
]

type AnyWork = (typeof allWorks)[number]
type ModalState =
  | { kind: "video"; url: string; title: string; desc: string }
  | {
      kind: "gallery"
      thumb: string
      title: string
      desc: string
      gradientIdx: number
    }

export function Works() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<FilterCat>("all")
  const [modal, setModal] = useState<ModalState | null>(null)

  const tabs = t("works.tabs", { returnObjects: true }) as string[]

  const filtered =
    activeTab === "all" ? allWorks : allWorks.filter((w) => w.cat === activeTab)

  function openCard(w: AnyWork, idx: number) {
    if (w.type === "gallery") {
      setModal({
        kind: "gallery",
        thumb: w.thumb,
        title: w.title,
        desc: w.desc,
        gradientIdx: idx % galleryGradients.length,
      })
    } else {
      setModal({
        kind: "video",
        url: `${w.embedUrl}?autoplay=1`,
        title: w.title,
        desc: w.desc,
      })
    }
  }

  return (
    <section id="works" className="bg-surface-alt px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-xs font-bold tracking-widest text-primary uppercase">
            {t("works.label")}
          </p>
          <h2 className="text-4xl font-black text-foreground">
            {t("works.title")}{" "}
            <span className="shimmer-text">{t("works.titleHighlight")}</span>
          </h2>
          <p className="mt-2 max-w-lg text-sm text-foreground/40">
            {t("works.description")}
          </p>
        </Reveal>

        {/* Tabs */}
        <div className="mt-8 mb-10 flex flex-wrap gap-3">
          {tabIds.map((id, i) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-bold transition-all",
                activeTab === id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground/40 hover:border-primary hover:text-primary"
              )}
            >
              {tabs[i]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w, i) => (
            <Reveal key={`${w.title}-${i}`} delay={i * 50}>
              {w.type === "gallery" ? (
                // ── Gallery card ────────────────────────────────────────────
                <div
                  className="card-hover group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card"
                  onClick={() => openCard(w, i)}
                >
                  <div
                    className={cn(
                      "relative flex aspect-video items-center justify-center overflow-hidden",
                      "bg-linear-to-br",
                      galleryGradients[i % galleryGradients.length]
                    )}
                  >
                    {w.thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={w.thumb}
                        alt={w.title}
                        className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                      />
                    ) : (
                      <ImageIcon className="h-12 w-12 text-foreground/15" />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                      <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        View
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 rounded-md bg-purple-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      🎨 Graphics
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-sm font-bold text-foreground">
                      {w.title}
                    </h3>
                    <p className="text-xs text-foreground/40">{w.sub}</p>
                  </div>
                </div>
              ) : (
                // ── Video / YouTube card ────────────────────────────────────
                <div
                  className="card-hover group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card"
                  onClick={() => openCard(w, i)}
                >
                  <div className="relative aspect-video overflow-hidden bg-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.thumb}
                      alt={w.title}
                      className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`h-14 w-14 rounded-full ${w.playBg} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}
                      >
                        <svg
                          className="ml-1 h-5 w-5 fill-white"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div
                      className={`absolute top-3 left-3 ${w.badgeCls} rounded-md px-2 py-0.5 text-[10px] font-bold`}
                    >
                      {w.badgeLabel}
                    </div>
                    <div className="absolute right-3 bottom-3 rounded-md bg-black/60 px-2 py-0.5 text-[10px] text-white">
                      {w.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-sm font-bold text-foreground">
                      {w.title}
                    </h3>
                    <p className="text-xs text-foreground/40">{w.sub}</p>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {modal.title}
                </h3>
                <p className="mt-0.5 text-xs text-foreground/40">
                  {modal.desc}
                </p>
              </div>
              <button
                onClick={() => setModal(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-lg leading-none text-foreground/60 transition-all hover:bg-white/15 hover:text-foreground"
              >
                ×
              </button>
            </div>

            {/* Body */}
            {modal.kind === "video" ? (
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={modal.url}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                className={cn(
                  "flex aspect-video w-full items-center justify-center bg-linear-to-br",
                  galleryGradients[modal.gradientIdx]
                )}
              >
                {modal.thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={modal.thumb}
                    alt={modal.title}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-foreground/30">
                    <ImageIcon className="mx-auto mb-3 h-16 w-16" />
                    <p className="text-sm font-semibold">Image coming soon</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
