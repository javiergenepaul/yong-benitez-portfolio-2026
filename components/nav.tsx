"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useTranslation } from "react-i18next"
import { Moon, Sun, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
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

  if (!mounted) return <div className="h-9 w-9" />

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-all duration-300 hover:border-primary hover:text-primary"
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
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [menuOpen])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    scrollTo(href)
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <LogoIcon variant="square" size={32} />
          <span className="text-lg font-black tracking-widest text-foreground transition-colors duration-300 group-hover:text-primary">
            YONG<span className="text-primary">.</span>
          </span>
        </button>

        {/* Desktop nav links — visible at lg+ */}
        <ul className="hidden list-none gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className="cursor-pointer text-sm text-foreground/50 transition-colors duration-300 hover:text-foreground"
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
            className="hidden animate-glow-pulse rounded-full px-5 text-sm font-bold sm:inline-flex"
          >
            {t("nav.hireMe")}
          </Button>
          {/* Hamburger — visible below lg */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-all duration-300 hover:border-primary hover:text-primary lg:hidden"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
            className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              className="flex flex-col gap-1 px-6 py-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.055, delayChildren: 0.08 },
                },
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 },
                },
              }}
            >
              {links.map((l) => (
                <motion.button
                  key={l.href}
                  onClick={() => handleNavClick(l.href)}
                  className="border-b border-border/40 py-2.5 text-start text-sm text-foreground/60 transition-colors duration-200 last:border-0 hover:text-foreground"
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -14 },
                  }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  {l.label}
                </motion.button>
              ))}
              {/* Hire Me inside mobile menu */}
              <motion.div
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -14 },
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <Button
                  onClick={() => handleNavClick("#contact")}
                  className="mt-2 w-full rounded-full text-sm font-bold sm:hidden"
                >
                  {t("nav.hireMe")}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
