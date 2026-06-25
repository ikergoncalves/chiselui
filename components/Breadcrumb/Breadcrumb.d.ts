import { ReactNode } from '../../../node_modules/react';
export interface BreadcrumbItem {
    /** Visible label for the crumb. */
    label: string;
    /** Navigation target; renders the crumb as an anchor. */
    href?: string;
    /** Click handler; renders the crumb as a button when there is no `href`. */
    onClick?: () => void;
}
export interface BreadcrumbProps {
    /** The trail, from root (first) to current page (last). */
    items: BreadcrumbItem[];
    /** Node placed between crumbs. @default '/' */
    separator?: ReactNode;
    /**
     * Cap on visible crumbs. When `items.length` exceeds it the middle collapses
     * to an ellipsis, keeping the first crumb and the last two.
     */
    maxItems?: number;
}
/**
 * Breadcrumb — hierarchical navigation following the WAI-ARIA breadcrumb pattern:
 * a `<nav aria-label="Breadcrumb">` wrapping an ordered list, with the final crumb
 * marked `aria-current="page"`.
 *
 * Each crumb picks its element from its data: `href` → `<a>`, `onClick` only →
 * `<button>`, neither → plain `<span>`. The last crumb is always a `<span>` since
 * it represents the page you are already on. When `maxItems` is exceeded the middle
 * collapses to a single ellipsis (labelled "more items"), always preserving the
 * first crumb and the final two.
 */
export declare function Breadcrumb({ items, separator, maxItems }: BreadcrumbProps): import("react").JSX.Element;
export declare namespace Breadcrumb {
    var displayName: string;
}
