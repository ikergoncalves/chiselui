import { SelectHTMLAttributes } from '../../../node_modules/react';
export type SelectSize = 'sm' | 'md' | 'lg';
export interface SelectOption {
    /** Value submitted with the form / reported to onChange. */
    value: string;
    /** Human-readable text shown in the dropdown. */
    label: string;
    /** Render the option but block selection. @default false */
    disabled?: boolean;
}
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    /** Field label, rendered above the control and linked via htmlFor/id. */
    label?: string;
    /** The selectable options. */
    options: SelectOption[];
    /** Error message; turns the border danger and flips aria-invalid when set. */
    error?: string;
    /** Greyed, non-selectable first option shown when nothing is chosen. */
    placeholder?: string;
    /** Control height, padding and font size. @default 'md' */
    size?: SelectSize;
}
/**
 * Select — a labelled wrapper around the native `<select>`.
 *
 * Built on the real element (not a custom dropdown) so keyboard, screen-reader
 * and mobile behaviour come for free. Accessibility mirrors Input: id-linked
 * label, `aria-invalid` and `aria-describedby` driven by the error state.
 */
export declare function Select({ label, options, error, placeholder, size, id: idProp, className, disabled, value, defaultValue, ...rest }: SelectProps): import("react").JSX.Element;
export declare namespace Select {
    var displayName: string;
}
