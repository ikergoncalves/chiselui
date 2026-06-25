import './Radio.css'

export interface RadioProps {
  /** Text shown next to the dot; the whole label is clickable. */
  label: string
  /** Value reported to the group's onChange when this option is picked. */
  value: string
  /** Block interaction and dim this single option. @default false */
  disabled?: boolean

  // ----------------------------------------------------------------------- //
  // Wiring supplied by RadioGroup. You rarely set these by hand — render a   //
  // <RadioGroup> instead, which feeds name/checked/onChange to each Radio.   //
  // ----------------------------------------------------------------------- //
  /** Shared group name that ties the native radios together. */
  name?: string
  /** Whether this option is the selected one. */
  checked?: boolean
  /** Fired with this option's `value` when the user selects it. */
  onChange?: (value: string) => void
  /** Caller-supplied id for the input. */
  id?: string
}

/**
 * Radio — a single labelled radio built on a visually-hidden native input.
 *
 * Designed to be rendered by {@link RadioGroup}, which supplies `name`,
 * `checked` and `onChange`. The native input stays in the DOM so arrow-key
 * navigation between same-named radios works without any custom JS.
 */
export function Radio({
  label,
  value,
  disabled = false,
  name,
  checked,
  onChange,
  id,
}: RadioProps) {
  return (
    <label className="chs-radio">
      <input
        id={id}
        type="radio"
        className="chs-radio__input"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(value)}
      />
      <span className="chs-radio__circle" aria-hidden="true" />
      <span className="chs-radio__label">{label}</span>
    </label>
  )
}

Radio.displayName = 'Radio'
