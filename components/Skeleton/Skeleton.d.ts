import { HTMLAttributes } from '../../../node_modules/react';
export type SkeletonVariant = 'text' | 'circular' | 'rectangular';
export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** CSS width. A number is treated as pixels. */
    width?: string | number;
    /** CSS height. A number is treated as pixels. */
    height?: string | number;
    /** Shape of the placeholder. @default 'text' */
    variant?: SkeletonVariant;
    /** Number of stacked lines for the `text` variant. @default 1 */
    lines?: number;
    /** Toggle the shimmer animation. @default true */
    animated?: boolean;
}
/**
 * Skeleton — a token-driven loading placeholder.
 *
 * Renders a single shimmering block, or—for the `text` variant with `lines > 1`
 * —a stack of lines whose last row is shortened to mimic a real paragraph.
 */
export declare function Skeleton({ width, height, variant, lines, animated, className, style, ...rest }: SkeletonProps): import("react").JSX.Element;
export declare namespace Skeleton {
    var displayName: string;
}
