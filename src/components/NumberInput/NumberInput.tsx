import {
  type ChangeEvent,
  type KeyboardEvent,
  useId,
  useMemo,
  useState,
} from 'react'
// Reuse Input's field shell (.chs-field*) and control surface (.chs-input) for the
// label/error/hint layout — see Input.tsx — then NumberInput.css adds the spinner
// row and the increment / decrement buttons that flank the field.
import '@/components/Input/Input.css'
import './NumberInput.css'

export type NumberInputFormat = 'decimal' | 'currency' | 'percent' | 'unit'

export interface NumberInputProps {
  /** Controlled numeric value. Leave undefined to run uncontrolled. */
  value?: number
  /** Initial value when uncontrolled. @default 0 */
  defaultValue?: number
  /** Fired with the next (clamped) value whenever it changes. */
  onChange?: (value: number) => void
  /** Lower bound; the decrement button and clamping respect it. No floor by default. */
  min?: number
  /** Upper bound; the increment button and clamping respect it. No ceiling by default. */
  max?: number
  /** Amount added or removed per step (buttons / arrow keys). @default 1 */
  step?: number
  /** How the resting value is formatted via Intl.NumberFormat. @default 'decimal' */
  format?: NumberInputFormat
  /** ISO currency code (e.g. 'BRL', 'USD') — used when `format` is 'currency'. */
  currency?: string
  /** Unit identifier (e.g. 'kilogram', 'meter') — used when `format` is 'unit'. */
  unit?: string
  /** Locale passed to Intl.NumberFormat. @default 'pt-BR' */
  locale?: string
  /** Field label, rendered above the control and linked via htmlFor/id. */
  label?: string
  /** Error message; turns the border danger and flips aria-invalid when set. */
  error?: string
  /** Helper text shown below the field while there is no error. */
  hint?: string
  /** Block interaction and dim the control. @default false */
  disabled?: boolean
  /** Caller-supplied id; falls back to a generated, stable one. */
  id?: string
}

// Count the fractional digits of a number so stepping can round its result back to
// a sane precision — otherwise 0.45 + 0.01 leaks 0.46000000000000002 into onChange.
function decimalsOf(n: number): number {
  if (!Number.isFinite(n)) return 0
  const text = Math.abs(n).toString()
  const dot = text.indexOf('.')
  return dot === -1 ? 0 : text.length - dot - 1
}

// Ask Intl what this locale uses to separate the decimal part. We need it both to
// render the raw editing string and to parse whatever the user typed back.
function decimalSeparatorFor(locale: string): string {
  const parts = new Intl.NumberFormat(locale).formatToParts(1.1)
  return parts.find((part) => part.type === 'decimal')?.value ?? '.'
}

// A literal separator could be a regex metacharacter inside a character class, so
// escape the handful that matter ( ] ^ \ - ) before interpolating it.
function escapeForCharClass(value: string): string {
  return value.replace(/[\]^\\-]/g, '\\$&')
}

// Pull a number out of a formatted string: keep only digits, a minus sign and the
// locale's decimal separator (dropping currency symbols, units and grouping marks),
// then normalise the separator to a dot for Number.parseFloat.
function parseNumber(text: string, decimalSeparator: string): number {
  const stripped = text
    .replace(new RegExp(`[^0-9\\-${escapeForCharClass(decimalSeparator)}]`, 'g'), '')
    .replace(decimalSeparator, '.')
  const parsed = Number.parseFloat(stripped)
  return Number.isNaN(parsed) ? 0 : parsed
}

/**
 * NumberInput — a numeric field with increment / decrement buttons, min/max
 * clamping, a configurable step and Intl-powered formatting masks.
 *
 * The value is shown formatted while at rest (e.g. `R$ 1.234,56`) and swaps to a
 * plain editable number on focus; on blur the typed text is parsed and reformatted.
 * The control carries `role="spinbutton"` with `aria-valuemin/max/now/text` so
 * assistive tech announces it as a spinner with the human-readable value.
 *
 * Works controlled (pass `value` + `onChange`) or uncontrolled (`defaultValue`).
 */
export function NumberInput({
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  format = 'decimal',
  currency,
  unit,
  locale = 'pt-BR',
  label,
  error,
  hint,
  disabled = false,
  id: idProp,
}: NumberInputProps) {
  const reactId = useId()
  const id = idProp ?? reactId
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = isControlled ? value : internalValue

  // While focused we keep a free-form draft of what the user is typing; the formatted
  // value only re-appears once focus leaves.
  const [focused, setFocused] = useState(false)
  const [draft, setDraft] = useState('')

  const hasError = Boolean(error)
  const describedBy = hasError ? errorId : hint ? hintId : undefined

  // The resting (formatted) view, e.g. currency or percent.
  const formatter = useMemo(() => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency ?? 'USD',
        })
      case 'percent':
        return new Intl.NumberFormat(locale, {
          style: 'percent',
          maximumFractionDigits: 20,
        })
      case 'unit':
        return new Intl.NumberFormat(locale, {
          style: 'unit',
          unit: unit ?? 'kilogram',
        })
      default:
        return new Intl.NumberFormat(locale, {
          style: 'decimal',
          maximumFractionDigits: 20,
        })
    }
  }, [format, locale, currency, unit])

  // The editing view: a plain number, locale decimal separator, no grouping or
  // symbols — the easiest thing to retype over.
  const editFormatter = useMemo(
    () => new Intl.NumberFormat(locale, { useGrouping: false, maximumFractionDigits: 20 }),
    [locale],
  )

  const decimalSeparator = useMemo(() => decimalSeparatorFor(locale), [locale])

  const atMin = min !== undefined && currentValue <= min
  const atMax = max !== undefined && currentValue >= max

  const clamp = (n: number): number => {
    let result = n
    if (min !== undefined && result < min) result = min
    if (max !== undefined && result > max) result = max
    return result
  }

  // Single point where the value actually changes: clamp, push to internal state when
  // uncontrolled and notify the caller — but only when it really moved.
  const commit = (next: number): number => {
    const clamped = clamp(next)
    if (clamped !== currentValue) {
      if (!isControlled) setInternalValue(clamped)
      onChange?.(clamped)
    }
    return clamped
  }

  const stepBy = (direction: 1 | -1): void => {
    if (disabled) return
    // When editing, step from whatever the user has typed so far, not the last
    // committed value, so the visible number is what gets incremented.
    const base = focused ? parseNumber(draft, decimalSeparator) : currentValue
    const decimals = Math.max(decimalsOf(step), decimalsOf(base))
    const next = Number((base + direction * step).toFixed(decimals))
    const clamped = commit(next)
    if (focused) setDraft(editFormatter.format(clamped))
  }

  const handleFocus = (): void => {
    setFocused(true)
    setDraft(editFormatter.format(currentValue))
  }

  const handleBlur = (): void => {
    setFocused(false)
    commit(parseNumber(draft, decimalSeparator))
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setDraft(event.target.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      stepBy(1)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      stepBy(-1)
    }
  }

  const displayValue = focused ? draft : formatter.format(currentValue)

  const fieldClassNames = [
    'chs-field',
    hasError && 'chs-field--error',
    disabled && 'chs-field--disabled',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={fieldClassNames}>
      {label && (
        <label htmlFor={id} className="chs-field__label">
          {label}
        </label>
      )}

      <div className="chs-numberinput">
        <button
          type="button"
          className="chs-numberinput__btn chs-numberinput__btn--dec"
          onClick={() => stepBy(-1)}
          disabled={disabled || atMin}
          aria-label="Decrement"
        >
          &#x2212;
        </button>

        <div className="chs-input">
          <input
            id={id}
            className="chs-input__control"
            type="text"
            inputMode="decimal"
            role="spinbutton"
            value={displayValue}
            disabled={disabled}
            onChange={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-valuenow={currentValue}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuetext={formatter.format(currentValue)}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
          />
        </div>

        <button
          type="button"
          className="chs-numberinput__btn chs-numberinput__btn--inc"
          onClick={() => stepBy(1)}
          disabled={disabled || atMax}
          aria-label="Increment"
        >
          &#x2b;
        </button>
      </div>

      {hasError ? (
        <p id={errorId} className="chs-field__error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="chs-field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

NumberInput.displayName = 'NumberInput'
