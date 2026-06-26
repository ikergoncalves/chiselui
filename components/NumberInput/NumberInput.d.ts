export type NumberInputFormat = 'decimal' | 'currency' | 'percent' | 'unit';
export interface NumberInputProps {
    /** Controlled numeric value. Leave undefined to run uncontrolled. */
    value?: number;
    /** Initial value when uncontrolled. @default 0 */
    defaultValue?: number;
    /** Fired with the next (clamped) value whenever it changes. */
    onChange?: (value: number) => void;
    /** Lower bound; the decrement button and clamping respect it. No floor by default. */
    min?: number;
    /** Upper bound; the increment button and clamping respect it. No ceiling by default. */
    max?: number;
    /** Amount added or removed per step (buttons / arrow keys). @default 1 */
    step?: number;
    /** How the resting value is formatted via Intl.NumberFormat. @default 'decimal' */
    format?: NumberInputFormat;
    /** ISO currency code (e.g. 'BRL', 'USD') — used when `format` is 'currency'. */
    currency?: string;
    /** Unit identifier (e.g. 'kilogram', 'meter') — used when `format` is 'unit'. */
    unit?: string;
    /** Locale passed to Intl.NumberFormat. @default 'pt-BR' */
    locale?: string;
    /** Field label, rendered above the control and linked via htmlFor/id. */
    label?: string;
    /** Error message; turns the border danger and flips aria-invalid when set. */
    error?: string;
    /** Helper text shown below the field while there is no error. */
    hint?: string;
    /** Block interaction and dim the control. @default false */
    disabled?: boolean;
    /** Caller-supplied id; falls back to a generated, stable one. */
    id?: string;
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
export declare function NumberInput({ value, defaultValue, onChange, min, max, step, format, currency, unit, locale, label, error, hint, disabled, id: idProp, }: NumberInputProps): import("react").JSX.Element;
export declare namespace NumberInput {
    var displayName: string;
}
