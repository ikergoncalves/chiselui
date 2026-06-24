import { type InputHTMLAttributes, type ReactNode, useId } from 'react'
import './Input.css'

export type InputSize = 'sm' | 'md' | 'lg'

// The native `size` attribute (a number for character width) collides with our
// design-system `size` scale, so I drop it and redefine it below.
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label, rendered above the control and linked via htmlFor/id. */
  label?: string
  /** Error message; turns the border danger and flips aria-invalid when set. */
  error?: string
  /** Helper text shown below the field while there is no error. */
  hint?: string
  /** Node rendered inside the field, before the input (icon, "$", etc.). */
  leftAddon?: ReactNode
  /** Node rendered inside the field, after the input (unit, action, etc.). */
  rightAddon?: ReactNode
  /** Control height, padding and font size. @default 'md' */
  size?: InputSize
}

/**
 * Input — a labelled text field with optional hint, error and inline addons.
 *
 * Accessibility is wired automatically: the label is associated through a
 * `useId`-generated id, `aria-invalid` is set while there is an error, and
 * `aria-describedby` points at whichever message (error or hint) is on screen.
 */
export function Input({
  label,
  error,
  hint,
  leftAddon,
  rightAddon,
  size = 'md',
  id: idProp,
  className,
  disabled,
  ...rest
}: InputProps) {
  // Allow a caller-supplied id to win, otherwise generate a stable one.
  const reactId = useId()
  const id = idProp ?? reactId
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const hasError = Boolean(error)
  // Describe the field by whichever message is actually rendered below it.
  const describedBy = hasError ? errorId : hint ? hintId : undefined

  const fieldClassNames = [
    'chs-field',
    `chs-field--${size}`,
    hasError && 'chs-field--error',
    disabled && 'chs-field--disabled',
    className,
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

      <div className="chs-input">
        {leftAddon && (
          <span className="chs-input__addon chs-input__addon--left">{leftAddon}</span>
        )}
        <input
          id={id}
          className="chs-input__control"
          disabled={disabled}
          {...rest}
          // a11y attributes go after the spread so they can't be clobbered.
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
        />
        {rightAddon && (
          <span className="chs-input__addon chs-input__addon--right">{rightAddon}</span>
        )}
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

Input.displayName = 'Input'
