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
  "Del Rosario and Zamora Law",
  "Coach Me Laura",
  "Life is the Game",
  "Inside Sales",
  "D'Freight VA",
  "Bird-Dog Solutions",
  "FAMILY-FRIENDLY Tampa Bay",
  "IFLYFLAT",
  "Varsity Sweater",
]

const clientStyles = [
  { initials: "BN", tagCls: "bg-primary/10 text-primary", avatarBg: "bg-navy" },
  {
    initials: "AA",
    tagCls: "bg-purple-500/10 text-purple-400",
    avatarBg: "bg-purple-700",
  },
  {
    initials: "TS",
    tagCls: "bg-teal-500/10 text-teal-400",
    avatarBg: "bg-teal-700",
  },
  {
    initials: "ME",
    tagCls: "bg-primary/10 text-primary",
    avatarBg: "bg-primary",
  },
  {
    initials: "SS",
    tagCls: "bg-blue-500/10 text-blue-400",
    avatarBg: "bg-blue-700",
  },
  {
    initials: "TS",
    tagCls: "bg-violet-500/10 text-violet-400",
    avatarBg: "bg-violet-700",
  },
  {
    initials: "AC",
    tagCls: "bg-red-500/10 text-red-400",
    avatarBg: "bg-red-800",
  },
  {
    initials: "PC",
    tagCls: "bg-slate-500/10 text-slate-400",
    avatarBg: "bg-slate-600",
  },
  {
    initials: "DZ",
    tagCls: "bg-orange-500/10 text-orange-400",
    avatarBg: "bg-orange-700",
  },
  {
    initials: "CL",
    tagCls: "bg-pink-500/10 text-pink-400",
    avatarBg: "bg-pink-700",
  },
  {
    initials: "LG",
    tagCls: "bg-emerald-500/10 text-emerald-400",
    avatarBg: "bg-emerald-700",
  },
  {
    initials: "IS",
    tagCls: "bg-yellow-500/10 text-yellow-400",
    avatarBg: "bg-yellow-700",
  },
  {
    initials: "DF",
    tagCls: "bg-cyan-500/10 text-cyan-400",
    avatarBg: "bg-cyan-700",
  },
  {
    initials: "BD",
    tagCls: "bg-indigo-500/10 text-indigo-400",
    avatarBg: "bg-indigo-700",
  },
  {
    initials: "FF",
    tagCls: "bg-rose-500/10 text-rose-400",
    avatarBg: "bg-rose-700",
  },
  {
    initials: "IF",
    tagCls: "bg-amber-500/10 text-amber-400",
    avatarBg: "bg-amber-700",
  },
  {
    initials: "VS",
    tagCls: "bg-lime-500/10 text-lime-400",
    avatarBg: "bg-lime-700",
  },
]

export function Clients() {
  const { t, i18n } = useTranslation()
  const items = (
    i18n.language === "en"
      ? siteContent.clients.items
      : t("clients.items", { returnObjects: true })
  ) as Array<{
    name?: string
    sub: string
    desc: string
    tag: string
  }>

  return (
    <section id="clients" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16">
          <p className="mb-3 text-xs font-bold tracking-widest text-primary uppercase">
            {t("clients.label")}
          </p>
          <h2 className="text-4xl font-black text-foreground">
            {t("clients.title")}{" "}
            <span className="text-primary">{t("clients.titleHighlight")}</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const style = clientStyles[i % clientStyles.length]
            const name = item.name ?? clientNames[i] ?? `Client ${i + 1}`
            return (
              <Reveal key={i} delay={i * 30}>
                <div className="card-hover group h-full rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className={`h-11 w-11 rounded-full ${style.avatarBg} flex shrink-0 items-center justify-center text-sm font-black text-white transition-transform group-hover:scale-110`}
                    >
                      {style.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">
                        {name}
                      </div>
                      <div className="text-xs text-foreground/30">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-foreground/40">
                    {item.desc}
                  </p>
                  <span
                    className={`mt-3 inline-block text-[10px] font-bold ${style.tagCls} rounded-lg px-2.5 py-1`}
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
