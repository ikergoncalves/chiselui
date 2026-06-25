import { type CSSProperties } from 'react'
import './Progress.css'

export type ProgressVariant = 'linear' | 'circular'
export type ProgressSize = 'sm' | 'md' | 'lg'
export type ProgressColor = 'primary' | 'success' | 'warning' | 'danger'

export interface ProgressProps {
  /** Current progress, clamped to the 0–100 range. */
  value: number
  /** Render as a horizontal bar or an SVG ring. @default 'linear' */
  variant?: ProgressVariant
  /** Track thickness / ring diameter preset. @default 'md' */
  size?: ProgressSize
  /** Semantic color of the indicator. @default 'primary' */
  color?: ProgressColor
  /** Show the "N%" readout (beside the bar / inside the ring). @default false */
  showLabel?: boolean
  /** Custom `aria-label`. @default 'N% complete' (auto-generated). */
  label?: string
  /** Animate the linear bar with a shimmer sweep. @default false */
  animated?: boolean
}

// Diameter + stroke width (in px / SVG user units) for each circular preset.
const CIRCULAR_DIMENSIONS: Record<
  ProgressSize,
  { diameter: number; strokeWidth: number }
> = {
  sm: { diameter: 40, strokeWidth: 4 },
  md: { diameter: 56, strokeWidth: 5 },
  lg: { diameter: 72, strokeWidth: 6 },
}

/**
 * Progress — a determinate progress indicator in two shapes.
 *
 * `linear` paints a token-driven bar whose width tracks `value`; `circular`
 * draws an SVG ring whose `stroke-dashoffset` reveals the arc. Both expose the
 * standard `progressbar` ARIA contract so screen readers announce the value.
 */
export function Progress({
  value,
  variant = 'linear',
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  animated = false,
}: ProgressProps) {
  // Clamp into 0–100 so a stray value can't overflow the track or produce a
  // negative dash offset; round for the visible readout and the ARIA value.
  const clamped = Math.min(100, Math.max(0, value))
  const rounded = Math.round(clamped)
  const ariaLabel = label ?? `${rounded}% complete`

  const classNames = [
    'chs-progress',
    `chs-progress--${variant}`,
    `chs-progress--${size}`,
    `chs-progress--${color}`,
    animated && 'chs-progress--animated',
  ]
    .filter(Boolean)
    .join(' ')

  // Shared ARIA contract; lives on the progressbar element of either variant.
  const ariaProps = {
    role: 'progressbar' as const,
    'aria-valuenow': rounded,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-label': ariaLabel,
  }

  if (variant === 'circular') {
    const { diameter, strokeWidth } = CIRCULAR_DIMENSIONS[size]
    const center = diameter / 2
    const radius = (diameter - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const dashoffset = circumference * (1 - clamped / 100)

    return (
      <span className={classNames} {...ariaProps}>
        <svg
          className="chs-progress__svg"
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
          aria-hidden="true"
          focusable="false"
        >
          <circle
            className="chs-progress__track"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
          />
          <circle
            className="chs-progress__indicator"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            // Start the arc at 12 o'clock instead of the default 3 o'clock.
            transform={`rotate(-90 ${center} ${center})`}
          />
          {showLabel && (
            <text
              className="chs-progress__svg-label"
              x={center}
              y={center}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {rounded}%
            </text>
          )}
        </svg>
      </span>
    )
  }

  const barStyle: CSSProperties = { width: `${clamped}%` }

  return (
    <div className="chs-progress__linear">
      <div className={classNames} {...ariaProps}>
        <div className="chs-progress__bar" style={barStyle} />
      </div>
      {showLabel && <span className="chs-progress__value">{rounded}%</span>}
    </div>
  )
}

Progress.displayName = 'Progress'
