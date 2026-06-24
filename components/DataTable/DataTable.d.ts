import { ReactNode } from '../../../node_modules/react';
export interface DataTableColumn<T extends Record<string, unknown>> {
    /** Property on the row this column reads from. */
    key: keyof T;
    /** Column heading text. */
    header: string;
    /** Allow clicking the header to sort by this column. @default false */
    sortable?: boolean;
    /** Fixed CSS width for the column (e.g. '120px', '20%'). */
    width?: string;
    /** Custom cell renderer; receives the cell value and the whole row. */
    render?: (value: T[keyof T], row: T) => ReactNode;
}
export interface DataTableProps<T extends Record<string, unknown>> {
    /** Column definitions, in display order. */
    columns: DataTableColumn<T>[];
    /** The rows to display. */
    data: T[];
    /** Rows per page. @default 10 */
    pageSize?: number;
    /** Swap the body for skeleton rows while data loads. @default false */
    loading?: boolean;
    /** Shown when there is no data and we aren't loading. */
    emptyMessage?: string;
}
/**
 * DataTable — a generic, sortable, paginated table.
 *
 * Sorting and pagination are delegated to the `useSort` / `usePagination` hooks
 * and composed here (sort first, then page the result). The `T` generic flows
 * through `columns[].key` and `render`, so cell values stay typed without an
 * `any` in sight. Loading swaps in `Skeleton` rows that mirror the real column
 * count; an empty dataset shows `emptyMessage` centred across the table.
 */
export declare function DataTable<T extends Record<string, unknown>>({ columns, data, pageSize, loading, emptyMessage, }: DataTableProps<T>): import("react").JSX.Element;
export declare namespace DataTable {
    var displayName: string;
}
