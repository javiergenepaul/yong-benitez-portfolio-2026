import { ImageResponse } from "next/og"

export const runtime     = "edge"
export const size        = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D0D0D",
          borderRadius: 8,
        }}
      >
        {/* Border rect */}
        <div
          style={{
            position: "absolute",
            inset: 2,
            borderRadius: 7,
            border: "1.5px solid #7c3aed",
            background: "rgba(124,58,237,0.12)",
            display: "flex",
          }}
        />
        {/* Y letter */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          style={{ position: "absolute" }}
        >
          <path d="M3 2 L9 9.5"  stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M15 2 L9 9.5" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M9 9.5 L9 16"  stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size },
  )
}
