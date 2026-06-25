import { useCallback, useEffect, useState } from 'react'
import { compareDay, isSameDay, startOfDay } from './dateUtils'

export interface DateRange {
  start: Date | null
  end: Date | null
}

/** Which endpoint the next day click will set. */
export type SelectingTarget = 'start' | 'end'

interface UseDateRangeOptions {
  /** Controlled range value. */
  value?: DateRange
  /** Fired with the next range on every selection. */
  onChange?: (range: DateRange) => void
  /** Called once a valid end completes the range, so the UI can close itself. */
  onComplete?: () => void
}

export interface UseDateRangeResult {
  start: Date | null
  end: Date | null
  selecting: SelectingTarget
  setSelecting: (target: SelectingTarget) => void
  selectDate: (date: Date) => void
  clearRange: () => void
  isStart: (date: Date) => boolean
  isEnd: (date: Date) => boolean
  isInRange: (date: Date) => boolean
}

/**
 * useDateRange — the range state and the click-to-select rules.
 *
 * It owns `{ start, end, selecting }` but stays in step with a controlled
 * `value`: every selection updates local state and reports through `onChange`,
 * and an external `value` is mirrored back in. The selection flow is the classic
 * two-click one — pick the start, then the end; clicking an end earlier than the
 * start restarts from that earlier day instead of inverting the range.
 */
export function useDateRange({
  value,
  onChange,
  onComplete,
}: UseDateRangeOptions): UseDateRangeResult {
  const [start, setStart] = useState<Date | null>(value?.start ?? null)
  const [end, setEnd] = useState<Date | null>(value?.end ?? null)
  const [selecting, setSelecting] = useState<SelectingTarget>('start')

  // Keep local state in step with a controlled `value`. I key the effect on the
  // day timestamps (not object identity) so re-passing an equal range — exactly
  // what happens right after our own onChange — can't spin into a loop.
  const startTime = value?.start ? startOfDay(value.start).getTime() : null
  const endTime = value?.end ? startOfDay(value.end).getTime() : null
  useEffect(() => {
    if (!value) return
    setStart(value.start)
    setEnd(value.end)
    // value is intentionally read through the timestamp deps below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime])

  const selectDate = useCallback(
    (date: Date) => {
      const day = startOfDay(date)

      // Picking the start — fresh, or restarting because the clicked end falls
      // before the current start — always parks us on 'end' for the next click.
      if (selecting === 'start' || !start || compareDay(day, start) < 0) {
        setStart(day)
        setEnd(null)
        setSelecting('end')
        onChange?.({ start: day, end: null })
        return
      }

      // selecting === 'end' and day >= start: the range is complete.
      setEnd(day)
      setSelecting('start')
      onChange?.({ start, end: day })
      onComplete?.()
    },
    [selecting, start, onChange, onComplete],
  )

  const clearRange = useCallback(() => {
    setStart(null)
    setEnd(null)
    setSelecting('start')
    onChange?.({ start: null, end: null })
  }, [onChange])

  const isStart = useCallback((date: Date) => (start ? isSameDay(date, start) : false), [start])
  const isEnd = useCallback((date: Date) => (end ? isSameDay(date, end) : false), [end])
  const isInRange = useCallback(
    (date: Date) =>
      Boolean(start && end && compareDay(date, start) > 0 && compareDay(date, end) < 0),
    [start, end],
  )

  return {
    start,
    end,
    selecting,
    setSelecting,
    selectDate,
    clearRange,
    isStart,
    isEnd,
    isInRange,
  }
}
