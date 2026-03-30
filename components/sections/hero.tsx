"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { TypeAnimation } from "react-type-animation"
import { Button } from "@/components/ui/button"

function StatCounter({ target, suffix = "+" }: { target: number; suffix?: string }) {
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
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" })
}

export function Hero() {
  const { t, i18n } = useTranslation()

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
      emoji: "📸",
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
    { count: 5, suffix: "+", label: t("hero.stats.yearsExp") },
    { count: 15, suffix: "+", label: t("hero.stats.clients") },
    { count: 4, suffix: "+", label: t("hero.stats.services") },
    { count: 100, suffix: "%", label: t("hero.stats.remote") },
  ]

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 px-6 relative overflow-hidden"
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
      <div className="absolute top-20 right-20 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-navy/30 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">
        {/* Left copy */}
        <div>
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: ".1s" }}>
            <span className="inline-flex items-center gap-2 bg-foreground/5 border border-foreground/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t("hero.badge")}
            </span>
          </div>

          <div className="opacity-0 animate-fade-up" style={{ animationDelay: ".25s" }}>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-2">
              <span className="text-foreground">{t("hero.tagline1")}</span>
              <br />
              <span className="shimmer-text">{t("hero.tagline2")}</span>
              <br />
              <span className="text-foreground/30">{t("hero.tagline3")}</span>
            </h1>
          </div>

          {/* Name + animated role */}
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: ".4s" }}>
            <div className="mt-4 mb-6 flex items-baseline flex-wrap gap-x-2">
              <span className="text-lg text-foreground/40 whitespace-nowrap">{t("hero.intro")}</span>
              <span className="text-lg font-black text-foreground whitespace-nowrap">
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
            <p className="text-base text-foreground/50 max-w-md leading-relaxed mb-8">
              {t("hero.description")}
            </p>
          </div>

          <div
            className="opacity-0 animate-fade-up flex gap-4 flex-wrap"
            style={{ animationDelay: ".55s" }}
          >
            <Button
              onClick={() => scrollTo("contact")}
              className="rounded-full px-8 py-3.5 h-auto font-bold text-sm"
            >
              {t("hero.cta1")}
            </Button>
            <button
              onClick={() => scrollTo("services")}
              className="border border-border text-foreground px-8 py-3.5 rounded-full font-bold text-sm hover:border-primary hover:text-primary transition-all duration-300"
            >
              {t("hero.cta2")}
            </button>
          </div>

          {/* Stats */}
          <div
            className="opacity-0 animate-fade-up flex gap-8 mt-10 pt-8 border-t border-border"
            style={{ animationDelay: ".7s" }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <StatCounter target={s.count} suffix={s.suffix} />
                <div className="text-xs text-foreground/30 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div
          className="opacity-0 animate-slide-left hidden md:flex relative justify-center items-center h-[500px]"
          style={{ animationDelay: ".3s" }}
        >
          {/* Ripple rings */}
          <div className="absolute w-64 h-64 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {[0, 0.8, 1.6].map((delay, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ripple"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>

          {/* Blob avatar */}
          <div className="animate-blob relative w-52 h-52 bg-gradient-to-br from-navy to-[#1a1f2e] flex items-center justify-center z-10">
            <span className="text-8xl font-black text-white/10 select-none">Y</span>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap z-20">
              {t("hero.avatarBadge")}
            </div>
          </div>

          {/* Floating chips */}
          {floatingChips.map((chip) => (
            <div
              key={chip.label}
              className={`animate-float absolute ${chip.pos} bg-card border border-border rounded-2xl p-3 text-xs font-bold text-foreground flex items-center gap-2`}
              style={{ animationDelay: chip.delay }}
            >
              <div
                className={`w-8 h-8 rounded-xl ${chip.bg} flex items-center justify-center ${chip.color} text-base`}
              >
                {chip.emoji}
              </div>
              {chip.label}
            </div>
          ))}

          {/* Slow spinning ring */}
          <div className="animate-spin-slow absolute w-80 h-80 rounded-full border border-dashed border-white/5 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
