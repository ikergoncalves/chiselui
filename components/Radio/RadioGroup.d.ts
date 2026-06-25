export interface RadioGroupOption {
    /** Value reported to onChange when this option is selected. */
    value: string;
    /** Human-readable text shown beside the radio. */
    label: string;
    /** Render the option but block its selection. @default false */
    disabled?: boolean;
}
export type RadioGroupOrientation = 'horizontal' | 'vertical';
export interface RadioGroupProps {
    /** Shared name that groups the native radios (and their keyboard nav). */
    name: string;
    /** Currently selected value (controlled). */
    value?: string;
    /** Fired with the newly selected value. */
    onChange?: (value: string) => void;
    /** Group label, linked to the radiogroup via aria-labelledby. */
    label?: string;
    /** The selectable options. */
    options: RadioGroupOption[];
    /** Error message; tints the controls danger and flips aria-invalid when set. */
    error?: string;
    /** Helper text shown below the group while there is no error. */
    hint?: string;
    /** Lay the options out in a row or a column. @default 'vertical' */
    orientation?: RadioGroupOrientation;
    /** Disable every option at once. @default false */
    disabled?: boolean;
    /** Caller-supplied id; falls back to a generated, stable one. */
    id?: string;
}
/**
 * RadioGroup — a labelled set of mutually-exclusive options.
 *
 * Renders a `role="radiogroup"` wrapper around native `<input type="radio">`
 * controls, so arrow-key navigation, focus and form submission all come for
 * free. The group label is linked through `aria-labelledby`, mirroring how the
 * other fields wire `aria-describedby` for their error and hint text.
 */
export declare function RadioGroup({ name, value, onChange, label, options, error, hint, orientation, disabled, id: idProp, }: RadioGroupProps): import("react").JSX.Element;
export declare namespace RadioGroup {
    var displayName: string;
}
