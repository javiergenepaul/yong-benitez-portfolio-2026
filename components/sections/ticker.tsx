"use client"

import { useTranslation } from "react-i18next"

export function Ticker() {
  const { t } = useTranslation()
  const items = t("ticker.items", { returnObjects: true }) as string[]
  const doubled = [...items, ...items]

  return (
    <div className="py-4 bg-primary/10 border-y border-primary/20 overflow-hidden">
      <div className="flex animate-ticker w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 text-sm font-bold text-primary/70 tracking-widest uppercase whitespace-nowrap">
              {item}
            </span>
            <span className="text-foreground/20 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
