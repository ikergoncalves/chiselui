export interface ColorPickerProps {
    /** Controlled colour in `#rrggbb` (or `#rgb`) form. Leave undefined to run uncontrolled. */
    value?: string;
    /** Initial colour when uncontrolled. @default '#3b82f6' */
    defaultValue?: string;
    /** Fired with the next colour as a normalised `#rrggbb` string whenever it changes. */
    onChange?: (hex: string) => void;
    /** Group label, rendered above the picker and linked via aria-labelledby. */
    label?: string;
    /** Block interaction and dim the picker. @default false */
    disabled?: boolean;
    /** Caller-supplied id; falls back to a generated, stable one. */
    id?: string;
}
/**
 * ColorPicker — a self-contained HSV colour picker: a 2D saturation/value
 * spectrum, a hue slider, an editable hex field and a live preview swatch.
 *
 * The spectrum is drawn with layered CSS gradients (no canvas), so it is cheap
 * to render and easy to drive from tests. It is operable by pointer drag or by
 * arrow keys (±1%, ±10% with Shift). Works controlled (`value` + `onChange`) or
 * uncontrolled (`defaultValue`); either way it emits a normalised `#rrggbb`.
 */
export declare function ColorPicker({ value, defaultValue, onChange, label, disabled, id: idProp, }: ColorPickerProps): import("react").JSX.Element;
export declare namespace ColorPicker {
    var displayName: string;
}
