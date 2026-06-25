import { ButtonHTMLAttributes, ReactNode } from '../../../node_modules/react';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual emphasis of the button. @default 'primary' */
    variant?: ButtonVariant;
    /** Control padding and font size. @default 'md' */
    size?: ButtonSize;
    /** Show an inline spinner and block interaction. @default false */
    loading?: boolean;
    /** Element rendered before the label (hidden while loading). */
    leftIcon?: ReactNode;
    /** Element rendered after the label (hidden while loading). */
    rightIcon?: ReactNode;
    /** Button label / content. */
    children: ReactNode;
}
/**
 * Button — the canonical chiselui action element.
 *
 * Styled entirely through design tokens (CSS custom properties), so it adapts
 * automatically to any theme that overrides the `--color-*` / `--space-*` vars.
 *
 * Forwards its ref to the underlying `<button>` so it can act as a trigger for
 * ref-based primitives like {@link Tooltip} (which needs the DOM node to anchor
 * its bubble).
 */
export declare const Button: import('../../../node_modules/react').ForwardRefExoticComponent<ButtonProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
