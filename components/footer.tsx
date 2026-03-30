"use client"

import { useTranslation } from "react-i18next"
import { LogoIcon } from "@/components/logo"
import { LinkPreview } from "@/components/ui/link-preview"
import { SparklesText } from "@/components/ui/sparkles-text"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-card border-t border-border py-10 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-2.5 mb-1">
          <LogoIcon variant="square" size={28} />
          <span className="text-xl font-black tracking-widest text-foreground">
            YONG<span className="text-primary">.</span>
          </span>
        </div>
        <div className="text-xs text-foreground/20 mb-6">{t("footer.tagline")}</div>
        <div className="flex gap-3 justify-center mb-6">
          <a
            href="https://www.linkedin.com/in/virtualassistbyyong/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-foreground text-sm font-bold"
          >
            in
          </a>
          <a
            href="mailto:benitezyong@gmail.com"
            className="w-9 h-9 rounded-full bg-white/5 border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-foreground text-sm"
          >
            ✉
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-foreground text-sm font-bold"
          >
            f
          </a>
        </div>
        <div className="text-xs text-foreground/15">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </div>
        <div className="text-xs text-foreground/25 mt-3">
          {t("footer.developedBy")}{" "}
          <LinkPreview
            url="https://paul-javier-portfolio.netlify.app/"
            className="inline-block text-foreground/40 hover:text-primary transition-colors duration-300"
          >
            <SparklesText text="Gene Paul Mar Javier" />
          </LinkPreview>
        </div>
      </div>
    </footer>
  )
}
