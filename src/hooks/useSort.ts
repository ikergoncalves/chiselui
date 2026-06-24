import { useMemo, useState } from 'react'

export type SortDirection = 'asc' | 'desc'

export interface UseSortResult<T> {
  /** Data sorted according to the current state (the input order when unsorted). */
  sorted: T[]
  /** The column currently driving the sort, or null when unsorted. */
  sortKey: keyof T | null
  /** The active direction, or null when unsorted. */
  sortDirection: SortDirection | null
  /** Cycle a column's sort: asc → desc → unsorted. */
  toggleSort: (key: keyof T) => void
}

// Comparator with sensible cross-type behaviour: nullish values sink to the end,
// numbers compare numerically, and everything else falls back to a locale-aware
// string compare so mixed data never throws.
function compare(a: unknown, b: unknown): number {
  if (a === b) return 0
  if (a === null || a === undefined) return 1
  if (b === null || b === undefined) return -1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b))
}

/**
 * useSort — three-state column sorting for tabular data.
 *
 * Clicking a column cycles ascending → descending → unsorted; switching columns
 * starts the new one fresh at ascending. The sorted array is derived (memoized)
 * from `data` and the `{ key, direction }` state, and the original array is never
 * mutated — `Array.prototype.sort` works on a copy.
 */
export function useSort<T extends Record<string, unknown>>(data: T[]): UseSortResult<T> {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null)

  const toggleSort = (key: keyof T) => {
    if (key !== sortKey) {
      setSortKey(key)
      setSortDirection('asc')
      return
    }
    // Same column: advance through the cycle.
    if (sortDirection === 'asc') {
      setSortDirection('desc')
    } else if (sortDirection === 'desc') {
      setSortKey(null)
      setSortDirection(null)
    } else {
      setSortDirection('asc')
    }
  }

  const sorted = useMemo(() => {
    if (sortKey === null || sortDirection === null) return data

    const copy = [...data]
    copy.sort((a, b) => {
      const result = compare(a[sortKey], b[sortKey])
      return sortDirection === 'asc' ? result : -result
    })
    return copy
  }, [data, sortKey, sortDirection])

  return { sorted, sortKey, sortDirection, toggleSort }
}
