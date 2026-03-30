"use client"

import { useEffect, useRef } from "react"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"

const skills = [
  { label: "Video Editing", pct: 95 },
  { label: "Photo Editing", pct: 90 },
  { label: "Social Media Marketing", pct: 94 },
  { label: "Podcast Management", pct: 85 },
  { label: "Admin & VA Tasks", pct: 97 },
  { label: "Content Creation", pct: 92 },
]

function SkillBars() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>("[data-w]").forEach((bar) => {
            bar.style.width = `${bar.dataset.w}%`
          })
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="space-y-5">
      {skills.map((s) => (
        <div key={s.label}>
          <div className="flex justify-between mb-1.5">
            <span className="text-sm text-foreground/70">{s.label}</span>
            <span className="text-sm text-primary font-bold">{s.pct}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full">
            <div
              className="h-1.5 rounded-full bg-linear-to-r from-primary to-[#e879f9] transition-[width] duration-1200 ease-out"
              style={{ width: 0 }}
              data-w={s.pct}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" })
}

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">About Me</p>
          <h2 className="text-4xl font-black text-foreground mb-6 leading-tight">
            Your virtual
            <br />
            <span className="text-primary">helping hand.</span>
          </h2>
          <div className="space-y-4 text-foreground/50 text-base leading-relaxed">
            <p>
              I have over five years of experience as a dedicated freelancer and virtual
              assistant, specializing in helping businesses streamline their operations and
              improve efficiency.
            </p>
            <p>
              My core focus is{" "}
              <span className="text-foreground font-semibold">
                video editing, photo editing, and social media marketing
              </span>{" "}
              — crafting visual content that stops the scroll and builds brands online.
            </p>
            <p>
              I&apos;ve supported global clients across real estate, coaching, podcasting,
              e-commerce, and tech — delivering results with speed and creativity.
            </p>
          </div>
          <Button
            onClick={() => scrollTo("contact")}
            className="mt-8 rounded-full px-7 py-3 h-auto font-bold text-sm"
          >
            Let&apos;s collaborate →
          </Button>
        </Reveal>

        {/* Right — skill bars */}
        <Reveal delay={200}>
          <div className="bg-card border border-border rounded-3xl p-8">
            <h3 className="text-sm font-bold text-foreground/40 uppercase tracking-widest mb-6">
              Skills &amp; Proficiency
            </h3>
            <SkillBars />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
