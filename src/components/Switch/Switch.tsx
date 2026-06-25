import { useId } from 'react'
import './Switch.css'

export type SwitchSize = 'sm' | 'md'
export type SwitchLabelPosition = 'left' | 'right'

export interface SwitchProps {
  /** Text shown beside the track; the whole label is clickable. */
  label?: string
  /** Controlled on/off state. @default false */
  checked?: boolean
  /** Fired with the next checked value whenever the user toggles the switch. */
  onChange?: (checked: boolean) => void
  /** Block interaction and dim the control. @default false */
  disabled?: boolean
  /** Track and thumb size. @default 'md' */
  size?: SwitchSize
  /** Which side of the track the label sits on. @default 'right' */
  labelPosition?: SwitchLabelPosition
  /** Caller-supplied id; falls back to a generated, stable one. */
  id?: string
}

/**
 * Switch — an on/off toggle built on a visually-hidden native checkbox.
 *
 * The input carries `role="switch"` so assistive tech announces it as a switch
 * rather than a checkbox; the visible track + thumb are decorative and the thumb
 * slides via a CSS `transform` transition. `aria-checked` is set explicitly so
 * the state is reported the same way across browsers and tests.
 */
export function Switch({
  label,
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  labelPosition = 'right',
  id: idProp,
}: SwitchProps) {
  const reactId = useId()
  const id = idProp ?? reactId

  const classNames = [
    'chs-switch',
    `chs-switch--${size}`,
    labelPosition === 'left' && 'chs-switch--label-left',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={classNames}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        className="chs-switch__input"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        aria-checked={checked}
      />
      <span className="chs-switch__track" aria-hidden="true">
        <span className="chs-switch__thumb" />
      </span>
      {label && <span className="chs-switch__label">{label}</span>}
    </label>
  )
}

Switch.displayName = 'Switch'
