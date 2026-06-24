import { type SelectHTMLAttributes, useId } from 'react'
// Reuse Input's field layout (.chs-field*) and control surface (.chs-input) so
// the two controls are visually identical; Select.css only adds the native bits.
import '@/components/Input/Input.css'
import './Select.css'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectOption {
  /** Value submitted with the form / reported to onChange. */
  value: string
  /** Human-readable text shown in the dropdown. */
  label: string
  /** Render the option but block selection. @default false */
  disabled?: boolean
}

// The native `size` attribute (visible row count) collides with our size scale,
// so I drop it and redefine it below.
export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Field label, rendered above the control and linked via htmlFor/id. */
  label?: string
  /** The selectable options. */
  options: SelectOption[]
  /** Error message; turns the border danger and flips aria-invalid when set. */
  error?: string
  /** Greyed, non-selectable first option shown when nothing is chosen. */
  placeholder?: string
  /** Control height, padding and font size. @default 'md' */
  size?: SelectSize
}

/**
 * Select — a labelled wrapper around the native `<select>`.
 *
 * Built on the real element (not a custom dropdown) so keyboard, screen-reader
 * and mobile behaviour come for free. Accessibility mirrors Input: id-linked
 * label, `aria-invalid` and `aria-describedby` driven by the error state.
 */
export function Select({
  label,
  options,
  error,
  placeholder,
  size = 'md',
  id: idProp,
  className,
  disabled,
  value,
  defaultValue,
  ...rest
}: SelectProps) {
  const reactId = useId()
  const id = idProp ?? reactId
  const errorId = `${id}-error`

  const hasError = Boolean(error)

  const fieldClassNames = [
    'chs-field',
    `chs-field--${size}`,
    hasError && 'chs-field--error',
    disabled && 'chs-field--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Never hand React both `value` and `defaultValue`. When uncontrolled and a
  // placeholder exists, start on the empty option so the placeholder shows first.
  const isControlled = value !== undefined
  const valueProps = isControlled
    ? { value }
    : { defaultValue: defaultValue ?? (placeholder !== undefined ? '' : undefined) }

  return (
    <div className={fieldClassNames}>
      {label && (
        <label htmlFor={id} className="chs-field__label">
          {label}
        </label>
      )}

      <select
        id={id}
        className="chs-input chs-select"
        disabled={disabled}
        {...valueProps}
        {...rest}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
      >
        {placeholder !== undefined && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>

      {hasError && (
        <p id={errorId} className="chs-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

Select.displayName = 'Select'
