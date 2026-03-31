import { ImageResponse } from "next/og"

export const runtime     = "edge"
export const alt         = "Yong Benitez – Virtual Assistant & Content Creator"
export const size        = { width: 1200, height: 630 }
export const contentType = "image/png"

// Violet primary — matches oklch(0.60 0.22 280) → #7c3aed
const VIOLET = "#7c3aed"
const VIOLET_MID = "#9d6cf5"
const VIOLET_LIGHT = "#c4b5fd"

export default function Image() {
  const tags = ["Video Editing", "Social Media", "Photo Editing", "Podcast Mgmt"]

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #07091a 0%, #0d0b2a 55%, #130720 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Stars ─────────────────────────────────────────────── */}
        {[...Array(70)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width:  i % 6 === 0 ? 3 : 2,
              height: i % 6 === 0 ? 3 : 2,
              background: `rgba(255,255,255,${i % 4 === 0 ? 0.8 : 0.4})`,
              borderRadius: "50%",
              left: `${(i * 137.508) % 100}%`,
              top:  `${(i * 73.267) % 100}%`,
            }}
          />
        ))}

        {/* ── Violet glow orbs ──────────────────────────────────── */}
        <div style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${VIOLET}30 0%, transparent 68%)`,
          left: -160, top: -160,
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30,10,80,0.5) 0%, transparent 70%)",
          right: -120, bottom: -120,
        }} />

        {/* ── Large watermark Y logo (background) ───────────────── */}
        <div style={{
          position: "absolute",
          right: -20, top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 420, height: 420,
        }}>
          {/* Outer border square */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: 64,
            border: `3px solid ${VIOLET}40`,
            background: `${VIOLET}0d`,
          }} />
          {/* Y letter */}
          <svg width="220" height="220" viewBox="0 0 32 32" fill="none">
            <path d="M8 7 L16 17"  stroke={`${VIOLET}90`} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M24 7 L16 17" stroke={`${VIOLET}90`} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 17 L16 26" stroke={`${VIOLET}90`} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* ── Left content panel ────────────────────────────────── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 72,
          paddingRight: 40,
          flex: 1,
          gap: 0,
        }}>
          {/* Small logo mark + site name */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              border: `2px solid ${VIOLET}80`,
              background: `${VIOLET}20`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M8 7 L16 17"  stroke={VIOLET} strokeWidth="2.8" strokeLinecap="round" />
                <path d="M24 7 L16 17" stroke={VIOLET} strokeWidth="2.8" strokeLinecap="round" />
                <path d="M16 17 L16 26" stroke={VIOLET} strokeWidth="2.8" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 18, fontWeight: 700, letterSpacing: "0.18em" }}>
              YONG<span style={{ color: VIOLET }}>.</span>
            </span>
          </div>

          {/* Badge */}
          <div style={{
            display: "flex", alignItems: "center", alignSelf: "flex-start",
            background: `${VIOLET}28`,
            border: `1.5px solid ${VIOLET}70`,
            borderRadius: 100,
            padding: "7px 22px",
            marginBottom: 22,
          }}>
            <span style={{ color: VIOLET_LIGHT, fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Available for Freelance
            </span>
          </div>

          {/* Name */}
          <span style={{
            fontSize: 78, fontWeight: 900, color: "#ffffff",
            letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 12,
            display: "flex",
          }}>
            Yong Benitez
          </span>

          {/* Title */}
          <span style={{
            fontSize: 24, fontWeight: 500,
            color: "rgba(255,255,255,0.55)",
            marginBottom: 30, display: "flex",
          }}>
            Virtual Assistant &amp; Content Creator
          </span>

          {/* Divider */}
          <div style={{
            width: 56, height: 3,
            background: `linear-gradient(90deg, ${VIOLET}, ${VIOLET_MID})`,
            borderRadius: 4, marginBottom: 28,
            display: "flex",
          }} />

          {/* Tags */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <div key={tag} style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                padding: "8px 16px",
                color: "rgba(255,255,255,0.7)",
                fontSize: 15, fontWeight: 600,
                display: "flex",
              }}>
                {tag}
              </div>
            ))}
          </div>

          {/* URL */}
          <span style={{
            marginTop: 36,
            color: "rgba(255,255,255,0.25)", fontSize: 14, letterSpacing: "0.08em",
            display: "flex",
          }}>
            yongbenitez.netlify.app
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
