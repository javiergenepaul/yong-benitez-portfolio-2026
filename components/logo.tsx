/**
 * LogoIcon — SVG mark for Yong Benitez VA brand
 *
 * Variants:
 *   "square"  — Y inside amber-bordered rounded square (badge). Recommended default.
 *   "circle"  — Y inside subtle ring with glowing amber node at junction.
 *   "diamond" — Y inside rotated diamond outline, clean & minimal.
 *   "raw"     — No container: white arms, amber stem + accent dot.
 *
 * Usage:
 *   <LogoIcon />                  // square, 28px
 *   <LogoIcon variant="circle" size={40} />
 */

export type LogoVariant = "square" | "circle" | "diamond" | "raw"

interface LogoIconProps {
  /** Visual style of the mark. Defaults to "square". */
  variant?: LogoVariant
  /** Width/height in px. Defaults to 28. */
  size?: number
  className?: string
}

export function LogoIcon({ variant = "square", size = 28, className }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {variant === "square" && <SquareMark />}
      {variant === "circle" && <CircleMark />}
      {variant === "diamond" && <DiamondMark />}
      {variant === "raw" && <RawMark />}
    </svg>
  )
}

/* ── Variant A: Rounded-square badge ──────────────────────────── */
function SquareMark() {
  return (
    <>
      {/* Amber-tinted rounded square */}
      <rect
        x="2" y="2" width="28" height="28" rx="8"
        fill="#c026d3" fillOpacity="0.12"
        stroke="#c026d3" strokeWidth="1.5"
      />
      {/* Y — left arm */}
      <path
        d="M 9 8 L 16 17"
        stroke="#c026d3" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Y — right arm */}
      <path
        d="M 23 8 L 16 17"
        stroke="#c026d3" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Y — stem */}
      <path
        d="M 16 17 L 16 25"
        stroke="#c026d3" strokeWidth="2.5" strokeLinecap="round"
      />
    </>
  )
}

/* ── Variant B: Circle ring with glowing node ─────────────────── */
function CircleMark() {
  return (
    <>
      {/* Subtle outer ring */}
      <circle cx="16" cy="16" r="13.5" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
      {/* Y — left arm (white) */}
      <path
        d="M 9 7 L 16 16"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Y — right arm (white) */}
      <path
        d="M 23 7 L 16 16"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Y — stem (white) */}
      <path
        d="M 16 16 L 16 25"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Amber node at junction */}
      <circle cx="16" cy="16" r="3.5" fill="#c026d3" />
      {/* White inner dot */}
      <circle cx="16" cy="16" r="1.5" fill="white" />
    </>
  )
}

/* ── Variant C: Diamond outline ───────────────────────────────── */
function DiamondMark() {
  return (
    <>
      {/* Rotated square outline */}
      <path
        d="M16 2 L30 16 L16 30 L2 16 Z"
        stroke="#c026d3" strokeWidth="1.5" fillOpacity="0"
      />
      {/* Y — left arm */}
      <path
        d="M 11 9.5 L 16 16.5"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Y — right arm */}
      <path
        d="M 21 9.5 L 16 16.5"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Y — stem */}
      <path
        d="M 16 16.5 L 16 23.5"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Accent node */}
      <circle cx="16" cy="16.5" r="2.5" fill="#c026d3" />
    </>
  )
}

/* ── Variant D: Raw / no container ───────────────────────────── */
function RawMark() {
  return (
    <>
      {/* Y — left arm (white) */}
      <path
        d="M 7 5 L 16 16"
        stroke="white" strokeWidth="3" strokeLinecap="round"
      />
      {/* Y — right arm (white) */}
      <path
        d="M 25 5 L 16 16"
        stroke="white" strokeWidth="3" strokeLinecap="round"
      />
      {/* Y — stem (amber) */}
      <path
        d="M 16 16 L 16 28"
        stroke="#c026d3" strokeWidth="3" strokeLinecap="round"
      />
      {/* Accent dot at right arm tip */}
      <circle cx="25" cy="5" r="2.5" fill="#c026d3" />
    </>
  )
}
