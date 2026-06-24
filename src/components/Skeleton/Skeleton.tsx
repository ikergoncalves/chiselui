import { type CSSProperties, type HTMLAttributes } from 'react'
import './Skeleton.css'

export type SkeletonVariant = 'text' | 'circular' | 'rectangular'

export interface SkeletonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** CSS width. A number is treated as pixels. */
  width?: string | number
  /** CSS height. A number is treated as pixels. */
  height?: string | number
  /** Shape of the placeholder. @default 'text' */
  variant?: SkeletonVariant
  /** Number of stacked lines for the `text` variant. @default 1 */
  lines?: number
  /** Toggle the shimmer animation. @default true */
  animated?: boolean
}

// Numbers become pixels; strings (e.g. '70%', '2rem') pass through untouched.
function toCssSize(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

/**
 * Skeleton — a token-driven loading placeholder.
 *
 * Renders a single shimmering block, or—for the `text` variant with `lines > 1`
 * —a stack of lines whose last row is shortened to mimic a real paragraph.
 */
export function Skeleton({
  width,
  height,
  variant = 'text',
  lines = 1,
  animated = true,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const classNames = [
    'chs-skeleton',
    `chs-skeleton--${variant}`,
    animated && 'chs-skeleton--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (variant === 'text' && lines > 1) {
    return (
      <div className="chs-skeleton-group" {...rest}>
        {Array.from({ length: lines }, (_, index) => {
          // Last line is shortened to 70% so the block reads like ragged text.
          const isLast = index === lines - 1
          const lineStyle: CSSProperties = {
            width: isLast ? '70%' : toCssSize(width),
            height: toCssSize(height),
            ...style,
          }
          return (
            <span key={index} className={classNames} style={lineStyle} aria-hidden="true" />
          )
        })}
      </div>
    )
  }

  // A circle needs equal sides, so fall back to `width` when `height` is omitted.
  // border-radius is set inline (not just in CSS) so the shape holds even before
  // the stylesheet loads and stays assertable in tests.
  const singleStyle: CSSProperties = {
    width: toCssSize(width),
    height: toCssSize(variant === 'circular' && height === undefined ? width : height),
    ...(variant === 'circular' ? { borderRadius: '50%' } : null),
    ...style,
  }

  return (
    <span className={classNames} style={singleStyle} aria-hidden="true" {...rest} />
  )
}

Skeleton.displayName = 'Skeleton'
