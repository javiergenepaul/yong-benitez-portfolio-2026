"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import GB from "country-flag-icons/react/3x2/GB"
import ES from "country-flag-icons/react/3x2/ES"
import FR from "country-flag-icons/react/3x2/FR"
import DE from "country-flag-icons/react/3x2/DE"
import BR from "country-flag-icons/react/3x2/BR"
import JP from "country-flag-icons/react/3x2/JP"
import KR from "country-flag-icons/react/3x2/KR"
import CN from "country-flag-icons/react/3x2/CN"
import SA from "country-flag-icons/react/3x2/SA"
import IT from "country-flag-icons/react/3x2/IT"

const languages = [
  { code: "en", label: "English", Flag: GB },
  { code: "es", label: "Español", Flag: ES },
  { code: "fr", label: "Français", Flag: FR },
  { code: "de", label: "Deutsch", Flag: DE },
  { code: "pt", label: "Português", Flag: BR },
  { code: "ja", label: "日本語", Flag: JP },
  { code: "ko", label: "한국어", Flag: KR },
  { code: "zh", label: "中文", Flag: CN },
  { code: "ar", label: "العربية", Flag: SA },
  { code: "it", label: "Italiano", Flag: IT },
]

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onOutsideClick)
    return () => document.removeEventListener("mousedown", onOutsideClick)
  }, [open])

  if (!mounted) return <div className="h-9 w-9" />

  const current =
    languages.find((l) => l.code === i18n.language) ?? languages[0]
  const CurrentFlag = current.Flag

  function switchLang(code: string) {
    i18n.changeLanguage(code)
    localStorage.setItem("yong_lang", code)
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr"
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger — SVG flag, same size as ThemeToggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border transition-all duration-300 hover:border-primary"
      >
        <CurrentFlag className="h-auto w-5" />
      </button>

      {open && (
        <div className="absolute top-11 right-0 z-100 w-48 overflow-hidden rounded-2xl border border-border bg-card py-1.5 shadow-xl">
          {languages.map(({ code, label, Flag }) => {
            const isActive = code === i18n.language
            return (
              <button
                key={code}
                onClick={() => switchLang(code)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-primary/10 ${
                  isActive ? "font-bold text-primary" : "text-foreground/60"
                }`}
              >
                <Flag className="h-auto w-5 shrink-0 rounded-sm" />
                <span className="flex-1 text-start">{label}</span>
                {isActive && <span className="text-xs text-primary">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
