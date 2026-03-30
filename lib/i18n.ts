import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/en.json"
import es from "./locales/es.json"
import fr from "./locales/fr.json"
import de from "./locales/de.json"
import pt from "./locales/pt.json"
import ja from "./locales/ja.json"
import ko from "./locales/ko.json"
import zh from "./locales/zh.json"
import ar from "./locales/ar.json"
import it from "./locales/it.json"

const SUPPORTED = ["en", "es", "fr", "de", "pt", "ja", "ko", "zh", "ar", "it"] as const
export type SupportedLang = (typeof SUPPORTED)[number]

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      pt: { translation: pt },
      ja: { translation: ja },
      ko: { translation: ko },
      zh: { translation: zh },
      ar: { translation: ar },
      it: { translation: it },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  })
}

export { SUPPORTED }
export default i18n
