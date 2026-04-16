"use client"

import { useEffect, useRef } from "react"

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const move = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
      ring.style.left = `${e.clientX}px`
      ring.style.top = `${e.clientY}px`
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-[transform] duration-100 md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/50 transition-[left,top] duration-[120ms] ease-out md:block"
      />
    </>
  )
}
