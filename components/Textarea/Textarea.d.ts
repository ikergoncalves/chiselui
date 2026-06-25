import { TextareaHTMLAttributes } from '../../../node_modules/react';
export type TextareaSize = 'sm' | 'md' | 'lg';
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Field label, rendered above the control and linked via htmlFor/id. */
    label?: string;
    /** Error message; turns the border danger and flips aria-invalid when set. */
    error?: string;
    /** Helper text shown below the field while there is no error. */
    hint?: string;
    /** Initial visible row count. @default 3 */
    rows?: number;
    /** Show a "current / max" character counter (needs `maxLength`). @default false */
    showCount?: boolean;
    /** Grow the control to fit its content instead of scrolling. @default false */
    autoResize?: boolean;
    /** Control padding and font size. @default 'md' */
    size?: TextareaSize;
}
/**
 * Textarea — a labelled multi-line field sharing Input's look and a11y wiring.
 *
 * Adds three multi-line conveniences on top of the shared surface: `autoResize`
 * grows the box to its content via `scrollHeight`, `showCount` renders a live
 * character counter against `maxLength`, and the usual `aria-invalid` /
 * `aria-describedby` plumbing points assistive tech at the error or hint.
 */
export declare function Textarea({ label, error, hint, rows, showCount, autoResize, size, id: idProp, className, disabled, maxLength, value, defaultValue, onChange, onInput, ...rest }: TextareaProps): import("react").JSX.Element;
export declare namespace Textarea {
    var displayName: string;
}
