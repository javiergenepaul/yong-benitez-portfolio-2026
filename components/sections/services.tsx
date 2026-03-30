"use client"

import { useTranslation } from "react-i18next"
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
  const { t } = useTranslation()
  const items = t("services.items", { returnObjects: true }) as Array<{
    title: string
    desc: string
    tags: string[]
  }>

  return (
    <section id="services" className="py-24 px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">
            {t("services.label")}
          </p>
          <h2 className="text-4xl font-black text-foreground">
            {t("services.title")} <span className="shimmer-text">{t("services.titleHighlight")}</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => {
            const style = serviceStyles[i]
            return (
              <Reveal key={i} delay={i * 50}>
                <div className="card-hover bg-card border border-border rounded-2xl p-7 group cursor-default relative overflow-hidden h-full">
                  <div
                    className={`absolute inset-0 bg-linear-to-br from-transparent to-transparent ${style.gradientCls} transition-all duration-500`}
                  />
                  <div
                    className={`w-12 h-12 rounded-2xl ${style.iconBg} border flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    {style.emoji}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/40 leading-relaxed">{item.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-bold ${style.tagCls} px-2 py-0.5 rounded-md`}
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
