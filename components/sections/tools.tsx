"use client"

import {
  SiAsana,
  SiElevenlabs,
  SiGoogle,
  SiHootsuite,
  SiLoom,
  SiNotion,
  SiZoom,
} from "@icons-pack/react-simple-icons"
import {
  Bot,
  Globe,
  LayoutTemplate,
  Mic2,
  Palette,
  RotateCcw,
  Scissors,
  Share2,
  Star,
  Users,
} from "lucide-react"
import { useTranslation } from "react-i18next"

import { Reveal } from "@/components/reveal"

type ToolIcon = React.ComponentType<{ className?: string }>

// 17 unique tools — each row duplicates its own slice for a seamless infinite loop
const allTools: { name: string; icon: ToolIcon; cls: string }[] = [
  {
    name: "Google Workspace",
    icon: SiGoogle,
    cls: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  },
  {
    name: "Canva",
    icon: Palette,
    cls: "bg-primary/15 text-primary border-primary/25",
  },
  {
    name: "CapCut",
    icon: Scissors,
    cls: "bg-neutral-500/15 text-neutral-300 border-neutral-500/25",
  },
  {
    name: "Notion",
    icon: SiNotion,
    cls: "bg-slate-500/15 text-slate-300 border-slate-500/25",
  },
  {
    name: "Hootsuite",
    icon: SiHootsuite,
    cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  },
  {
    name: "Vista Social",
    icon: Share2,
    cls: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  },
  {
    name: "Only Social",
    icon: Users,
    cls: "bg-pink-500/15 text-pink-400 border-pink-500/25",
  },
  {
    name: "Zoom",
    icon: SiZoom,
    cls: "bg-blue-600/15 text-blue-300 border-blue-600/25",
  },
  {
    name: "Loom",
    icon: SiLoom,
    cls: "bg-red-500/15 text-red-400 border-red-500/25",
  },
  {
    name: "Asana",
    icon: SiAsana,
    cls: "bg-pink-600/15 text-pink-300 border-pink-600/25",
  },
  {
    name: "Reviocer",
    icon: RotateCcw,
    cls: "bg-green-500/15 text-green-400 border-green-500/25",
  },
  {
    name: "Phonesites",
    icon: Globe,
    cls: "bg-teal-500/15 text-teal-400 border-teal-500/25",
  },
  {
    name: "Adobe Podcast",
    icon: Mic2,
    cls: "bg-red-600/15 text-red-300 border-red-600/25",
  },
  {
    name: "ElevenLabs",
    icon: SiElevenlabs,
    cls: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  },
  {
    name: "Pipio",
    icon: Bot,
    cls: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  },
  {
    name: "ContentPresso",
    icon: LayoutTemplate,
    cls: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  },
  {
    name: "Review Mgmt",
    icon: Star,
    cls: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  },
]

// Split into two rows; each is rendered as [slice, slice] so the animation loop is seamless
const rowA = allTools.slice(0, 9) // 9 tools  → duplicated = 18 items, loop at index 9
const rowB = allTools.slice(9) // 8 tools  → duplicated = 16 items, loop at index 8

function ToolChip({
  name,
  icon: Icon,
  cls,
}: {
  name: string
  icon: ToolIcon
  cls: string
}) {
  return (
    <div className="group mx-2 flex shrink-0 cursor-default items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 transition-colors duration-300 hover:border-primary/40">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-lg border ${cls}`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm font-semibold whitespace-nowrap text-foreground/60 transition-colors duration-300 group-hover:text-foreground">
        {name}
      </span>
    </div>
  )
}

export function Tools() {
  const { t } = useTranslation()

  return (
    <section className="overflow-hidden bg-surface-alt py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14">
          <p className="mb-3 text-xs font-bold tracking-widest text-primary uppercase">
            {t("tools.label")}
          </p>
          <h2 className="text-4xl font-black text-foreground">
            {t("tools.title")}{" "}
            <span className="shimmer-text">{t("tools.titleHighlight")}</span>
          </h2>
          <p className="mt-2 text-sm text-foreground/40">
            {t("tools.subtitle")}
          </p>
        </Reveal>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-3 flex w-max animate-ticker">
        {[...rowA, ...rowA].map((tool, i) => (
          <ToolChip key={i} {...tool} />
        ))}
      </div>

      {/* Row 2 — scrolls right (same animation, reversed direction) */}
      <div
        className="flex w-max animate-ticker"
        style={{ animationDirection: "reverse" }}
      >
        {[...rowB, ...rowB].map((tool, i) => (
          <ToolChip key={i} {...tool} />
        ))}
      </div>
    </section>
  )
}
