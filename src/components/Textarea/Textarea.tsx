import {
  type ChangeEventHandler,
  type FormEventHandler,
  type TextareaHTMLAttributes,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
// Reuse Input's field shell (.chs-field*) and control surface (.chs-input) so
// the Textarea is visually identical; Textarea.css only adds the multi-line bits.
import '@/components/Input/Input.css'
import './Textarea.css'

export type TextareaSize = 'sm' | 'md' | 'lg'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Field label, rendered above the control and linked via htmlFor/id. */
  label?: string
  /** Error message; turns the border danger and flips aria-invalid when set. */
  error?: string
  /** Helper text shown below the field while there is no error. */
  hint?: string
  /** Initial visible row count. @default 3 */
  rows?: number
  /** Show a "current / max" character counter (needs `maxLength`). @default false */
  showCount?: boolean
  /** Grow the control to fit its content instead of scrolling. @default false */
  autoResize?: boolean
  /** Control padding and font size. @default 'md' */
  size?: TextareaSize
}

/**
 * Textarea — a labelled multi-line field sharing Input's look and a11y wiring.
 *
 * Adds three multi-line conveniences on top of the shared surface: `autoResize`
 * grows the box to its content via `scrollHeight`, `showCount` renders a live
 * character counter against `maxLength`, and the usual `aria-invalid` /
 * `aria-describedby` plumbing points assistive tech at the error or hint.
 */
export function Textarea({
  label,
  error,
  hint,
  rows = 3,
  showCount = false,
  autoResize = false,
  size = 'md',
  id: idProp,
  className,
  disabled,
  maxLength,
  value,
  defaultValue,
  onChange,
  onInput,
  ...rest
}: TextareaProps) {
  const reactId = useId()
  const id = idProp ?? reactId
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const hasError = Boolean(error)
  const describedBy = hasError ? errorId : hint ? hintId : undefined

  // Track length for the counter. When controlled, the value prop is the source
  // of truth; otherwise we keep our own count seeded from defaultValue.
  const isControlled = value !== undefined
  const [uncontrolledCount, setUncontrolledCount] = useState(
    () => String(defaultValue ?? '').length,
  )
  const count = isControlled ? String(value ?? '').length : uncontrolledCount

  // Auto-resize on mount and whenever a controlled value changes; the onInput
  // handler covers live typing in both the controlled and uncontrolled cases.
  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!autoResize || !el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [autoResize, value])

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (!isControlled) setUncontrolledCount(event.target.value.length)
    onChange?.(event)
  }

  const handleInput: FormEventHandler<HTMLTextAreaElement> = (event) => {
    if (autoResize) {
      const el = event.currentTarget
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
    onInput?.(event)
  }

  const fieldClassNames = [
    'chs-field',
    `chs-field--${size}`,
    hasError && 'chs-field--error',
    disabled && 'chs-field--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const controlClassNames = [
    'chs-input',
    'chs-textarea',
    autoResize && 'chs-textarea--auto-resize',
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

      <div className={controlClassNames}>
        <textarea
          ref={textareaRef}
          id={id}
          className="chs-input__control chs-textarea__control"
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onInput={handleInput}
          {...rest}
          // a11y attributes go after the spread so they can't be clobbered.
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
        />
      </div>

      {showCount && maxLength !== undefined && (
        <span
          className={`chs-textarea__count${
            count >= maxLength ? ' chs-textarea__count--limit' : ''
          }`}
        >
          {`${count} / ${maxLength}`}
        </span>
      )}

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

Textarea.displayName = 'Textarea'
