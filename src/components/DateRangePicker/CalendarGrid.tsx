import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'
import type { CalendarDay } from './useCalendar'
import { compareDay, isSameDay } from './dateUtils'

// Portuguese weekday initials for the column headers, Sunday-first to match the
// grid order. (The per-day aria-labels stay en-US — see `dayLabelFormat`.)
const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const dayLabelFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

interface CalendarGridProps {
  days: CalendarDay[]
  minDate?: Date
  maxDate?: Date
  /** True once both ends exist, so start/end cells square off against the band. */
  ranged: boolean
  onSelect: (date: Date) => void
  isStart: (date: Date) => boolean
  isEnd: (date: Date) => boolean
  isInRange: (date: Date) => boolean
}

/**
 * CalendarGrid — the 7×N button grid. Internal to DateRangePicker (never exported
 * from the barrel). It owns roving-tabindex keyboard navigation: exactly one day
 * is tabbable, the arrow keys walk focus across the grid (skipping disabled
 * cells), and Enter/Space fall through to the native button click that selects.
 */
export function CalendarGrid({
  days,
  minDate,
  maxDate,
  ranged,
  onSelect,
  isStart,
  isEnd,
  isInRange,
}: CalendarGridProps) {
  const today = useMemo(() => new Date(), [])
  const dayRefs = useRef<(HTMLButtonElement | null)[]>([])

  const isOutOfRange = (date: Date): boolean =>
    (minDate ? compareDay(date, minDate) < 0 : false) ||
    (maxDate ? compareDay(date, maxDate) > 0 : false)

  // Filler days from the neighbouring months, and days outside min/max, are both
  // non-interactive — they can't take focus and don't fire a selection.
  const isDisabled = (cell: CalendarDay): boolean =>
    !cell.isCurrentMonth || isOutOfRange(cell.date)

  // The single tabbable cell: the start, else today, else the first selectable
  // day. Recomputed (and reset) whenever the month — and thus `days` — changes.
  const defaultIndex = useMemo(() => {
    const startIdx = days.findIndex((cell) => cell.isCurrentMonth && isStart(cell.date))
    if (startIdx >= 0) return startIdx
    const todayIdx = days.findIndex(
      (cell) => cell.isCurrentMonth && isSameDay(cell.date, today),
    )
    if (todayIdx >= 0 && !isDisabled(days[todayIdx]!)) return todayIdx
    const firstSelectable = days.findIndex((cell) => !isDisabled(cell))
    return firstSelectable >= 0 ? firstSelectable : 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days])

  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  useEffect(() => setActiveIndex(defaultIndex), [defaultIndex])

  const moveFocus = (from: number, delta: number) => {
    for (let i = from + delta; i >= 0 && i < days.length; i += delta) {
      if (!isDisabled(days[i]!)) {
        dayRefs.current[i]?.focus()
        return
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        moveFocus(index, 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        moveFocus(index, -1)
        break
      case 'ArrowDown':
        event.preventDefault()
        moveFocus(index, 7)
        break
      case 'ArrowUp':
        event.preventDefault()
        moveFocus(index, -7)
        break
      // Enter/Space fall through to the button's native click → onSelect.
    }
  }

  return (
    <>
      <div className="chs-calendar__weekdays" aria-hidden="true">
        {WEEKDAYS.map((label) => (
          <span key={label} className="chs-calendar__weekday">
            {label}
          </span>
        ))}
      </div>

      <div
        className={['chs-calendar__grid', ranged && 'chs-calendar__grid--ranged']
          .filter(Boolean)
          .join(' ')}
        role="grid"
      >
        {days.map((cell, index) => {
          const disabled = isDisabled(cell)
          const outOfRange = isOutOfRange(cell.date)
          const start = isStart(cell.date)
          const end = isEnd(cell.date)
          const isToday = isSameDay(cell.date, today)

          const className = [
            'chs-calendar__day',
            !cell.isCurrentMonth && 'chs-calendar__day--other-month',
            isToday && 'chs-calendar__day--today',
            isInRange(cell.date) && 'chs-calendar__day--in-range',
            start && 'chs-calendar__day--start',
            end && 'chs-calendar__day--end',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              key={cell.date.toISOString()}
              ref={(node) => {
                dayRefs.current[index] = node
              }}
              type="button"
              className={className}
              tabIndex={index === activeIndex ? 0 : -1}
              disabled={disabled}
              aria-label={dayLabelFormat.format(cell.date)}
              aria-pressed={start || end}
              aria-disabled={outOfRange || undefined}
              onClick={() => onSelect(cell.date)}
              onFocus={() => setActiveIndex(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {cell.date.getDate()}
            </button>
          )
        })}
      </div>
    </>
  )
}

CalendarGrid.displayName = 'CalendarGrid'
