"use client"

import { useTranslation } from "react-i18next"
import { LogoIcon } from "@/components/logo"
import { LinkPreview } from "@/components/ui/link-preview"
import { SparklesText } from "@/components/ui/sparkles-text"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border bg-card px-6 py-10 text-center">
      <div className="mx-auto max-w-6xl">
        <div className="mb-1 flex items-center justify-center gap-2.5">
          <LogoIcon variant="square" size={28} />
          <span className="text-xl font-black tracking-widest text-foreground">
            YONG<span className="text-primary">.</span>
          </span>
        </div>
        <div className="mb-6 text-xs text-foreground/20">
          {t("footer.tagline")}
        </div>
        <div className="mb-6 flex justify-center gap-3">
          <a
            href="https://www.linkedin.com/in/virtualassistbyyong/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/5 text-sm font-bold text-foreground transition-all hover:border-primary hover:bg-primary"
          >
            in
          </a>
          <a
            href="mailto:benitezyong@gmail.com"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/5 text-sm text-foreground transition-all hover:border-primary hover:bg-primary"
          >
            ✉
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/5 text-sm font-bold text-foreground transition-all hover:border-primary hover:bg-primary"
          >
            f
          </a>
        </div>
        <div className="text-xs text-foreground/15">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </div>
        <div className="mt-3 text-xs text-foreground/25">
          {t("footer.developedBy")}{" "}
          <LinkPreview
            url="https://paul-javier-portfolio.netlify.app/"
            className="inline-block text-foreground/40 transition-colors duration-300 hover:text-primary"
          >
            <SparklesText text="Gene Paul Mar Javier" />
          </LinkPreview>
        </div>
      </div>
    </footer>
  )
}
