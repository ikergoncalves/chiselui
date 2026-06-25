import { useMemo, useState } from 'react'

export interface CalendarDay {
  /** The concrete day this cell represents (local midnight). */
  date: Date
  /** False for the leading/trailing days borrowed from the adjacent months. */
  isCurrentMonth: boolean
}

export interface UseCalendarResult {
  /** Four-digit year currently on screen. */
  year: number
  /** Zero-based month index currently on screen. */
  month: number
  /** Localized "June 2026" heading for the displayed month. */
  title: string
  /** The 7-column grid, leading/trailing filler included. */
  days: CalendarDay[]
  prevMonth: () => void
  nextMonth: () => void
}

// en-US to match the per-day aria-labels ("June 15, 2026") produced in the grid.
const titleFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })

/**
 * useCalendar — owns which month is on screen and expands it into a day grid.
 *
 * The grid always starts on a Sunday: I pull in the trailing days of the previous
 * month to pad the first week, then the leading days of the next month to fill the
 * final week, so every row holds seven cells. Filler cells are flagged
 * `isCurrentMonth: false` so the grid can dim and disable them. Native Date + Intl
 * only — zero date libraries.
 */
export function useCalendar(initialDate?: Date | null): UseCalendarResult {
  const [cursor, setCursor] = useState(() => {
    const base = initialDate ?? new Date()
    return { year: base.getFullYear(), month: base.getMonth() }
  })

  const days = useMemo<CalendarDay[]>(() => {
    const { year, month } = cursor
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    // How many leading cells to borrow from the previous month (Sun = 0 … Sat = 6).
    const leading = new Date(year, month, 1).getDay()

    const cells: CalendarDay[] = []

    // Previous month's tail, just enough to reach the first Sunday.
    for (let i = leading; i > 0; i--) {
      cells.push({ date: new Date(year, month, 1 - i), isCurrentMonth: false })
    }
    // This month.
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({ date: new Date(year, month, day), isCurrentMonth: true })
    }
    // Next month's head — pad until the last row is complete (a multiple of 7).
    let nextDay = 1
    while (cells.length % 7 !== 0) {
      cells.push({ date: new Date(year, month + 1, nextDay++), isCurrentMonth: false })
    }

    return cells
  }, [cursor])

  const title = useMemo(
    () => titleFormat.format(new Date(cursor.year, cursor.month, 1)),
    [cursor],
  )

  const prevMonth = () =>
    setCursor(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 },
    )
  const nextMonth = () =>
    setCursor(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 },
    )

  return { year: cursor.year, month: cursor.month, title, days, prevMonth, nextMonth }
}
