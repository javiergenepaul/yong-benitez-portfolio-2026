"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { TypeAnimation } from "react-type-animation"

import siteContent from "@/lib/data/site-content.json"
import { ResumeBuilderModal } from "@/components/resume-builder-modal"
import { Button } from "@/components/ui/button"

function StatCounter({
  target,
  suffix = "+",
}: {
  target: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let cur = 0
          const step = Math.ceil(target / 40)
          const interval = setInterval(() => {
            cur = Math.min(cur + step, target)
            setCount(cur)
            if (cur >= target) clearInterval(interval)
          }, 40)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-3xl font-black text-primary">
      {count}
      {suffix}
    </div>
  )
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el)
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 70,
      behavior: "smooth",
    })
}

export function Hero() {
  const { t, i18n } = useTranslation()
  const [isResumeBuilderOpen, setIsResumeBuilderOpen] = useState(false)
  const description =
    i18n.language === "en"
      ? siteContent.hero.description
      : t("hero.description")

  const roles = t("hero.roles", { returnObjects: true }) as string[]
  const rolesSequence: (string | number)[] = roles.flatMap((r) => [r, 2500])

  const floatingChips = [
    {
      emoji: "🎬",
      label: t("hero.chips.videoEditing"),
      color: "text-primary",
      bg: "bg-primary/20",
      pos: "top-8 left-4",
      delay: "0s",
    },
    {
      emoji: "✍️",
      label: t("hero.chips.photoEditing"),
      color: "text-purple-400",
      bg: "bg-purple-500/20",
      pos: "top-20 right-0",
      delay: "0.7s",
    },
    {
      emoji: "📱",
      label: t("hero.chips.socialMedia"),
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      pos: "bottom-24 left-0",
      delay: "1.4s",
    },
    {
      emoji: "🎙️",
      label: t("hero.chips.podcasting"),
      color: "text-green-400",
      bg: "bg-green-500/20",
      pos: "bottom-10 right-4",
      delay: "0s",
    },
  ]

  const stats = [
    { count: 4, suffix: "+", label: t("hero.stats.yearsExp") },
    { count: 17, suffix: "+", label: t("hero.stats.clients") },
    { count: 4, suffix: "+", label: t("hero.stats.services") },
    { count: 100, suffix: "%", label: t("hero.stats.remote") },
  ]

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16"
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-20 right-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-20 left-10 h-64 w-64 rounded-full bg-navy/30 blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 py-16 md:grid-cols-2">
        {/* Left copy */}
        <div>
          <div
            className="animate-fade-up opacity-0"
            style={{ animationDelay: ".1s" }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-bold tracking-widest text-primary uppercase">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              {t("hero.badge")}
            </span>
          </div>

          <div
            className="animate-fade-up opacity-0"
            style={{ animationDelay: ".25s" }}
          >
            <h1 className="mb-2 text-5xl leading-[1.05] font-black md:text-7xl">
              <span className="text-foreground">{t("hero.tagline1")}</span>
              <br />
              <span className="shimmer-text">{t("hero.tagline2")}</span>
              <br />
              <span className="text-foreground/60">{t("hero.tagline3")}</span>
            </h1>
          </div>

          {/* Name + animated role */}
          <div
            className="animate-fade-up opacity-0"
            style={{ animationDelay: ".4s" }}
          >
            <div className="mt-4 mb-6 flex flex-wrap items-baseline gap-x-2">
              <span className="text-lg whitespace-nowrap text-foreground/40">
                {t("hero.intro")}
              </span>
              <span className="text-lg font-black whitespace-nowrap text-foreground">
                Yong Benitez,
              </span>
              <TypeAnimation
                key={i18n.language}
                sequence={rolesSequence}
                wrapper="span"
                speed={55}
                deletionSpeed={70}
                repeat={Infinity}
                cursor={true}
                className="text-lg font-bold text-primary"
              />
            </div>
            <p className="mb-8 max-w-md text-base leading-relaxed text-foreground/50">
              {description}
            </p>
          </div>

          <div
            className="flex animate-fade-up flex-wrap gap-4 opacity-0"
            style={{ animationDelay: ".55s" }}
          >
            <Button
              onClick={() => scrollTo("contact")}
              className="h-auto rounded-full px-8 py-3.5 text-sm font-bold"
            >
              {t("hero.cta1")}
            </Button>
            <button
              onClick={() => setIsResumeBuilderOpen(true)}
              className="rounded-full border border-border px-8 py-3.5 text-sm font-bold text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
            >
              {t("hero.cta2")}
            </button>
          </div>

          {/* Stats */}
          <div
            className="mt-10 flex animate-fade-up gap-8 border-t border-border pt-8 opacity-0"
            style={{ animationDelay: ".7s" }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <StatCounter target={s.count} suffix={s.suffix} />
                <div className="mt-1 text-xs text-foreground/30">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div
          className="relative hidden h-125 animate-slide-left items-center justify-center opacity-0 md:flex"
          style={{ animationDelay: ".3s" }}
        >
          {/* Ripple rings */}
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full">
            {[0, 0.8, 1.6].map((delay, i) => (
              <div
                key={i}
                className="absolute inset-0 animate-ripple rounded-full border-2 border-primary/40"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>

          {/* Blob avatar */}
          <div className="relative z-10 flex h-52 w-52 animate-blob items-center justify-center bg-linear-to-br from-navy to-[#1a1f2e]">
            <span className="text-8xl font-black text-white/10 select-none">
              Y
            </span>
            <div className="absolute -bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold whitespace-nowrap text-white">
              {t("hero.avatarBadge")}
            </div>
          </div>

          {/* Floating chips */}
          {floatingChips.map((chip) => (
            <div
              key={chip.label}
              className={`absolute animate-float ${chip.pos} flex items-center gap-2 rounded-2xl border border-border bg-card p-3 text-xs font-bold text-foreground`}
              style={{ animationDelay: chip.delay }}
            >
              <div
                className={`h-8 w-8 rounded-xl ${chip.bg} flex items-center justify-center ${chip.color} text-base`}
              >
                {chip.emoji}
              </div>
              {chip.label}
            </div>
          ))}

          {/* Slow spinning ring */}
          <div className="pointer-events-none absolute h-80 w-80 animate-spin-slow rounded-full border border-dashed border-white/5" />
        </div>
      </div>

      <ResumeBuilderModal
        open={isResumeBuilderOpen}
        onClose={() => setIsResumeBuilderOpen(false)}
      />
    </section>
  )
}
