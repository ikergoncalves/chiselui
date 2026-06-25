export type CheckboxSize = 'sm' | 'md';
export interface CheckboxProps {
    /** Text shown next to the box; the whole label is clickable. */
    label?: string;
    /** Controlled checked state. @default false */
    checked?: boolean;
    /** Fired with the next checked value whenever the user toggles the box. */
    onChange?: (checked: boolean) => void;
    /** Render the third, "partially selected" state (a dash). @default false */
    indeterminate?: boolean;
    /** Block interaction and dim the control. @default false */
    disabled?: boolean;
    /** Error message; tints the box danger and flips aria-invalid when set. */
    error?: string;
    /** Helper text shown below the control while there is no error. */
    hint?: string;
    /** Box size. @default 'md' */
    size?: CheckboxSize;
    /** Caller-supplied id; falls back to a generated, stable one. */
    id?: string;
}
/**
 * Checkbox — a tri-state checkbox built on a visually-hidden native input.
 *
 * The real `<input type="checkbox">` stays in the DOM (and the a11y tree) for
 * free keyboard, focus and form behaviour; a sibling box renders the tick or
 * dash. `indeterminate` has no HTML attribute, so it is synced through a ref and
 * surfaced to assistive tech as `aria-checked="mixed"`.
 */
export declare function Checkbox({ label, checked, onChange, indeterminate, disabled, error, hint, size, id: idProp, }: CheckboxProps): import("react").JSX.Element;
export declare namespace Checkbox {
    var displayName: string;
}
