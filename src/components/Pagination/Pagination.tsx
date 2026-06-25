import { useLayoutEffect, useMemo, useRef } from 'react'
import { usePagination } from '@/hooks/usePagination'
import './Pagination.css'

export interface PaginationProps {
  /** Total number of items across every page. */
  totalItems: number
  /** Items per page; together with `totalItems` this fixes the page count. */
  pageSize: number
  /** Active page (controlled). Pair with `onChange`. */
  currentPage?: number
  /** Initial page when uncontrolled. @default 1 */
  defaultPage?: number
  /** Fired with the page the user navigates to. */
  onChange?: (page: number) => void
  /** Pages shown on each side of the current one. @default 1 */
  siblingCount?: number
  /** Render first / last page jump buttons. @default true */
  showFirstLast?: boolean
  /** Disable every control. @default false */
  disabled?: boolean
}

// Sentinel for a collapsed gap in the page list.
const ELLIPSIS = 'ellipsis' as const
type PageSlot = number | typeof ELLIPSIS

function range(start: number, end: number): number[] {
  const length = Math.max(0, end - start + 1)
  return Array.from({ length }, (_, i) => start + i)
}

/**
 * Build the page window: first page, last page, the current page with `siblingCount`
 * neighbours, and an ellipsis wherever a run of pages is hidden. An ellipsis is only
 * inserted when it would actually replace more than one page — when the gap is a single
 * page we show that page instead, since "…" standing in for one number is pointless.
 */
function getPageSlots(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PageSlot[] {
  // first + last + current + siblings on both sides + the two ellipsis slots.
  const totalSlots = siblingCount * 2 + 5
  if (totalSlots >= totalPages) return range(1, totalPages)

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + 2 * siblingCount
    return [...range(1, leftCount), ELLIPSIS, totalPages]
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + 2 * siblingCount
    return [1, ELLIPSIS, ...range(totalPages - rightCount + 1, totalPages)]
  }
  return [1, ELLIPSIS, ...range(leftSibling, rightSibling), ELLIPSIS, totalPages]
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DoubleChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 18l-6-6 6-6M11 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DoubleChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 18l6-6-6-6M13 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Pagination — page navigation built on the `usePagination` hook.
 *
 * Page state is delegated to `usePagination` (uncontrolled mode); pass `currentPage`
 * + `onChange` to drive it from the outside instead. The hook owns the page count and
 * clamping while this component renders the windowed list of page numbers, with
 * ellipses collapsing the gaps, plus previous/next and optional first/last jumps.
 */
export function Pagination({
  totalItems,
  pageSize,
  currentPage: controlledPage,
  defaultPage,
  onChange,
  siblingCount = 1,
  showFirstLast = true,
  disabled = false,
}: PaginationProps) {
  const isControlled = controlledPage !== undefined

  // A length-only array is all the hook needs to derive the page count and own the
  // current-page state; we never read the sliced `page`, so its contents don't matter.
  const data = useMemo(
    () => Array.from({ length: Math.max(0, totalItems) }),
    [totalItems],
  )
  const { currentPage: internalPage, totalPages, setPage } = usePagination(data, pageSize)

  // Honour `defaultPage` once on mount. The hook has no initial-page argument, so we
  // seed it here; a layout effect commits the jump before paint, avoiding a flash of
  // page 1. The ref guard keeps it a true one-shot under the lint's dependency check.
  const seeded = useRef(false)
  useLayoutEffect(() => {
    if (seeded.current) return
    seeded.current = true
    if (!isControlled && defaultPage !== undefined) setPage(defaultPage)
  }, [isControlled, defaultPage, setPage])

  const currentPage = isControlled
    ? Math.min(Math.max(1, controlledPage), totalPages)
    : internalPage

  const goToPage = (page: number) => {
    if (disabled) return
    const target = Math.min(Math.max(1, page), totalPages)
    if (target === currentPage) return
    if (!isControlled) setPage(target)
    onChange?.(target)
  }

  const slots = getPageSlots(currentPage, totalPages, siblingCount)

  const onFirstPage = currentPage <= 1
  const onLastPage = currentPage >= totalPages

  return (
    <nav className="chs-pagination" role="navigation" aria-label="Pagination">
      <ul className="chs-pagination__list">
        {showFirstLast && (
          <li>
            <button
              type="button"
              className="chs-pagination__button"
              aria-label="First page"
              disabled={disabled || onFirstPage}
              onClick={() => goToPage(1)}
            >
              <DoubleChevronLeft />
            </button>
          </li>
        )}

        <li>
          <button
            type="button"
            className="chs-pagination__button"
            aria-label="Previous page"
            disabled={disabled || onFirstPage}
            onClick={() => goToPage(currentPage - 1)}
          >
            <ChevronLeft />
          </button>
        </li>

        {slots.map((slot, index) => {
          if (slot === ELLIPSIS) {
            return (
              <li key={`ellipsis-${index}`} aria-hidden="true">
                <span className="chs-pagination__ellipsis">…</span>
              </li>
            )
          }
          const isCurrent = slot === currentPage
          return (
            <li key={slot}>
              <button
                type="button"
                className="chs-pagination__button chs-pagination__page"
                aria-label={`Go to page ${slot}`}
                aria-current={isCurrent ? 'page' : undefined}
                disabled={disabled}
                onClick={() => goToPage(slot)}
              >
                {slot}
              </button>
            </li>
          )
        })}

        <li>
          <button
            type="button"
            className="chs-pagination__button"
            aria-label="Next page"
            disabled={disabled || onLastPage}
            onClick={() => goToPage(currentPage + 1)}
          >
            <ChevronRight />
          </button>
        </li>

        {showFirstLast && (
          <li>
            <button
              type="button"
              className="chs-pagination__button"
              aria-label="Last page"
              disabled={disabled || onLastPage}
              onClick={() => goToPage(totalPages)}
            >
              <DoubleChevronRight />
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

Pagination.displayName = 'Pagination'
