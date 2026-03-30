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
        className="fixed z-[9999] w-2 h-2 rounded-full bg-primary pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[transform] duration-100 hidden md:block"
      />
      <div
        ref={ringRef}
        className="fixed z-[9998] w-8 h-8 rounded-full border-2 border-primary/50 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-[120ms] ease-out hidden md:block"
      />
    </>
  )
}
