import { useEffect, useId, useRef } from 'react'
// Reuse Input's field shell (.chs-field*) for the label/error/hint layout, then
// Checkbox.css draws the custom control on top.
import '@/components/Input/Input.css'
import './Checkbox.css'

export type CheckboxSize = 'sm' | 'md'

export interface CheckboxProps {
  /** Text shown next to the box; the whole label is clickable. */
  label?: string
  /** Controlled checked state. @default false */
  checked?: boolean
  /** Fired with the next checked value whenever the user toggles the box. */
  onChange?: (checked: boolean) => void
  /** Render the third, "partially selected" state (a dash). @default false */
  indeterminate?: boolean
  /** Block interaction and dim the control. @default false */
  disabled?: boolean
  /** Error message; tints the box danger and flips aria-invalid when set. */
  error?: string
  /** Helper text shown below the control while there is no error. */
  hint?: string
  /** Box size. @default 'md' */
  size?: CheckboxSize
  /** Caller-supplied id; falls back to a generated, stable one. */
  id?: string
}

/**
 * Checkbox — a tri-state checkbox built on a visually-hidden native input.
 *
 * The real `<input type="checkbox">` stays in the DOM (and the a11y tree) for
 * free keyboard, focus and form behaviour; a sibling box renders the tick or
 * dash. `indeterminate` has no HTML attribute, so it is synced through a ref and
 * surfaced to assistive tech as `aria-checked="mixed"`.
 */
export function Checkbox({
  label,
  checked = false,
  onChange,
  indeterminate = false,
  disabled = false,
  error,
  hint,
  size = 'md',
  id: idProp,
}: CheckboxProps) {
  const reactId = useId()
  const id = idProp ?? reactId
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const inputRef = useRef<HTMLInputElement>(null)

  const hasError = Boolean(error)
  const describedBy = hasError ? errorId : hint ? hintId : undefined

  // `indeterminate` lives only on the DOM property — there is no attribute for
  // it — so I push the prop onto the node through the ref whenever it changes.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const fieldClassNames = [
    'chs-field',
    `chs-field--${size}`,
    hasError && 'chs-field--error',
    disabled && 'chs-field--disabled',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={fieldClassNames}>
      <label className="chs-checkbox">
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          className="chs-checkbox__input"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
          // A native checkbox can only report on/off, so I voice the mixed state
          // myself; when it isn't indeterminate the native checked drives a11y.
          aria-checked={indeterminate ? 'mixed' : undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
        />
        <span className="chs-checkbox__box" aria-hidden="true">
          <svg
            className="chs-checkbox__icon chs-checkbox__check"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <svg
            className="chs-checkbox__icon chs-checkbox__dash"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
        {label && <span className="chs-checkbox__label">{label}</span>}
      </label>

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

Checkbox.displayName = 'Checkbox'
