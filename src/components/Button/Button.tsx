import { type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis of the button. @default 'primary' */
  variant?: ButtonVariant
  /** Control padding and font size. @default 'md' */
  size?: ButtonSize
  /** Show an inline spinner and block interaction. @default false */
  loading?: boolean
  /** Element rendered before the label (hidden while loading). */
  leftIcon?: ReactNode
  /** Element rendered after the label (hidden while loading). */
  rightIcon?: ReactNode
  /** Button label / content. */
  children: ReactNode
}

// Inline spinner. I keep this as a hand-rolled SVG with a CSS animation instead
// of pulling an icon dependency, so the loading state ships with zero runtime.
function Spinner() {
  return (
    <svg
      className="chs-button__spinner"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="42"
        strokeDashoffset="14"
      />
    </svg>
  )
}

/**
 * Button — the canonical chiselui action element.
 *
 * Styled entirely through design tokens (CSS custom properties), so it adapts
 * automatically to any theme that overrides the `--color-*` / `--space-*` vars.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  const classNames = [
    'chs-button',
    `chs-button--${variant}`,
    `chs-button--${size}`,
    loading && 'chs-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // A loading button is `disabled` at the DOM level so it can't be clicked or
  // focused, but I also short-circuit onClick here: this makes the contract
  // "onClick never fires while loading" explicit and survives a consumer who
  // toggles `loading` without also wiring up `disabled`.
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={handleClick}
      {...rest}
    >
      {loading ? (
        <Spinner />
      ) : (
        leftIcon && <span className="chs-button__icon">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && <span className="chs-button__icon">{rightIcon}</span>}
    </button>
  )
}

Button.displayName = 'Button'
