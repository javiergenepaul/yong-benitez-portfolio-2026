"use client"

/**
 * SparklesText — Aceternity UI
 * Renders text with randomised sparkle particles animating around it.
 *
 * Usage:
 *   <SparklesText text="Hello" />
 *   <SparklesText text="Hello" colors={{ first: "#C97D4A", second: "#fff" }} sparklesCount={8} />
 */

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface Sparkle {
  id: string
  x: string
  y: string
  color: string
  scale: number
}

interface SparklesTextProps {
  text: string
  className?: string
  /** Number of sparkles visible at once. */
  sparklesCount?: number
  /** Two colours that sparkles alternate between. */
  colors?: { first: string; second: string }
}

function SparkleIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <path
        d="M80 7C80 7 84.2846 45.2987 101.496 62.5C118.707 79.7013 157 84 157 84C157 84 118.707 88.2987 101.496 105.5C84.2846 122.701 80 161 80 161C80 161 75.7154 122.701 58.504 105.5C41.2926 88.2987 3 84 3 84C3 84 41.2926 79.7013 58.504 62.5C75.7154 45.2987 80 7 80 7Z"
        fill={color}
      />
    </svg>
  )
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

function generateSparkle(colors: { first: string; second: string }): Sparkle {
  return {
    id: `${Date.now()}-${rand(0, 9999)}`,
    x: `${rand(-10, 110)}%`,
    y: `${rand(-10, 110)}%`,
    color: Math.random() > 0.5 ? colors.first : colors.second,
    scale: rand(4, 10) / 10,
  }
}

export function SparklesText({
  text,
  className,
  sparklesCount = 6,
  colors = { first: "#C97D4A", second: "#ffffff" },
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const next = [...prev.slice(-(sparklesCount - 1)), generateSparkle(colors)]
        return next
      })
    }, 300)
    return () => clearInterval(interval)
  }, [sparklesCount, colors])

  return (
    <span className={cn("relative inline-block", className)}>
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            className="pointer-events-none absolute z-20"
            style={{ left: s.x, top: s.y, transform: "translate(-50%, -50%)" }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: s.scale, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SparkleIcon size={14} color={s.color} />
          </motion.span>
        ))}
      </AnimatePresence>
      <span className="relative z-10">{text}</span>
    </span>
  )
}
