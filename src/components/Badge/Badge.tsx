import { type HTMLAttributes, type ReactNode } from 'react'
import './Badge.css'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color of the badge. @default 'default' */
  variant?: BadgeVariant
  /** Control padding and font size. @default 'md' */
  size?: BadgeSize
  /** Render a status dot before the label. @default false */
  dot?: boolean
  /** Badge label / content. */
  children: ReactNode
}

/**
 * Badge — a compact status / category label.
 *
 * Colors are driven by component-scoped custom properties (see Badge.css) so a
 * single class swap recolors both the surface and the optional status dot.
 */
export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  const classNames = [
    'chs-badge',
    `chs-badge--${variant}`,
    `chs-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classNames} {...rest}>
      {dot && <span className="chs-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  )
}

Badge.displayName = 'Badge'
