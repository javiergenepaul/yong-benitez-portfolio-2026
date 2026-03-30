"use client"

import { useTranslation } from "react-i18next"

export function Quote() {
  const { t } = useTranslation()

  return (
    <section className="py-20 px-6 bg-primary relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-5xl font-black text-white/20 mb-4 leading-none">&ldquo;</p>
        <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          {t("quote.text")}&rdquo;
        </p>
        <p className="mt-6 text-sm text-white/60 font-semibold">{t("quote.attribution")}</p>
      </div>
    </section>
  )
}
