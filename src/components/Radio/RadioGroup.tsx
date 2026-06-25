import { useId } from 'react'
// Reuse Input's field shell (.chs-field*) for the label/error/hint layout.
import '@/components/Input/Input.css'
import './Radio.css'
import { Radio } from './Radio'

export interface RadioGroupOption {
  /** Value reported to onChange when this option is selected. */
  value: string
  /** Human-readable text shown beside the radio. */
  label: string
  /** Render the option but block its selection. @default false */
  disabled?: boolean
}

export type RadioGroupOrientation = 'horizontal' | 'vertical'

export interface RadioGroupProps {
  /** Shared name that groups the native radios (and their keyboard nav). */
  name: string
  /** Currently selected value (controlled). */
  value?: string
  /** Fired with the newly selected value. */
  onChange?: (value: string) => void
  /** Group label, linked to the radiogroup via aria-labelledby. */
  label?: string
  /** The selectable options. */
  options: RadioGroupOption[]
  /** Error message; tints the controls danger and flips aria-invalid when set. */
  error?: string
  /** Helper text shown below the group while there is no error. */
  hint?: string
  /** Lay the options out in a row or a column. @default 'vertical' */
  orientation?: RadioGroupOrientation
  /** Disable every option at once. @default false */
  disabled?: boolean
  /** Caller-supplied id; falls back to a generated, stable one. */
  id?: string
}

/**
 * RadioGroup — a labelled set of mutually-exclusive options.
 *
 * Renders a `role="radiogroup"` wrapper around native `<input type="radio">`
 * controls, so arrow-key navigation, focus and form submission all come for
 * free. The group label is linked through `aria-labelledby`, mirroring how the
 * other fields wire `aria-describedby` for their error and hint text.
 */
export function RadioGroup({
  name,
  value,
  onChange,
  label,
  options,
  error,
  hint,
  orientation = 'vertical',
  disabled = false,
  id: idProp,
}: RadioGroupProps) {
  const reactId = useId()
  const id = idProp ?? reactId
  const labelId = `${id}-label`
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const hasError = Boolean(error)
  const describedBy = hasError ? errorId : hint ? hintId : undefined

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
        // A <span>, not a <label>: the group labels many controls, so it is
        // linked via aria-labelledby rather than htmlFor.
        <span id={labelId} className="chs-field__label">
          {label}
        </span>
      )}

      <div
        role="radiogroup"
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={describedBy}
        aria-invalid={hasError || undefined}
        className={`chs-radio-group chs-radio-group--${orientation}`}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            disabled={disabled || option.disabled}
            onChange={onChange}
          />
        ))}
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

RadioGroup.displayName = 'RadioGroup'
