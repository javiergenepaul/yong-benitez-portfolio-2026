"use client"

import { type RefObject, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Download, Mail, MapPin, Minus, MoonStar, Plus, Search, SunMedium, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ResumeBuilderModalProps = {
  open: boolean
  onClose: () => void
}

type ResumeTemplate = "template1" | "template2"
type ResumeBackground = "light" | "dark"

const ZOOM_STEPS = [0.75, 0.85, 1, 1.15, 1.3] as const

const COLOR_THEMES = [
  { name: "Violet", value: "#7c4dff" },
  { name: "Scarlet", value: "#ef2b5f" },
  { name: "Emerald", value: "#29c96a" },
  { name: "Sky", value: "#4f8cff" },
  { name: "Amber", value: "#e8a10d" },
  { name: "Orange", value: "#ff6b00" },
  { name: "Slate", value: "#71717a" },
] as const

const RESUME_DATA = {
  name: "Yong Benitez",
  title: "Virtual Assistant & Content Creator",
  email: "benitezyong@gmail.com",
  phone: "+63 917 000 0000",
  location: "Philippines",
  linkedin: "linkedin.com/in/virtualassistbyyong",
  website: "yongbenitez.netlify.app",
  summary:
    "Remote-first creative operator with 5+ years helping founders and teams stay visible, organized, and consistent across content, client delivery, and day-to-day operations.",
  experience: [
    {
      role: "Virtual Assistant & Social Media Manager",
      company: "Global Freelance Clients",
      period: "2021 - Present",
      body:
        "Manage calendars, create content systems, edit short-form videos, publish across social channels, and keep client workflows moving without friction.",
    },
    {
      role: "Podcast & Content Support",
      company: "Coaches and Creators",
      period: "2022 - Present",
      body:
        "Handled episode prep, asset organization, social cutdowns, and publishing support for creators who needed repeatable post-production and promotion.",
    },
    {
      role: "Creative Operations Partner",
      company: "Real Estate and Service Businesses",
      period: "2019 - 2021",
      body:
        "Delivered graphics, edited promotional videos, managed audience engagement, and supported fast-turn campaigns for teams building consistent online presence.",
    },
  ],
  strengths: [
    "Video editing",
    "Photo editing",
    "Social media strategy",
    "Content scheduling",
    "Executive support",
    "Podcast management",
  ],
  tools: ["Canva", "CapCut", "Adobe Premiere Pro", "Meta Suite", "Google Workspace", "Notion"],
  projects: [
    "Built content workflows for real estate, podcast, and coaching clients",
    "Produced short-form edits designed for reach, retention, and repurposing",
    "Supported remote teams with admin systems, publishing, and follow-through",
  ],
} as const

function getPalette(background: ResumeBackground, accent: string) {
  if (background === "light") {
    return {
      accent,
      canvas: "#efe7db",
      paper: "#fffaf2",
      panel: "#f7f0e6",
      soft: "#f3ebdf",
      text: "#172033",
      muted: "#5a6478",
      line: "rgba(23, 32, 51, 0.14)",
    }
  }

  return {
    accent,
    canvas: "#0c1325",
    paper: "#121b30",
    panel: "#18233d",
    soft: "#10182c",
    text: "#f7f3ea",
    muted: "#a1acc1",
    line: "rgba(255, 255, 255, 0.12)",
  }
}

function SectionTitle({ label, accent, line }: { label: string; accent: string; line: string }) {
  return (
    <div className="mb-3">
      <h4 className="text-[10px] font-black tracking-[0.18em] uppercase" style={{ color: accent }}>
        {label}
      </h4>
      <div className="mt-2 h-px w-full" style={{ backgroundColor: line }} />
    </div>
  )
}

function ResumePreview({
  template,
  background,
  accent,
  resumeRef,
}: {
  template: ResumeTemplate
  background: ResumeBackground
  accent: string
  resumeRef: RefObject<HTMLDivElement | null>
}) {
  const { t } = useTranslation()
  const palette = useMemo(() => getPalette(background, accent), [background, accent])

  if (template === "template1") {
    return (
      <div
        ref={resumeRef}
        className="w-198.5 min-h-280.75 overflow-hidden shadow-2xl"
        style={{ backgroundColor: palette.paper, color: palette.text }}
      >
        <div className="px-12 py-10" style={{ backgroundColor: palette.accent, color: "#fff7f1" }}>
          <h2 className="text-[42px] font-black leading-none">{RESUME_DATA.name}</h2>
          <p className="mt-3 text-[18px] font-semibold opacity-95">{RESUME_DATA.title}</p>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[12px] font-medium md:grid-cols-4">
            <span className="flex items-center gap-2"><Mail className="size-3.5" /> {RESUME_DATA.email}</span>
            <span>{RESUME_DATA.phone}</span>
            <span className="flex items-center gap-2"><MapPin className="size-3.5" /> {RESUME_DATA.location}</span>
            <span>{RESUME_DATA.linkedin}</span>
          </div>
        </div>

        <div className="grid grid-cols-[1.45fr_0.8fr] gap-0">
          <div className="px-12 py-10">
            <SectionTitle label={t("resumeBuilder.profile")} accent={palette.accent} line={palette.line} />
            <p className="text-[14px] leading-7" style={{ color: palette.muted }}>
              {RESUME_DATA.summary}
            </p>

            <div className="mt-8">
              <SectionTitle label={t("resumeBuilder.experience")} accent={palette.accent} line={palette.line} />
              <div className="space-y-6">
                {RESUME_DATA.experience.map((item) => (
                  <div key={`${item.role}-${item.company}`}>
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h5 className="text-[20px] font-black leading-tight">{item.role}</h5>
                        <p className="mt-1 text-[13px] font-semibold" style={{ color: palette.accent }}>
                          {item.company}
                        </p>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-semibold whitespace-nowrap"
                        style={{ backgroundColor: palette.soft, color: palette.accent }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-3 text-[14px] leading-7" style={{ color: palette.muted }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <SectionTitle label={t("resumeBuilder.selectedProjects")} accent={palette.accent} line={palette.line} />
              <div className="space-y-3 text-[14px] leading-7" style={{ color: palette.muted }}>
                {RESUME_DATA.projects.map((project) => (
                  <div key={project} className="flex gap-3">
                    <span className="mt-2 size-1.5 rounded-full shrink-0" style={{ backgroundColor: palette.accent }} />
                    <span>{project}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="px-10 py-10" style={{ backgroundColor: palette.panel }}>
            <SectionTitle label={t("resumeBuilder.skills")} accent={palette.accent} line={palette.line} />
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.strengths.map((strength) => (
                <span
                  key={strength}
                  className="rounded-full border px-3 py-1.5 text-[11px] font-bold"
                  style={{ borderColor: palette.line, color: palette.text, backgroundColor: palette.paper }}
                >
                  {strength}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <SectionTitle label={t("resumeBuilder.toolsLabel")} accent={palette.accent} line={palette.line} />
              <div className="space-y-3">
                {RESUME_DATA.tools.map((tool) => (
                  <div key={tool}>
                    <div className="flex items-center justify-between text-[12px] font-semibold">
                      <span>{tool}</span>
                      <span style={{ color: palette.muted }}>Advanced</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.soft }}>
                      <div className="h-full rounded-full" style={{ width: "82%", backgroundColor: palette.accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border p-5" style={{ borderColor: palette.line, backgroundColor: palette.paper }}>
              <p className="text-[10px] font-black tracking-[0.18em] uppercase" style={{ color: palette.accent }}>
                {t("resumeBuilder.contact")}
              </p>
              <div className="mt-4 space-y-3 text-[12px] font-semibold" style={{ color: palette.muted }}>
                <p>{RESUME_DATA.email}</p>
                <p>{RESUME_DATA.website}</p>
                <p>{RESUME_DATA.linkedin}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={resumeRef}
      className="grid w-198.5 min-h-280.75 grid-cols-[250px_1fr] overflow-hidden shadow-2xl"
      style={{ backgroundColor: palette.paper, color: palette.text }}
    >
      <aside className="px-8 py-10" style={{ backgroundColor: palette.panel }}>
        <div className="rounded-[28px] p-6" style={{ backgroundColor: palette.accent, color: "#fff7f1" }}>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] opacity-85">Resume</p>
          <h2 className="mt-5 text-[34px] font-black leading-none">{RESUME_DATA.name}</h2>
          <p className="mt-3 text-[14px] font-semibold leading-6 opacity-95">{RESUME_DATA.title}</p>
        </div>

        <div className="mt-8">
          <SectionTitle label={t("resumeBuilder.contact")} accent={palette.accent} line={palette.line} />
          <div className="space-y-4 text-[12px] leading-6" style={{ color: palette.muted }}>
            <p>{RESUME_DATA.email}</p>
            <p>{RESUME_DATA.phone}</p>
            <p>{RESUME_DATA.location}</p>
            <p>{RESUME_DATA.website}</p>
            <p>{RESUME_DATA.linkedin}</p>
          </div>
        </div>

        <div className="mt-8">
          <SectionTitle label={t("resumeBuilder.skills")} accent={palette.accent} line={palette.line} />
          <div className="space-y-2 text-[12px] font-semibold" style={{ color: palette.muted }}>
            {RESUME_DATA.strengths.map((strength) => (
              <div key={strength} className="rounded-2xl px-3 py-2" style={{ backgroundColor: palette.soft }}>
                {strength}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <SectionTitle label={t("resumeBuilder.toolsLabel")} accent={palette.accent} line={palette.line} />
          <div className="flex flex-wrap gap-2">
            {RESUME_DATA.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border px-3 py-1 text-[11px] font-bold"
                style={{ borderColor: palette.line, color: palette.text }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </aside>

      <div className="px-10 py-10">
        <SectionTitle label={t("resumeBuilder.profile")} accent={palette.accent} line={palette.line} />
        <p className="text-[14px] leading-7" style={{ color: palette.muted }}>
          {RESUME_DATA.summary}
        </p>

        <div className="mt-8">
          <SectionTitle label={t("resumeBuilder.experience")} accent={palette.accent} line={palette.line} />
          <div className="space-y-7">
            {RESUME_DATA.experience.map((item) => (
              <div key={`${item.role}-${item.company}`} className="grid grid-cols-[90px_1fr] gap-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: palette.accent }}>
                  {item.period}
                </div>
                <div>
                  <h5 className="text-[20px] font-black leading-tight">{item.role}</h5>
                  <p className="mt-1 text-[13px] font-semibold" style={{ color: palette.muted }}>
                    {item.company}
                  </p>
                  <p className="mt-3 text-[14px] leading-7" style={{ color: palette.muted }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <SectionTitle label={t("resumeBuilder.selectedProjects")} accent={palette.accent} line={palette.line} />
          <div className="grid gap-3 text-[14px] leading-7" style={{ color: palette.muted }}>
            {RESUME_DATA.projects.map((project) => (
              <div key={project} className="rounded-[22px] border px-4 py-4" style={{ borderColor: palette.line, backgroundColor: palette.soft }}>
                {project}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ResumeBuilderModal({ open, onClose }: ResumeBuilderModalProps) {
  const { t } = useTranslation()
  const [template, setTemplate] = useState<ResumeTemplate>("template2")
  const [background, setBackground] = useState<ResumeBackground>("dark")
  const [accent, setAccent] = useState<string>(COLOR_THEMES[0].value)
  const [zoomIndex, setZoomIndex] = useState(1)
  const [isExporting, setIsExporting] = useState(false)
  const resumeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  const zoom = ZOOM_STEPS[zoomIndex]
  const selectedTheme = COLOR_THEMES.find((item) => item.value === accent) ?? COLOR_THEMES[0]

  const exportPdf = async () => {
    if (!resumeRef.current || isExporting) return

    setIsExporting(true)
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")])
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
      })

      const image = canvas.toDataURL("image/png")
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imageHeight = (canvas.height * pageWidth) / canvas.width

      pdf.addImage(image, "PNG", 0, 0, pageWidth, Math.min(pageHeight, imageHeight), undefined, "FAST")
      pdf.save(`yong-benitez-resume-${template}.pdf`)
    } finally {
      setIsExporting(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-220 bg-black/85 px-4 py-4 backdrop-blur-md sm:px-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-builder-title"
    >
      <div
        className="mx-auto flex h-full max-w-400 flex-col overflow-hidden rounded-[28px] border border-primary/30 bg-[#101932] shadow-[0_32px_100px_rgba(0,0,0,0.45)] lg:flex-row"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex w-full flex-col border-b border-white/8 bg-[linear-gradient(180deg,rgba(239,43,95,0.06),rgba(16,25,50,0))] lg:min-h-0 lg:max-w-90 lg:border-r lg:border-b-0">
          <div className="flex shrink-0 items-start justify-between border-b border-white/8 px-6 py-5">
            <div>
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-black tracking-[0.18em] text-primary uppercase">
                {t("resumeBuilder.badge")}
              </div>
              <h2 id="resume-builder-title" className="mt-3 text-2xl font-black text-white">
                {t("resumeBuilder.title")}
              </h2>
              <p className="mt-1 max-w-70 text-sm leading-6 text-white/55">
                {t("resumeBuilder.subtitle")}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              aria-label={t("resumeBuilder.close")}
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-[calc(90vh-110px)] flex-1 space-y-5 overflow-y-auto px-6 py-6 lg:min-h-0 lg:max-h-none">
            <section className="rounded-[22px] border border-white/8 bg-[#1b1b1d]/55 p-4">
              <p className="text-[11px] font-black tracking-[0.16em] text-white/45 uppercase">
                {t("resumeBuilder.template")}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {(["template1", "template2"] as const).map((item) => {
                  const active = template === item
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTemplate(item)}
                      className={cn(
                        "rounded-[16px] border px-4 py-4 text-left transition",
                        active
                          ? "border-[#29c96a] bg-[#13261a] shadow-[0_0_0_1px_rgba(41,201,106,0.2)]"
                          : "border-white/8 bg-[#181b22] hover:border-white/15 hover:bg-[#1c2029]"
                      )}
                    >
                      <p className={cn("text-base font-black", active ? "text-[#29c96a]" : "text-white/80")}>
                        {t(`resumeBuilder.${item}`)}
                      </p>
                      <p className="mt-1 text-xs text-white/40">{t(`resumeBuilder.${item}Desc`)}</p>
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="rounded-[22px] border border-white/8 bg-[#1b1b1d]/55 p-4">
              <p className="text-[11px] font-black tracking-[0.16em] text-white/45 uppercase">
                {t("resumeBuilder.background")}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {([
                  { key: "light", icon: SunMedium },
                  { key: "dark", icon: MoonStar },
                ] as const).map(({ key, icon: Icon }) => {
                  const active = background === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setBackground(key)}
                      className={cn(
                        "rounded-[16px] border px-4 py-4 text-left transition",
                        active
                          ? "border-[#29c96a] bg-[#13261a] shadow-[0_0_0_1px_rgba(41,201,106,0.2)]"
                          : "border-white/8 bg-[#181b22] hover:border-white/15 hover:bg-[#1c2029]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={cn("size-4", active ? "text-[#29c96a]" : "text-white/50")} />
                        <p className={cn("text-base font-black", active ? "text-[#29c96a]" : "text-white/80")}>
                          {t(`resumeBuilder.${key}`)}
                        </p>
                      </div>
                      <p className="mt-2 text-xs text-white/40">{t(`resumeBuilder.${key}Desc`)}</p>
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="rounded-[22px] border border-white/8 bg-[#1b1b1d]/55 p-4">
              <div className="flex items-center gap-2">
                <div className="inline-flex size-9 items-center justify-center rounded-full bg-white/5 text-white/70">
                  <Search className="size-4" />
                </div>
                <div>
                  <p className="text-[11px] font-black tracking-[0.16em] text-white/45 uppercase">
                    {t("resumeBuilder.colorTheme")}
                  </p>
                  <p className="mt-1 text-xs text-white/35">{selectedTheme.name}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {COLOR_THEMES.map((theme) => {
                  const active = theme.value === accent
                  return (
                    <button
                      key={theme.value}
                      type="button"
                      onClick={() => setAccent(theme.value)}
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-full border transition",
                        active ? "border-white bg-white/8" : "border-transparent bg-white/3 hover:bg-white/8"
                      )}
                      aria-label={theme.name}
                    >
                      <span className="size-7 rounded-full" style={{ backgroundColor: theme.value }} />
                    </button>
                  )
                })}
              </div>
            </section>

            <Button
              onClick={exportPdf}
              className="h-12 w-full rounded-2xl bg-primary text-base font-black hover:bg-primary/90"
            >
              <Download className="size-4" />
              {isExporting ? t("resumeBuilder.exporting") : t("resumeBuilder.export")}
            </Button>

            <section className="rounded-[22px] border border-dashed border-white/10 bg-[#11182d] p-4">
              <p className="text-lg font-black text-white">{t("resumeBuilder.exportTips")}</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-white/45">
                <p>{t("resumeBuilder.tip1")}</p>
                <p>{t("resumeBuilder.tip2")}</p>
                <p>{t("resumeBuilder.tip3")}</p>
              </div>
            </section>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col bg-[#0d1630]">
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
            <div>
              <p className="text-[11px] font-black tracking-[0.16em] text-white/35 uppercase">
                {t("resumeBuilder.preview")}
              </p>
              <p className="mt-1 text-sm text-white/45">{t("resumeBuilder.previewHint")}</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#11161f] px-2 py-2 text-white/70">
              <button
                type="button"
                onClick={() => setZoomIndex((value) => Math.max(0, value - 1))}
                className="inline-flex size-8 items-center justify-center rounded-xl transition hover:bg-white/5 disabled:opacity-40"
                disabled={zoomIndex === 0}
                aria-label={t("resumeBuilder.zoomOut")}
              >
                <Minus className="size-4" />
              </button>
              <div className="inline-flex min-w-16 items-center justify-center gap-2 text-sm font-bold">
                <Search className="size-4 text-white/40" />
                {Math.round(zoom * 100)}%
              </div>
              <button
                type="button"
                onClick={() => setZoomIndex((value) => Math.min(ZOOM_STEPS.length - 1, value + 1))}
                className="inline-flex size-8 items-center justify-center rounded-xl transition hover:bg-white/5 disabled:opacity-40"
                disabled={zoomIndex === ZOOM_STEPS.length - 1}
                aria-label={t("resumeBuilder.zoomIn")}
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-10">
            <div
              className="flex min-h-full min-w-max items-start justify-center rounded-[28px] border border-white/6 p-6"
              style={{ backgroundColor: background === "dark" ? "#101828" : "#ece4d7" }}
            >
              <div style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }} className="transition-transform duration-200">
                <ResumePreview template={template} background={background} accent={accent} resumeRef={resumeRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}