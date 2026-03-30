"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

type Category = "all" | "video" | "social" | "podcast"

const tabs: { id: Category; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "video", label: "Video Editing" },
  { id: "social", label: "Social Media" },
  { id: "podcast", label: "Podcast" },
]

interface WorkCard {
  cat: Category
  title: string
  sub: string
  thumb: string
  duration: string
  badgeLabel: string
  badgeCls: string
  playBg: string
  embedUrl: string
  desc: string
}

const works: WorkCard[] = [
  {
    cat: "video",
    title: "Real Estate Promo Reel",
    sub: "Robin Michael · Social Media",
    thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "0:45",
    badgeLabel: "🎬 Video Edit",
    badgeCls: "bg-primary text-white",
    playBg: "bg-primary/90",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    desc: "Video edit created for Robin Michael – social media promo reel for real estate listings.",
  },
  {
    cat: "social",
    title: "Instagram Growth Campaign",
    sub: "BMP Network · Engagement",
    thumb: "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg",
    duration: "1:12",
    badgeLabel: "📱 Social Media",
    badgeCls: "bg-blue-500 text-white",
    playBg: "bg-blue-500/90",
    embedUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    desc: "Social media marketing campaign for BMP Network — grew engagement by 3x in 60 days.",
  },
  {
    cat: "podcast",
    title: "Podcast Episode Highlight",
    sub: "Talking Shift with Craig · Audio",
    thumb: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
    duration: "2:30",
    badgeLabel: "🎙️ Podcast",
    badgeCls: "bg-violet-500 text-white",
    playBg: "bg-violet-500/90",
    embedUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    desc: "Produced and edited a highlight clip from Talking Shift with Craig — clean cuts, captions, audiogram.",
  },
  {
    cat: "video",
    title: "Short-Form Video Ad",
    sub: "Savage Sales · TikTok / Reels",
    thumb: "https://img.youtube.com/vi/kXYiU_JCYtU/hqdefault.jpg",
    duration: "0:30",
    badgeLabel: "🎬 Video Edit",
    badgeCls: "bg-primary text-white",
    playBg: "bg-primary/90",
    embedUrl: "https://www.youtube.com/embed/kXYiU_JCYtU",
    desc: "Short-form video ad produced for Savage Sales — product showcase with transitions and captions.",
  },
  {
    cat: "social",
    title: "Outdoor Brand Content",
    sub: "Outcamping UK · Instagram",
    thumb: "https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg",
    duration: "1:00",
    badgeLabel: "📱 Social Media",
    badgeCls: "bg-green-500 text-white",
    playBg: "bg-green-500/90",
    embedUrl: "https://www.youtube.com/embed/2Vv-BfVoq4g",
    desc: "Content strategy and post production for Outcamping UK — nature aesthetic, community feel.",
  },
  {
    cat: "all",
    title: "Client Feedback Highlight",
    sub: "Multiple Clients · Testimonials",
    thumb: "https://img.youtube.com/vi/ZZ5LpwO-An4/hqdefault.jpg",
    duration: "3:15",
    badgeLabel: "⭐ Client Feedback",
    badgeCls: "bg-yellow-500 text-black",
    playBg: "bg-yellow-500/90",
    embedUrl: "https://www.youtube.com/embed/ZZ5LpwO-An4",
    desc: "A compilation of client feedback and results — showing real impact across all services.",
  },
]

interface ModalState {
  url: string
  title: string
  desc: string
}

export function Works() {
  const [activeTab, setActiveTab] = useState<Category>("all")
  const [modal, setModal] = useState<ModalState | null>(null)

  const filtered = works.filter((w) => activeTab === "all" || w.cat === activeTab || w.cat === "all")

  return (
    <section id="works" className="py-24 px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">My Work</p>
          <h2 className="text-4xl font-black text-foreground">
            Watch. <span className="shimmer-text">Experience.</span>
          </h2>
          <p className="text-foreground/40 text-sm mt-2 max-w-lg">
            A highlight reel of video edits, social media content, and creative projects
            delivered for real clients.
          </p>
        </Reveal>

        {/* Tabs */}
        <div className="flex gap-3 flex-wrap mt-8 mb-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={cn(
                "text-xs font-bold px-4 py-2 rounded-full border transition-all",
                activeTab === t.id
                  ? "border-primary text-primary"
                  : "border-border text-foreground/40 hover:border-primary hover:text-primary"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((w, i) => (
            <Reveal key={w.title} delay={i * 50}>
              <div
                className="card-hover bg-card border border-border rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() =>
                  setModal({ url: `${w.embedUrl}?autoplay=1`, title: w.title, desc: w.desc })
                }
              >
                <div className="relative aspect-video bg-card overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.thumb}
                    alt={w.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-14 h-14 rounded-full ${w.playBg} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      <svg className="fill-white w-5 h-5 ml-1" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`absolute top-3 left-3 ${w.badgeCls} text-[10px] font-bold px-2 py-0.5 rounded-md`}
                  >
                    {w.badgeLabel}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md">
                    {w.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-foreground mb-1">{w.title}</h4>
                  <p className="text-xs text-foreground/40">{w.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Video modal */}
      {modal && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-card rounded-2xl overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h3 className="text-sm font-bold text-foreground">{modal.title}</h3>
                <p className="text-xs text-foreground/40 mt-0.5">{modal.desc}</p>
              </div>
              <button
                onClick={() => setModal(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-foreground/60 hover:text-foreground transition-all text-lg leading-none"
              >
                ×
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={modal.url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
