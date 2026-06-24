import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis of the button. @default 'primary' */
  variant?: ButtonVariant
  /** Control padding and font size. @default 'md' */
  size?: ButtonSize
  /** Button label / content. */
  children: ReactNode
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
  className,
  children,
  ...rest
}: ButtonProps) {
  const classNames = [
    'chs-button',
    `chs-button--${variant}`,
    `chs-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classNames} {...rest}>
      {children}
    </button>
  )
}

Button.displayName = 'Button'
