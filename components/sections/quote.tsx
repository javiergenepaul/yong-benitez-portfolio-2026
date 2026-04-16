"use client"

import { useTranslation } from "react-i18next"

import siteContent from "@/lib/data/site-content.json"

export function Quote() {
  const { t, i18n } = useTranslation()
  const text = i18n.language === "en" ? siteContent.quote.text : t("quote.text")
  const attribution =
    i18n.language === "en"
      ? siteContent.quote.attribution
      : t("quote.attribution")

  return (
    <section className="relative overflow-hidden bg-primary px-6 py-20">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-4 text-5xl leading-none font-black text-white/20">
          &ldquo;
        </p>
        <p className="text-xl leading-relaxed font-bold text-white md:text-2xl">
          {text}&rdquo;
        </p>
        <p className="mt-6 text-sm font-semibold text-white/60">
          {attribution}
        </p>
      </div>
    </section>
  )
}
