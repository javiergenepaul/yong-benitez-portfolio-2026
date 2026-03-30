"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"

const contactIcons = ["✉", "📍", "🟢"]
const contactLabels = ["benitezyong@gmail.com", "Philippines", "Open to projects"]
const contactSubKeys = ["emailSub", "locationSub", "availabilitySub"] as const

export function Contact() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">
            {t("contact.label")}
          </p>
          <h2 className="text-4xl font-black text-foreground mb-6">
            {t("contact.title")} <span className="text-primary">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-base text-foreground/40 leading-relaxed mb-8">
            {t("contact.description")}
          </p>
          <div className="space-y-4">
            {contactSubKeys.map((subKey, i) => (
              <div key={subKey} className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary text-base group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                  {contactIcons[i]}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{contactLabels[i]}</div>
                  <div className="text-xs text-foreground/30">{t(`contact.info.${subKey}`)}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right — form */}
        <Reveal delay={200}>
          <div className="bg-card border border-border rounded-3xl p-8">
            <div className="mb-5">
              <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">
                {t("contact.form.name")}
              </label>
              <input
                type="text"
                placeholder={t("contact.form.namePlaceholder")}
                className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-sm text-foreground placeholder-foreground/20 outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">
                {t("contact.form.email")}
              </label>
              <input
                type="email"
                placeholder={t("contact.form.emailPlaceholder")}
                className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-sm text-foreground placeholder-foreground/20 outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">
                {t("contact.form.service")}
              </label>
              <input
                type="text"
                placeholder={t("contact.form.servicePlaceholder")}
                className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-sm text-foreground placeholder-foreground/20 outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">
                {t("contact.form.message")}
              </label>
              <textarea
                rows={4}
                placeholder={t("contact.form.messagePlaceholder")}
                className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-sm text-foreground placeholder-foreground/20 outline-none focus:border-primary transition-colors resize-y"
              />
            </div>
            <Button
              onClick={() => setSent(true)}
              className={`w-full py-3.5 h-auto rounded-xl font-bold text-sm transition-colors ${
                sent ? "bg-green-600 hover:bg-green-600" : ""
              }`}
              disabled={sent}
            >
              {sent ? t("contact.sent") : t("contact.send")}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
