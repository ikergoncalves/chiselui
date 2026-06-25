import './Spinner.css'

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SpinnerColor = 'primary' | 'white' | 'current'

export interface SpinnerProps {
  /** Diameter preset of the spinner. @default 'md' */
  size?: SpinnerSize
  /** Accessible text announced by screen readers. @default 'Loading...' */
  label?: string
  /**
   * Stroke color source.
   * - `primary` uses `--color-primary`
   * - `white` uses `#ffffff` (for dark surfaces)
   * - `current` inherits `currentColor` from the parent
   * @default 'primary'
   */
  color?: SpinnerColor
}

/**
 * Spinner — an indeterminate loading indicator.
 *
 * Hand-rolled SVG + a pure CSS animation, so it ships with zero runtime deps.
 * A full-circle track sits under a partial arc; rotating the whole SVG spins the
 * arc around the track. The accessible name is carried by `role="status"` +
 * `aria-label`, so the decorative SVG is hidden from assistive tech.
 */
export function Spinner({
  size = 'md',
  label = 'Loading...',
  color = 'primary',
}: SpinnerProps) {
  const classNames = [
    'chs-spinner',
    `chs-spinner--${size}`,
    `chs-spinner--${color}`,
  ].join(' ')

  return (
    <span className={classNames} role="status" aria-label={label}>
      <svg
        className="chs-spinner__svg"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <circle className="chs-spinner__track" cx="12" cy="12" r="9" strokeWidth="3" />
        <circle
          className="chs-spinner__arc"
          cx="12"
          cy="12"
          r="9"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

Spinner.displayName = 'Spinner'
