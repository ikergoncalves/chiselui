import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
// Reuse Input's field layout (.chs-field*) and control surface (.chs-input).
import '@/components/Input/Input.css'
import './Combobox.css'

export interface ComboboxOption {
  /** Value reported to `onChange` when the option is picked. */
  value: string
  /** Human-readable text shown in the input and the list. */
  label: string
}

export interface ComboboxProps {
  /** The selectable options. */
  options: ComboboxOption[]
  /** Currently selected value (controlled). */
  value?: string
  /** Fired with the chosen option's value. */
  onChange: (value: string) => void
  /** Placeholder shown while the input is empty. */
  placeholder?: string
  /** Field label, linked to the input via htmlFor/id. */
  label?: string
  /** Error message; turns the border danger and flips aria-invalid when set. */
  error?: string
  /** Disable the whole control. @default false */
  disabled?: boolean
  /** Custom matcher. @default case-insensitive substring on the label. */
  filterFn?: (option: ComboboxOption, query: string) => boolean
}

const defaultFilter = (option: ComboboxOption, query: string): boolean =>
  option.label.toLowerCase().includes(query.toLowerCase())

/**
 * Combobox — a filterable, keyboard-navigable single-select.
 *
 * A text input narrows a `role="listbox"` dropdown positioned with plain CSS
 * (no Floating UI here). Arrow keys move the active option, Enter selects,
 * Escape closes, and a click outside dismisses it (via `useOnClickOutside`).
 * ARIA is wired the WAI-ARIA way: `role="combobox"` + `aria-autocomplete="list"`
 * on the input, `aria-activedescendant` tracking the highlighted option, and
 * `role="option"` rows carrying `aria-selected`.
 */
export function Combobox({
  options,
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  filterFn = defaultFilter,
}: ComboboxProps) {
  const baseId = useId()
  const inputId = `${baseId}-input`
  const listboxId = `${baseId}-listbox`
  const errorId = `${baseId}-error`
  const optionId = (index: number) => `${baseId}-option-${index}`

  const wrapperRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)
  const [inputValue, setInputValue] = useState(selectedOption?.label ?? '')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const hasError = Boolean(error)

  // While the input still shows the selected label (the user hasn't typed a new
  // query), treat the query as empty so the full list is offered on reopen.
  const query = inputValue === selectedOption?.label ? '' : inputValue
  const filtered = useMemo(
    () => options.filter((option) => filterFn(option, query)),
    [options, query, filterFn],
  )

  // Mirror an external selection change back into the input while closed.
  useEffect(() => {
    if (!open) setInputValue(selectedOption?.label ?? '')
  }, [open, selectedOption?.label])

  // Keep the active option scrolled into view as it moves. The option id is
  // inlined here (rather than calling the `optionId` helper) so the effect's
  // only real inputs — `open`, `activeIndex` and the stable `baseId` — are all
  // honest, explicit dependencies.
  useEffect(() => {
    if (!open || activeIndex < 0) return
    const el = document.getElementById(`${baseId}-option-${activeIndex}`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [open, activeIndex, baseId])

  useOnClickOutside(
    wrapperRef,
    () => {
      setOpen(false)
      setActiveIndex(-1)
    },
    open,
  )

  const selectOption = (option: ComboboxOption) => {
    onChange(option.value)
    setInputValue(option.label)
    setOpen(false)
    setActiveIndex(-1)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setOpen(true)
    setActiveIndex(0)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault()
        if (!open) {
          setOpen(true)
          setActiveIndex(0)
          return
        }
        setActiveIndex((i) => Math.min(filtered.length - 1, i + 1))
        return
      }
      case 'ArrowUp': {
        event.preventDefault()
        if (!open) {
          setOpen(true)
          return
        }
        setActiveIndex((i) => Math.max(0, i - 1))
        return
      }
      case 'Enter': {
        if (open) {
          const option = filtered[activeIndex]
          if (option) {
            event.preventDefault()
            selectOption(option)
          }
        }
        return
      }
      case 'Escape': {
        if (open) {
          event.preventDefault()
          setOpen(false)
          setActiveIndex(-1)
        }
        return
      }
      case 'Tab': {
        // Let focus leave naturally, just tidy up the open list.
        setOpen(false)
        setActiveIndex(-1)
        return
      }
    }
  }

  const fieldClassNames = [
    'chs-field',
    'chs-field--md',
    hasError && 'chs-field--error',
    disabled && 'chs-field--disabled',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={fieldClassNames}>
      {label && (
        <label htmlFor={inputId} className="chs-field__label">
          {label}
        </label>
      )}

      <div
        ref={wrapperRef}
        className={['chs-combobox', open && 'chs-combobox--open'].filter(Boolean).join(' ')}
      >
        <div className="chs-input chs-combobox__control">
          <input
            id={inputId}
            className="chs-input__control"
            type="text"
            role="combobox"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-activedescendant={
              open && activeIndex >= 0 && activeIndex < filtered.length
                ? optionId(activeIndex)
                : undefined
            }
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : undefined}
            value={inputValue}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClick={() => !disabled && setOpen(true)}
          />
          <span className="chs-input__addon chs-input__addon--right chs-combobox__arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {open && (
          <ul id={listboxId} role="listbox" className="chs-combobox__listbox">
            {filtered.length === 0 ? (
              <li className="chs-combobox__empty" role="presentation">
                No matches
              </li>
            ) : (
              filtered.map((option, index) => (
                <li
                  key={option.value}
                  id={optionId(index)}
                  role="option"
                  aria-selected={option.value === value}
                  className={[
                    'chs-combobox__option',
                    index === activeIndex && 'chs-combobox__option--active',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  // Keep focus on the input so the click selects without blurring.
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
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

Combobox.displayName = 'Combobox'
