export interface PaginationProps {
    /** Total number of items across every page. */
    totalItems: number;
    /** Items per page; together with `totalItems` this fixes the page count. */
    pageSize: number;
    /** Active page (controlled). Pair with `onChange`. */
    currentPage?: number;
    /** Initial page when uncontrolled. @default 1 */
    defaultPage?: number;
    /** Fired with the page the user navigates to. */
    onChange?: (page: number) => void;
    /** Pages shown on each side of the current one. @default 1 */
    siblingCount?: number;
    /** Render first / last page jump buttons. @default true */
    showFirstLast?: boolean;
    /** Disable every control. @default false */
    disabled?: boolean;
}
/**
 * Pagination — page navigation built on the `usePagination` hook.
 *
 * Page state is delegated to `usePagination` (uncontrolled mode); pass `currentPage`
 * + `onChange` to drive it from the outside instead. The hook owns the page count and
 * clamping while this component renders the windowed list of page numbers, with
 * ellipses collapsing the gaps, plus previous/next and optional first/last jumps.
 */
export declare function Pagination({ totalItems, pageSize, currentPage: controlledPage, defaultPage, onChange, siblingCount, showFirstLast, disabled, }: PaginationProps): import("react").JSX.Element;
export declare namespace Pagination {
    var displayName: string;
}
