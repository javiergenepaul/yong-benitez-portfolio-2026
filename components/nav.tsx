"use client"

import { Button } from "@/components/ui/button"
import { LogoIcon } from "@/components/logo"

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#works", label: "Works" },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" },
]

function scrollTo(id: string) {
  const el = document.getElementById(id.replace("#", ""))
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" })
}

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
        >
          <LogoIcon variant="square" size={32} />
          <span className="text-lg font-black tracking-widest text-foreground group-hover:text-primary transition-colors duration-300">
            YONG<span className="text-primary">.</span>
          </span>
        </button>

        <ul className="hidden md:flex gap-8 list-none">
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

        <Button
          onClick={() => scrollTo("#contact")}
          className="animate-glow-pulse rounded-full text-sm font-bold px-5"
        >
          Hire Me
        </Button>
      </div>
    </nav>
  )
}
