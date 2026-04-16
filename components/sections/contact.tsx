"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"

const contactIcons = ["✉", "📍", "🟢"]
const contactLabels = [
  "benitezyong@gmail.com",
  "Philippines",
  "Open to projects",
]
const contactSubKeys = ["emailSub", "locationSub", "availabilitySub"] as const

export function Contact() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="bg-background px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 md:grid-cols-2">
        {/* Left */}
        <Reveal>
          <p className="mb-3 text-xs font-bold tracking-widest text-primary uppercase">
            {t("contact.label")}
          </p>
          <h2 className="mb-6 text-4xl font-black text-foreground">
            {t("contact.title")}{" "}
            <span className="text-primary">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="mb-8 text-base leading-relaxed text-foreground/40">
            {t("contact.description")}
          </p>
          <div className="space-y-4">
            {contactSubKeys.map((subKey, i) => (
              <div key={subKey} className="group flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-base text-primary transition-all group-hover:bg-primary group-hover:text-white">
                  {contactIcons[i]}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">
                    {contactLabels[i]}
                  </div>
                  <div className="text-xs text-foreground/30">
                    {t(`contact.info.${subKey}`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right — form */}
        <Reveal delay={200}>
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="mb-5">
              <label className="mb-2 block text-xs font-bold tracking-widest text-foreground/40 uppercase">
                {t("contact.form.name")}
              </label>
              <input
                type="text"
                placeholder={t("contact.form.namePlaceholder")}
                className="w-full rounded-xl border border-border bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder-foreground/20 transition-colors outline-none focus:border-primary"
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 block text-xs font-bold tracking-widest text-foreground/40 uppercase">
                {t("contact.form.email")}
              </label>
              <input
                type="email"
                placeholder={t("contact.form.emailPlaceholder")}
                className="w-full rounded-xl border border-border bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder-foreground/20 transition-colors outline-none focus:border-primary"
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 block text-xs font-bold tracking-widest text-foreground/40 uppercase">
                {t("contact.form.service")}
              </label>
              <input
                type="text"
                placeholder={t("contact.form.servicePlaceholder")}
                className="w-full rounded-xl border border-border bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder-foreground/20 transition-colors outline-none focus:border-primary"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-xs font-bold tracking-widest text-foreground/40 uppercase">
                {t("contact.form.message")}
              </label>
              <textarea
                rows={4}
                placeholder={t("contact.form.messagePlaceholder")}
                className="w-full resize-y rounded-xl border border-border bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder-foreground/20 transition-colors outline-none focus:border-primary"
              />
            </div>
            <Button
              onClick={() => setSent(true)}
              className={`h-auto w-full rounded-xl py-3.5 text-sm font-bold transition-colors ${
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
