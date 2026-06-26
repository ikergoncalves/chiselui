import {
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  useId,
  useRef,
  useState,
} from 'react'
import './ColorPicker.css'

export interface ColorPickerProps {
  /** Controlled colour in `#rrggbb` (or `#rgb`) form. Leave undefined to run uncontrolled. */
  value?: string
  /** Initial colour when uncontrolled. @default '#3b82f6' */
  defaultValue?: string
  /** Fired with the next colour as a normalised `#rrggbb` string whenever it changes. */
  onChange?: (hex: string) => void
  /** Group label, rendered above the picker and linked via aria-labelledby. */
  label?: string
  /** Block interaction and dim the picker. @default false */
  disabled?: boolean
  /** Caller-supplied id; falls back to a generated, stable one. */
  id?: string
}

// ---------------------------------------------------------------------------
// Colour maths — no external libraries, only what the picker needs.
//
// The 2D spectrum is three layered CSS gradients: a solid hue base, a white
// layer that fades left→right and a black layer that fades bottom→top. Working
// the alpha compositing of those layers out by hand, the colour at the relative
// point (x, y) — with (0,0) at the top-left — is exactly:
//
//   channel = (1 - y) * (255 * (1 - x) + base * x)
//
// which is precisely the HSV colour space: x is the HSV *saturation* and
// (1 - y) is the HSV *value*. So even though the brief frames the spectrum in
// HSL terms, HSV is the model that makes the gradient round-trip perfectly, and
// it is what I store internally. The public API stays hex either way.
// ---------------------------------------------------------------------------

interface Rgb {
  r: number
  g: number
  b: number
}

interface Hsv {
  /** Hue, 0–360. */
  h: number
  /** Saturation, 0–1. */
  s: number
  /** Value, 0–1. */
  v: number
}

const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

function isValidHex(hex: string): boolean {
  return HEX_PATTERN.test(hex.trim())
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

// Lower-case and expand `#rgb` shorthand to `#rrggbb`. Only call with a value
// that already passed isValidHex.
function normalizeHex(hex: string): string {
  const lower = hex.trim().toLowerCase()
  if (lower.length === 4) {
    return `#${lower[1]}${lower[1]}${lower[2]}${lower[2]}${lower[3]}${lower[3]}`
  }
  return lower
}

function hexToRgb(hex: string): Rgb {
  const n = normalizeHex(hex)
  return {
    r: Number.parseInt(n.slice(1, 3), 16),
    g: Number.parseInt(n.slice(3, 5), 16),
    b: Number.parseInt(n.slice(5, 7), 16),
  }
}

function rgbToHex({ r, g, b }: Rgb): string {
  const channel = (value: number): string =>
    clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0')
  return `#${channel(r)}${channel(g)}${channel(b)}`
}

function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6
    else if (max === gn) h = (bn - rn) / delta + 2
    else h = (rn - gn) / delta + 4
    h *= 60
    if (h < 0) h += 360
  }

  const s = max === 0 ? 0 : delta / max
  return { h, s, v: max }
}

function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const c = v * s
  const hh = h / 60
  const x = c * (1 - Math.abs((hh % 2) - 1))
  let r = 0
  let g = 0
  let b = 0
  if (hh < 1) [r, g, b] = [c, x, 0]
  else if (hh < 2) [r, g, b] = [x, c, 0]
  else if (hh < 3) [r, g, b] = [0, c, x]
  else if (hh < 4) [r, g, b] = [0, x, c]
  else if (hh < 5) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  const m = v - c
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}

function hexToHsv(hex: string): Hsv {
  return rgbToHsv(hexToRgb(hex))
}

function hsvToHex(hsv: Hsv): string {
  return rgbToHex(hsvToRgb(hsv))
}

// Hue is undefined for achromatic colours (white, grey, black → saturation 0),
// so when seeding from such a colour I keep the slider where it was rather than
// snapping it back to red.
function seedHsv(hex: string, previous: Hsv): Hsv {
  const next = hexToHsv(hex)
  if (next.s === 0) next.h = previous.h
  return next
}

const DEFAULT_COLOR = '#3b82f6'
const SPECTRUM_LABEL = 'Color spectrum. Use arrow keys to adjust.'

/**
 * ColorPicker — a self-contained HSV colour picker: a 2D saturation/value
 * spectrum, a hue slider, an editable hex field and a live preview swatch.
 *
 * The spectrum is drawn with layered CSS gradients (no canvas), so it is cheap
 * to render and easy to drive from tests. It is operable by pointer drag or by
 * arrow keys (±1%, ±10% with Shift). Works controlled (`value` + `onChange`) or
 * uncontrolled (`defaultValue`); either way it emits a normalised `#rrggbb`.
 */
export function ColorPicker({
  value,
  defaultValue = DEFAULT_COLOR,
  onChange,
  label,
  disabled = false,
  id: idProp,
}: ColorPickerProps) {
  const reactId = useId()
  const id = idProp ?? reactId
  const labelId = `${id}-label`
  const hexId = `${id}-hex`

  const isControlled = value !== undefined
  const seed = value ?? defaultValue
  const initialHex = isValidHex(seed) ? normalizeHex(seed) : DEFAULT_COLOR

  // HSV is the working state — the spectrum and hue slider read it directly.
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(initialHex))
  // The hex field keeps its own draft so the user can type freely without the
  // value being reformatted mid-edit.
  const [hexDraft, setHexDraft] = useState<string>(initialHex)
  // Tracks the last hex we reconciled with the controlled `value` prop so an
  // external change re-seeds the state but our own echoed change does not.
  const [lastValue, setLastValue] = useState<string | undefined>(value)

  const spectrumRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  // Reconcile with a controlled value change during render (the documented
  // pattern for deriving state from props), bounded so it can't loop.
  if (isControlled && value !== lastValue) {
    setLastValue(value)
    if (value && isValidHex(value)) {
      const next = normalizeHex(value)
      setHsv((previous) => seedHsv(next, previous))
      setHexDraft(next)
    }
  }

  const currentHex = hsvToHex(hsv)

  // Single point where the colour actually changes: store HSV, optionally sync
  // the hex field, remember the emitted value and notify the caller when it moved.
  const apply = (next: Hsv, syncDraft: boolean): void => {
    if (disabled) return
    const hex = hsvToHex(next)
    setHsv(next)
    if (syncDraft) setHexDraft(hex)
    setLastValue(hex)
    if (hex !== currentHex) onChange?.(hex)
  }

  const applyFromPoint = (clientX: number, clientY: number): void => {
    const el = spectrumRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // jsdom (and a zero-size element) report an empty rect — bail rather than
    // divide by zero and emit NaN.
    if (rect.width === 0 || rect.height === 0) return
    const x = clamp((clientX - rect.left) / rect.width, 0, 1)
    const y = clamp((clientY - rect.top) / rect.height, 0, 1)
    apply({ h: hsv.h, s: x, v: 1 - y }, true)
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (disabled) return
    draggingRef.current = true
    event.currentTarget.setPointerCapture?.(event.pointerId)
    applyFromPoint(event.clientX, event.clientY)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (!draggingRef.current) return
    applyFromPoint(event.clientX, event.clientY)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    draggingRef.current = false
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const handleSpectrumKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (disabled) return
    const step = event.shiftKey ? 0.1 : 0.01
    let { s, v } = hsv
    switch (event.key) {
      case 'ArrowLeft':
        s -= step
        break
      case 'ArrowRight':
        s += step
        break
      case 'ArrowUp':
        v += step
        break
      case 'ArrowDown':
        v -= step
        break
      default:
        return
    }
    event.preventDefault()
    apply({ h: hsv.h, s: clamp(s, 0, 1), v: clamp(v, 0, 1) }, true)
  }

  const handleHueChange = (event: ChangeEvent<HTMLInputElement>): void => {
    apply({ ...hsv, h: Number(event.target.value) }, true)
  }

  const handleHexChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value
    setHexDraft(text)
    // Commit on every complete, valid hex — but leave the draft untouched so the
    // field keeps showing exactly what is being typed.
    if (isValidHex(text)) {
      apply(seedHsv(normalizeHex(text), hsv), false)
    }
  }

  const handleHexBlur = (): void => {
    // Snap the field back to the canonical form of the committed colour, undoing
    // any half-typed or invalid input.
    setHexDraft(currentHex)
  }

  const rootClassNames = ['chs-color-picker', disabled && 'chs-color-picker--disabled']
    .filter(Boolean)
    .join(' ')

  const spectrumStyle = { '--chs-cp-hue': hsv.h } as CSSProperties
  const cursorStyle: CSSProperties = {
    left: `${hsv.s * 100}%`,
    top: `${(1 - hsv.v) * 100}%`,
  }

  // The spectrum is a 2D control, but `role="slider"` is the closest accessible
  // fit (and is what lets it carry an aria-label without tripping axe). I report
  // saturation as the primary value and spell out both axes in aria-valuetext.
  const saturationPercent = Math.round(hsv.s * 100)
  const brightnessPercent = Math.round(hsv.v * 100)

  return (
    <div
      className={rootClassNames}
      role="group"
      aria-labelledby={label ? labelId : undefined}
      aria-label={label ? undefined : 'Color picker'}
      aria-disabled={disabled || undefined}
    >
      {label && (
        <span className="chs-color-picker__label" id={labelId}>
          {label}
        </span>
      )}

      <div
        className="chs-color-picker__swatch"
        role="img"
        aria-label={`Current color: ${currentHex}`}
        style={{ backgroundColor: currentHex }}
      />

      <div
        ref={spectrumRef}
        className="chs-color-picker__spectrum"
        style={spectrumStyle}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={SPECTRUM_LABEL}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={saturationPercent}
        aria-valuetext={`Saturation ${saturationPercent}%, brightness ${brightnessPercent}%`}
        aria-disabled={disabled || undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleSpectrumKeyDown}
      >
        <span className="chs-color-picker__cursor" style={cursorStyle} />
      </div>

      <input
        className="chs-color-picker__hue"
        type="range"
        min={0}
        max={360}
        value={Math.round(hsv.h)}
        disabled={disabled}
        aria-label="Hue"
        onChange={handleHueChange}
      />

      <div className="chs-color-picker__hex">
        <label htmlFor={hexId} className="chs-color-picker__hex-label">
          Hex color
        </label>
        <input
          id={hexId}
          className="chs-color-picker__hex-input"
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          value={hexDraft}
          disabled={disabled}
          onChange={handleHexChange}
          onBlur={handleHexBlur}
        />
      </div>
    </div>
  )
}

ColorPicker.displayName = 'ColorPicker'
