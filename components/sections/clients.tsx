"use client"

import { useTranslation } from "react-i18next"

import siteContent from "@/lib/data/site-content.json"
import { Reveal } from "@/components/reveal"

const clientNames = [
  "BMP Network",
  "American Air HVAC",
  "Talking Shift with Craig",
  "MIOR Executive",
  "Savage Sales",
  "Outcamping",
  "Allure Creatives",
  "Procore Inc",
]

const clientStyles = [
  { initials: "BN", tagCls: "bg-primary/10 text-primary", avatarBg: "bg-navy" },
  { initials: "AA", tagCls: "bg-purple-500/10 text-purple-400", avatarBg: "bg-purple-700" },
  { initials: "TS", tagCls: "bg-teal-500/10 text-teal-400", avatarBg: "bg-teal-700" },
  { initials: "ME", tagCls: "bg-primary/10 text-primary", avatarBg: "bg-primary" },
  { initials: "SS", tagCls: "bg-blue-500/10 text-blue-400", avatarBg: "bg-blue-700" },
  { initials: "TS", tagCls: "bg-violet-500/10 text-violet-400", avatarBg: "bg-violet-700" },
  { initials: "AC", tagCls: "bg-red-500/10 text-red-400", avatarBg: "bg-red-800" },
  { initials: "PC", tagCls: "bg-slate-500/10 text-slate-400", avatarBg: "bg-slate-600" },
]

export function Clients() {
  const { t, i18n } = useTranslation()
  const items = (i18n.language === "en"
    ? siteContent.clients.items
    : t("clients.items", { returnObjects: true })) as Array<{
    name?: string
    sub: string
    desc: string
    tag: string
  }>

  return (
    <section id="clients" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">
            {t("clients.label")}
          </p>
          <h2 className="text-4xl font-black text-foreground">
            {t("clients.title")} <span className="text-primary">{t("clients.titleHighlight")}</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const style = clientStyles[i % clientStyles.length]
            const name = item.name ?? clientNames[i] ?? `Client ${i + 1}`
            return (
              <Reveal key={i} delay={i * 30}>
                <div className="card-hover bg-card border border-border rounded-2xl p-6 group h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-11 h-11 rounded-full ${style.avatarBg} flex items-center justify-center text-white text-sm font-black shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      {style.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{name}</div>
                      <div className="text-xs text-foreground/30">{item.sub}</div>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/40 leading-relaxed">{item.desc}</p>
                  <span
                    className={`inline-block mt-3 text-[10px] font-bold ${style.tagCls} px-2.5 py-1 rounded-lg`}
                  >
                    {item.tag}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
