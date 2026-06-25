import { useId, useRef, useState } from 'react'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
// Reuse Input's field shell (.chs-field*) for the label/error wrapper.
import '@/components/Input/Input.css'
import './DateRangePicker.css'
import { CalendarGrid } from './CalendarGrid'
import { useCalendar } from './useCalendar'
import { type DateRange, type SelectingTarget, useDateRange } from './useDateRange'
import { formatDate } from './dateUtils'

export type { DateRange } from './useDateRange'

export interface DateRangePickerProps {
  /** Controlled range value. */
  value?: DateRange
  /** Fired with the next range on every selection. */
  onChange?: (range: DateRange) => void
  /** Label rendered above the pair of inputs. */
  label?: string
  /** Label for the start input. @default 'Start date' */
  startLabel?: string
  /** Label for the end input. @default 'End date' */
  endLabel?: string
  /** Placeholder shared by both inputs. @default 'MM/DD/YYYY' */
  placeholder?: string
  /** Days before this are disabled. */
  minDate?: Date
  /** Days after this are disabled. */
  maxDate?: Date
  /** Disable the whole control. @default false */
  disabled?: boolean
  /** Error message; turns the border danger and flips aria-invalid when set. */
  error?: string
  /** Caller-supplied id; falls back to a generated, stable one. */
  id?: string
}

/**
 * DateRangePicker — two inputs that share one month calendar to pick a range.
 *
 * Clicking either input opens the calendar beneath the pair; pick the start, then
 * the end, and a highlighted band fills the days between. The input being chosen
 * is highlighted, a click outside closes the calendar, and full keyboard support
 * lives in CalendarGrid. Built on native Date + Intl with zero date libraries.
 */
export function DateRangePicker({
  value,
  onChange,
  label,
  startLabel = 'Start date',
  endLabel = 'End date',
  placeholder = 'MM/DD/YYYY',
  minDate,
  maxDate,
  disabled = false,
  error,
  id: idProp,
}: DateRangePickerProps) {
  const reactId = useId()
  const baseId = idProp ?? reactId
  const startId = `${baseId}-start`
  const endId = `${baseId}-end`
  const errorId = `${baseId}-error`
  const calendarId = `${baseId}-calendar`

  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const range = useDateRange({ value, onChange, onComplete: () => setOpen(false) })
  const calendar = useCalendar(value?.start ?? undefined)

  useOnClickOutside(wrapperRef, () => setOpen(false), open)

  const hasError = Boolean(error)

  const openFor = (target: SelectingTarget) => {
    if (disabled) return
    range.setSelecting(target)
    setOpen(true)
  }

  const fieldClassNames = [
    'chs-field',
    'chs-field--md',
    hasError && 'chs-field--error',
    disabled && 'chs-field--disabled',
  ]
    .filter(Boolean)
    .join(' ')

  const renderInput = (
    target: SelectingTarget,
    inputId: string,
    labelText: string,
    date: Date | null,
  ) => (
    <div
      className={[
        'chs-daterange__input',
        open && range.selecting === target && 'chs-daterange__input--active',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <label htmlFor={inputId} className="chs-daterange__label">
        {labelText}
      </label>
      <input
        id={inputId}
        className="chs-daterange__control"
        type="text"
        readOnly
        disabled={disabled}
        value={date ? formatDate(date) : ''}
        placeholder={placeholder}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? calendarId : undefined}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        onFocus={() => openFor(target)}
        onClick={() => openFor(target)}
      />
    </div>
  )

  return (
    <div className={fieldClassNames}>
      {label && <span className="chs-field__label">{label}</span>}

      <div ref={wrapperRef} className="chs-daterange-wrapper">
        <div className="chs-daterange">
          {renderInput('start', startId, startLabel, range.start)}
          {renderInput('end', endId, endLabel, range.end)}
        </div>

        {open && (
          <div
            id={calendarId}
            role="dialog"
            aria-modal="false"
            aria-label={`Calendar, ${calendar.title}`}
            className="chs-calendar"
          >
            <div className="chs-calendar__header">
              <button
                type="button"
                className="chs-calendar__nav"
                aria-label="Previous month"
                onClick={calendar.prevMonth}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="chs-calendar__title" aria-live="polite">
                {calendar.title}
              </span>
              <button
                type="button"
                className="chs-calendar__nav"
                aria-label="Next month"
                onClick={calendar.nextMonth}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <CalendarGrid
              days={calendar.days}
              minDate={minDate}
              maxDate={maxDate}
              ranged={Boolean(range.start && range.end)}
              onSelect={range.selectDate}
              isStart={range.isStart}
              isEnd={range.isEnd}
              isInRange={range.isInRange}
            />
          </div>
        )}
      </div>

      {hasError && (
        <p id={errorId} className="chs-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

DateRangePicker.displayName = 'DateRangePicker'
