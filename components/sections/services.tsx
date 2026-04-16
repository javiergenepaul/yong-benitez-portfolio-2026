"use client"

import { useTranslation } from "react-i18next"

import siteContent from "@/lib/data/site-content.json"
import { Reveal } from "@/components/reveal"

const serviceStyles = [
  {
    emoji: "🎬",
    tagCls: "bg-primary/10 text-primary",
    gradientCls: "group-hover:from-primary/5",
    iconBg: "bg-primary/10 border-primary/20",
    iconCls: "text-primary",
  },
  {
    emoji: "📸",
    tagCls: "bg-purple-500/10 text-purple-400",
    gradientCls: "group-hover:from-purple-500/5",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    iconCls: "text-purple-400",
  },
  {
    emoji: "📱",
    tagCls: "bg-blue-500/10 text-blue-400",
    gradientCls: "group-hover:from-blue-500/5",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconCls: "text-blue-400",
  },
  {
    emoji: "🎙️",
    tagCls: "bg-green-500/10 text-green-400",
    gradientCls: "group-hover:from-green-500/5",
    iconBg: "bg-green-500/10 border-green-500/20",
    iconCls: "text-green-400",
  },
]

export function Services() {
  const { t, i18n } = useTranslation()
  const items = (
    i18n.language === "en"
      ? siteContent.services.items
      : t("services.items", { returnObjects: true })
  ) as Array<{
    title: string
    desc: string
    tags: string[]
  }>

  return (
    <section id="services" className="bg-surface-alt px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold tracking-widest text-primary uppercase">
            {t("services.label")}
          </p>
          <h2 className="text-4xl font-black text-foreground">
            {t("services.title")}{" "}
            <span className="shimmer-text">{t("services.titleHighlight")}</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const style = serviceStyles[i]
            return (
              <Reveal key={i} delay={i * 50}>
                <div className="card-hover group relative h-full cursor-default overflow-hidden rounded-2xl border border-border bg-card p-7">
                  <div
                    className={`absolute inset-0 bg-linear-to-br from-transparent to-transparent ${style.gradientCls} transition-all duration-500`}
                  />
                  <div
                    className={`h-12 w-12 rounded-2xl ${style.iconBg} mb-5 flex items-center justify-center border text-2xl transition-transform duration-300 group-hover:scale-110`}
                  >
                    {style.emoji}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/40">
                    {item.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-bold ${style.tagCls} rounded-md px-2 py-0.5`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
