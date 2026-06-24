import { useEffect, useMemo, useState } from 'react'

export interface UsePaginationResult<T> {
  /** The rows belonging to the current page. */
  page: T[]
  /** Current 1-based page number. */
  currentPage: number
  /** Total number of pages (always at least 1). */
  totalPages: number
  /** 1-based index of the first item on this page (0 when empty). */
  startItem: number
  /** 1-based index of the last item on this page (0 when empty). */
  endItem: number
  /** Total item count across every page. */
  totalItems: number
  /** Whether a previous / next page is available. */
  canPrev: boolean
  canNext: boolean
  goToPrev: () => void
  goToNext: () => void
  /** Jump to an arbitrary page (clamped into range). */
  setPage: (page: number) => void
}

/**
 * usePagination — client-side slicing of an in-memory array.
 *
 * Tracks a 1-based current page and returns the matching slice plus the metadata
 * a pager UI needs ("Showing X–Y of Z"). If `data` shrinks below the current
 * page — say a filter removed rows — the page is clamped back into range so the
 * view never strands the user on an empty page.
 */
export function usePagination<T>(data: T[], pageSize: number): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1)

  const totalItems = data.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  // Clamp when the dataset (or its size) changes out from under the current page.
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  const page = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, currentPage, pageSize])

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  const canPrev = currentPage > 1
  const canNext = currentPage < totalPages

  const goToPrev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const goToNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1))
  const setPage = (p: number) => setCurrentPage(Math.min(totalPages, Math.max(1, p)))

  return {
    page,
    currentPage,
    totalPages,
    startItem,
    endItem,
    totalItems,
    canPrev,
    canNext,
    goToPrev,
    goToNext,
    setPage,
  }
}
