export interface UsePaginationResult<T> {
    /** The rows belonging to the current page. */
    page: T[];
    /** Current 1-based page number. */
    currentPage: number;
    /** Total number of pages (always at least 1). */
    totalPages: number;
    /** 1-based index of the first item on this page (0 when empty). */
    startItem: number;
    /** 1-based index of the last item on this page (0 when empty). */
    endItem: number;
    /** Total item count across every page. */
    totalItems: number;
    /** Whether a previous / next page is available. */
    canPrev: boolean;
    canNext: boolean;
    goToPrev: () => void;
    goToNext: () => void;
    /** Jump to an arbitrary page (clamped into range). */
    setPage: (page: number) => void;
}
/**
 * usePagination — client-side slicing of an in-memory array.
 *
 * Tracks a 1-based current page and returns the matching slice plus the metadata
 * a pager UI needs ("Showing X–Y of Z"). If `data` shrinks below the current
 * page — say a filter removed rows — the page is clamped back into range so the
 * view never strands the user on an empty page.
 */
export declare function usePagination<T>(data: T[], pageSize: number): UsePaginationResult<T>;
