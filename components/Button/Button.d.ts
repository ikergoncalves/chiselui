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
 */
export declare function Button({ variant, size, type, loading, disabled, leftIcon, rightIcon, className, children, onClick, ...rest }: ButtonProps): import("react").JSX.Element;
export declare namespace Button {
    var displayName: string;
}
