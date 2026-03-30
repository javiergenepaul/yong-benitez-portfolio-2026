"use client"

import { useEffect } from "react"
import { I18nextProvider } from "react-i18next"
import i18n, { SUPPORTED } from "@/lib/i18n"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Restore saved language after hydration to avoid SSR mismatch
    const saved = localStorage.getItem("yong_lang")
    const detected = navigator.language.split("-")[0]
    const lang = (SUPPORTED as readonly string[]).includes(saved ?? "")
      ? saved!
      : (SUPPORTED as readonly string[]).includes(detected)
        ? detected
        : "en"
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang)
    }
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
