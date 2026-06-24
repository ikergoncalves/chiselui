export type SortDirection = 'asc' | 'desc';
export interface UseSortResult<T> {
    /** Data sorted according to the current state (the input order when unsorted). */
    sorted: T[];
    /** The column currently driving the sort, or null when unsorted. */
    sortKey: keyof T | null;
    /** The active direction, or null when unsorted. */
    sortDirection: SortDirection | null;
    /** Cycle a column's sort: asc → desc → unsorted. */
    toggleSort: (key: keyof T) => void;
}
/**
 * useSort — three-state column sorting for tabular data.
 *
 * Clicking a column cycles ascending → descending → unsorted; switching columns
 * starts the new one fresh at ascending. The sorted array is derived (memoized)
 * from `data` and the `{ key, direction }` state, and the original array is never
 * mutated — `Array.prototype.sort` works on a copy.
 */
export declare function useSort<T extends Record<string, unknown>>(data: T[]): UseSortResult<T>;
