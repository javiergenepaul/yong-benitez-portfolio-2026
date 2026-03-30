import { ImageResponse } from "next/og"

export const runtime     = "edge"
export const alt         = "Yong Benitez – Virtual Assistant & Content Creator"
export const size        = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  const tags = ["Video Editing", "Social Media", "Photo Editing", "Podcast Mgmt"]

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #07091a 0%, #0d1240 55%, #1e0535 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Stars — static dots for the OG image */}
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width:  i % 5 === 0 ? 3 : 2,
              height: i % 5 === 0 ? 3 : 2,
              background: "rgba(255,255,255,0.7)",
              borderRadius: "50%",
              left:  `${(i * 137.5) % 100}%`,
              top:   `${(i * 73.3) % 100}%`,
            }}
          />
        ))}

        {/* Glow orbs */}
        <div style={{
          position: "absolute",
          width: 500, height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,40,210,0.18) 0%, transparent 70%)",
          left: -100, top: -100,
        }} />
        <div style={{
          position: "absolute",
          width: 400, height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(60,100,240,0.12) 0%, transparent 70%)",
          right: -80, bottom: -80,
        }} />

        {/* Badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(168,40,210,0.18)",
          border: "1px solid rgba(192,38,211,0.45)",
          borderRadius: 100,
          padding: "8px 28px",
          marginBottom: 28,
        }}>
          <span style={{ color: "#e879f9", fontSize: 16, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Available for Freelance
          </span>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <span style={{
            fontSize: 82, fontWeight: 900, color: "#ffffff",
            letterSpacing: "-0.02em", lineHeight: 1,
          }}>
            Yong Benitez
          </span>
          <span style={{
            fontSize: 28, fontWeight: 500,
            color: "rgba(255,255,255,0.6)",
            marginTop: 16, letterSpacing: "0.01em",
          }}>
            Virtual Assistant &amp; Content Creator
          </span>
        </div>

        {/* Divider */}
        <div style={{
          width: 60, height: 3,
          background: "linear-gradient(90deg, #c026d3, #a855f7)",
          borderRadius: 4, margin: "28px 0",
        }} />

        {/* Tags */}
        <div style={{ display: "flex", gap: 12 }}>
          {tags.map((tag) => (
            <div key={tag} style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 10,
              padding: "10px 20px",
              color: "rgba(255,255,255,0.75)",
              fontSize: 17, fontWeight: 600,
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          position: "absolute", bottom: 32,
          color: "rgba(255,255,255,0.3)", fontSize: 15, letterSpacing: "0.06em",
        }}>
          yongbenitez.com
        </div>
      </div>
    ),
    { ...size },
  )
}
