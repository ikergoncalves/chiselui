import { InputHTMLAttributes, ReactNode } from '../../../node_modules/react';
export type InputSize = 'sm' | 'md' | 'lg';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Field label, rendered above the control and linked via htmlFor/id. */
    label?: string;
    /** Error message; turns the border danger and flips aria-invalid when set. */
    error?: string;
    /** Helper text shown below the field while there is no error. */
    hint?: string;
    /** Node rendered inside the field, before the input (icon, "$", etc.). */
    leftAddon?: ReactNode;
    /** Node rendered inside the field, after the input (unit, action, etc.). */
    rightAddon?: ReactNode;
    /** Control height, padding and font size. @default 'md' */
    size?: InputSize;
}
/**
 * Input — a labelled text field with optional hint, error and inline addons.
 *
 * Accessibility is wired automatically: the label is associated through a
 * `useId`-generated id, `aria-invalid` is set while there is an error, and
 * `aria-describedby` points at whichever message (error or hint) is on screen.
 */
export declare function Input({ label, error, hint, leftAddon, rightAddon, size, id: idProp, className, disabled, ...rest }: InputProps): import("react").JSX.Element;
export declare namespace Input {
    var displayName: string;
}
