import { type ReactNode } from 'react'
import './Breadcrumb.css'

export interface BreadcrumbItem {
  /** Visible label for the crumb. */
  label: string
  /** Navigation target; renders the crumb as an anchor. */
  href?: string
  /** Click handler; renders the crumb as a button when there is no `href`. */
  onClick?: () => void
}

export interface BreadcrumbProps {
  /** The trail, from root (first) to current page (last). */
  items: BreadcrumbItem[]
  /** Node placed between crumbs. @default '/' */
  separator?: ReactNode
  /**
   * Cap on visible crumbs. When `items.length` exceeds it the middle collapses
   * to an ellipsis, keeping the first crumb and the last two.
   */
  maxItems?: number
}

// A rendered slot: either a real crumb (carrying its original index so we can
// tell which one is the current page) or the collapsed ellipsis placeholder.
type Entry =
  | { type: 'item'; item: BreadcrumbItem; index: number }
  | { type: 'ellipsis' }

/**
 * Breadcrumb — hierarchical navigation following the WAI-ARIA breadcrumb pattern:
 * a `<nav aria-label="Breadcrumb">` wrapping an ordered list, with the final crumb
 * marked `aria-current="page"`.
 *
 * Each crumb picks its element from its data: `href` → `<a>`, `onClick` only →
 * `<button>`, neither → plain `<span>`. The last crumb is always a `<span>` since
 * it represents the page you are already on. When `maxItems` is exceeded the middle
 * collapses to a single ellipsis (labelled "more items"), always preserving the
 * first crumb and the final two.
 */
export function Breadcrumb({ items, separator = '/', maxItems }: BreadcrumbProps) {
  const shouldCollapse = maxItems !== undefined && items.length > maxItems

  let entries: Entry[]
  if (shouldCollapse) {
    // Collapse to: [first] … [second-to-last] [last]. The conditional spreads keep
    // TypeScript's `noUncheckedIndexedAccess` happy without losing readability.
    const first = items[0]
    const secondLast = items[items.length - 2]
    const last = items[items.length - 1]
    entries = [
      ...(first ? [{ type: 'item' as const, item: first, index: 0 }] : []),
      { type: 'ellipsis' as const },
      ...(secondLast
        ? [{ type: 'item' as const, item: secondLast, index: items.length - 2 }]
        : []),
      ...(last ? [{ type: 'item' as const, item: last, index: items.length - 1 }] : []),
    ]
  } else {
    entries = items.map((item, index) => ({ type: 'item', item, index }))
  }

  const renderContent = (entry: Entry): ReactNode => {
    if (entry.type === 'ellipsis') {
      return (
        <span className="chs-breadcrumb__ellipsis" aria-label="more items">
          …
        </span>
      )
    }

    const { item, index } = entry
    const isLast = index === items.length - 1

    if (isLast) {
      return (
        <span className="chs-breadcrumb__current" aria-current="page">
          {item.label}
        </span>
      )
    }
    if (item.href) {
      return (
        <a className="chs-breadcrumb__link" href={item.href} onClick={item.onClick}>
          {item.label}
        </a>
      )
    }
    if (item.onClick) {
      return (
        <button
          type="button"
          className="chs-breadcrumb__button"
          onClick={item.onClick}
        >
          {item.label}
        </button>
      )
    }
    return <span className="chs-breadcrumb__text">{item.label}</span>
  }

  return (
    <nav className="chs-breadcrumb" aria-label="Breadcrumb">
      <ol className="chs-breadcrumb__list">
        {entries.map((entry, i) => {
          const key = entry.type === 'ellipsis' ? `ellipsis-${i}` : entry.index
          return (
            <li key={key} className="chs-breadcrumb__item">
              {/* Separator sits between crumbs only — never before the first. */}
              {i > 0 && (
                <span className="chs-breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
              {renderContent(entry)}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
