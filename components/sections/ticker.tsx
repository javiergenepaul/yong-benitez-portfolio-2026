"use client"

import { useTranslation } from "react-i18next"

export function Ticker() {
  const { t } = useTranslation()
  const items = t("ticker.items", { returnObjects: true }) as string[]
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-primary/20 bg-primary/10 py-4">
      <div className="flex w-max animate-ticker">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 text-sm font-bold tracking-widest whitespace-nowrap text-primary/70 uppercase">
              {item}
            </span>
            <span className="text-xs text-foreground/20">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
