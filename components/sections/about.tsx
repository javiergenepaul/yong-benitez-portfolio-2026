"use client"

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

import siteContent from "@/lib/data/site-content.json"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"

const fallbackSkillKeys = [
  { key: "videoEditing", pct: 95 },
  { key: "photoEditing", pct: 90 },
  { key: "smm", pct: 94 },
  { key: "podcastMgmt", pct: 85 },
  { key: "adminVA", pct: 97 },
  { key: "contentCreation", pct: 92 },
] as const

function SkillBars({ items }: { items: Array<{ label: string; pct: number }> }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>("[data-w]").forEach((bar) => {
            bar.style.width = `${bar.dataset.w}%`
          })
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="space-y-5">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between mb-1.5">
            <span className="text-sm text-foreground/70">{item.label}</span>
            <span className="text-sm text-primary font-bold">{item.pct}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full">
            <div
              className="h-1.5 rounded-full bg-linear-to-r from-primary to-[#e879f9] transition-[width] duration-1200 ease-out"
              style={{ width: 0 }}
              data-w={item.pct}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" })
}

export function About() {
  const { t, i18n } = useTranslation()
  const isEnglish = i18n.language === "en"
  const title1 = isEnglish ? siteContent.about.title1 : t("about.title1")
  const title2 = isEnglish ? siteContent.about.title2 : t("about.title2")
  const paragraphs = isEnglish
    ? siteContent.about.paragraphs
    : [
        t("about.p1"),
        `${t("about.p2")} ${t("about.p2Highlight")} ${t("about.p2After")}`,
        t("about.p3"),
      ]
  const skillItems = isEnglish
    ? siteContent.about.skills
    : fallbackSkillKeys.map((skill) => ({ label: t(`about.skills.${skill.key}`), pct: skill.pct }))
  const ctaLabel = isEnglish ? siteContent.about.cta : t("about.cta")

  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">{t("about.label")}</p>
          <h2 className="text-4xl font-black text-foreground mb-6 leading-tight">
            {title1}
            <br />
            <span className="text-primary">{title2}</span>
          </h2>
          <div className="space-y-4 text-foreground/50 text-base leading-relaxed">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Button
            onClick={() => scrollTo("contact")}
            className="mt-8 rounded-full px-7 py-3 h-auto font-bold text-sm"
          >
            {ctaLabel}
          </Button>
        </Reveal>

        {/* Right — skill bars */}
        <Reveal delay={200}>
          <div className="bg-card border border-border rounded-3xl p-8">
            <h3 className="text-sm font-bold text-foreground/40 uppercase tracking-widest mb-6">
              {t("about.skillsTitle")}
            </h3>
            <SkillBars items={skillItems} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
