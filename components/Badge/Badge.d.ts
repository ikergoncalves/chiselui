import { HTMLAttributes, ReactNode } from '../../../node_modules/react';
export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /** Semantic color of the badge. @default 'default' */
    variant?: BadgeVariant;
    /** Control padding and font size. @default 'md' */
    size?: BadgeSize;
    /** Render a status dot before the label. @default false */
    dot?: boolean;
    /** Badge label / content. */
    children: ReactNode;
}
/**
 * Badge — a compact status / category label.
 *
 * Colors are driven by component-scoped custom properties (see Badge.css) so a
 * single class swap recolors both the surface and the optional status dot.
 */
export declare function Badge({ variant, size, dot, className, children, ...rest }: BadgeProps): import("react").JSX.Element;
export declare namespace Badge {
    var displayName: string;
}
