export type ProgressVariant = 'linear' | 'circular';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressColor = 'primary' | 'success' | 'warning' | 'danger';
export interface ProgressProps {
    /** Current progress, clamped to the 0–100 range. */
    value: number;
    /** Render as a horizontal bar or an SVG ring. @default 'linear' */
    variant?: ProgressVariant;
    /** Track thickness / ring diameter preset. @default 'md' */
    size?: ProgressSize;
    /** Semantic color of the indicator. @default 'primary' */
    color?: ProgressColor;
    /** Show the "N%" readout (beside the bar / inside the ring). @default false */
    showLabel?: boolean;
    /** Custom `aria-label`. @default 'N% complete' (auto-generated). */
    label?: string;
    /** Animate the linear bar with a shimmer sweep. @default false */
    animated?: boolean;
}
/**
 * Progress — a determinate progress indicator in two shapes.
 *
 * `linear` paints a token-driven bar whose width tracks `value`; `circular`
 * draws an SVG ring whose `stroke-dashoffset` reveals the arc. Both expose the
 * standard `progressbar` ARIA contract so screen readers announce the value.
 */
export declare function Progress({ value, variant, size, color, showLabel, label, animated, }: ProgressProps): import("react").JSX.Element;
export declare namespace Progress {
    var displayName: string;
}
