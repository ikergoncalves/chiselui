export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'white' | 'current';
export interface SpinnerProps {
    /** Diameter preset of the spinner. @default 'md' */
    size?: SpinnerSize;
    /** Accessible text announced by screen readers. @default 'Loading...' */
    label?: string;
    /**
     * Stroke color source.
     * - `primary` uses `--color-primary`
     * - `white` uses `#ffffff` (for dark surfaces)
     * - `current` inherits `currentColor` from the parent
     * @default 'primary'
     */
    color?: SpinnerColor;
}
/**
 * Spinner — an indeterminate loading indicator.
 *
 * Hand-rolled SVG + a pure CSS animation, so it ships with zero runtime deps.
 * A full-circle track sits under a partial arc; rotating the whole SVG spins the
 * arc around the track. The accessible name is carried by `role="status"` +
 * `aria-label`, so the decorative SVG is hidden from assistive tech.
 */
export declare function Spinner({ size, label, color, }: SpinnerProps): import("react").JSX.Element;
export declare namespace Spinner {
    var displayName: string;
}
