"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useTranslation } from "react-i18next"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoIcon } from "@/components/logo"
import { LanguageSelector } from "@/components/language-selector"

function scrollTo(id: string) {
  const el = document.getElementById(id.replace("#", ""))
  if (el)
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 70,
      behavior: "smooth",
    })
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-9 h-9" />

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-all duration-300"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

export function Nav() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const links = [
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.services") },
    { href: "#works", label: t("nav.works") },
    { href: "#clients", label: t("nav.clients") },
    { href: "#contact", label: t("nav.contact") },
  ]

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [menuOpen])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    scrollTo(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <LogoIcon variant="square" size={32} />
          <span className="text-lg font-black tracking-widest text-foreground group-hover:text-primary transition-colors duration-300">
            YONG<span className="text-primary">.</span>
          </span>
        </button>

        {/* Desktop nav links — visible at lg+ */}
        <ul className="hidden lg:flex gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className="text-sm text-foreground/50 hover:text-foreground transition-colors duration-300 cursor-pointer"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
          {/* Hire Me — hidden on small screens */}
          <Button
            onClick={() => scrollTo("#contact")}
            className="hidden sm:inline-flex animate-glow-pulse rounded-full text-sm font-bold px-5"
          >
            {t("nav.hireMe")}
          </Button>
          {/* Hamburger — visible below lg */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-all duration-300"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1"
        >
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNavClick(l.href)}
              className="text-sm text-foreground/60 hover:text-foreground py-2.5 text-start transition-colors duration-200 border-b border-border/40 last:border-0"
            >
              {l.label}
            </button>
          ))}
          {/* Hire Me inside mobile menu */}
          <Button
            onClick={() => handleNavClick("#contact")}
            className="mt-2 w-full rounded-full text-sm font-bold sm:hidden"
          >
            {t("nav.hireMe")}
          </Button>
        </div>
      )}
    </nav>
  )
}
