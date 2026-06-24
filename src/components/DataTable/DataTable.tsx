import { type ReactNode } from 'react'
import { Skeleton } from '@/components/Skeleton'
import { Button } from '@/components/Button'
import { useSort, type SortDirection } from '@/hooks/useSort'
import { usePagination } from '@/hooks/usePagination'
import './DataTable.css'

export interface DataTableColumn<T extends Record<string, unknown>> {
  /** Property on the row this column reads from. */
  key: keyof T
  /** Column heading text. */
  header: string
  /** Allow clicking the header to sort by this column. @default false */
  sortable?: boolean
  /** Fixed CSS width for the column (e.g. '120px', '20%'). */
  width?: string
  /** Custom cell renderer; receives the cell value and the whole row. */
  render?: (value: T[keyof T], row: T) => ReactNode
}

export interface DataTableProps<T extends Record<string, unknown>> {
  /** Column definitions, in display order. */
  columns: DataTableColumn<T>[]
  /** The rows to display. */
  data: T[]
  /** Rows per page. @default 10 */
  pageSize?: number
  /** Swap the body for skeleton rows while data loads. @default false */
  loading?: boolean
  /** Shown when there is no data and we aren't loading. */
  emptyMessage?: string
}

// Three-state arrow: both chevrons dim, with the active direction lit. Hidden
// from assistive tech because `aria-sort` on the <th> already conveys the state.
function SortIcon({ direction }: { direction: SortDirection | null }) {
  return (
    <svg
      className="chs-datatable__sort-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M12 5l5 6H7l5-6z"
        className={direction === 'asc' ? 'is-active' : undefined}
      />
      <path
        d="M12 19l-5-6h10l-5 6z"
        className={direction === 'desc' ? 'is-active' : undefined}
      />
    </svg>
  )
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
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 10,
  loading = false,
  emptyMessage = 'No data available.',
}: DataTableProps<T>) {
  const { sorted, sortKey, sortDirection, toggleSort } = useSort(data)
  const { page, currentPage, totalPages, startItem, endItem, totalItems, canPrev, canNext, goToPrev, goToNext } =
    usePagination(sorted, pageSize)

  const isEmpty = !loading && totalItems === 0

  const renderCell = (column: DataTableColumn<T>, row: T): ReactNode => {
    const value = row[column.key]
    if (column.render) return column.render(value, row)
    // Values are `unknown` under the generic constraint; primitives render fine,
    // and a custom `render` is the documented path for anything else.
    return value as ReactNode
  }

  return (
    <div className="chs-datatable">
      <div className="chs-datatable__scroll">
        <table className="chs-datatable__table">
          <thead>
            <tr>
              {columns.map((column) => {
                const isActive = sortKey === column.key
                const ariaSort = column.sortable
                  ? isActive
                    ? sortDirection === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                  : undefined

                return (
                  <th
                    key={String(column.key)}
                    scope="col"
                    style={column.width ? { width: column.width } : undefined}
                    aria-sort={ariaSort}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className="chs-datatable__sort-btn"
                        onClick={() => toggleSort(column.key)}
                      >
                        <span>{column.header}</span>
                        <SortIcon direction={isActive ? sortDirection : null} />
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              // Skeleton placeholder: pageSize rows, one cell per column.
              Array.from({ length: pageSize }, (_, rowIndex) => (
                <tr key={rowIndex} className="chs-datatable__row">
                  {columns.map((column) => (
                    <td key={String(column.key)}>
                      <Skeleton width="80%" />
                    </td>
                  ))}
                </tr>
              ))
            ) : isEmpty ? (
              <tr>
                <td className="chs-datatable__empty" colSpan={columns.length}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              page.map((row, rowIndex) => (
                <tr key={rowIndex} className="chs-datatable__row">
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      style={column.width ? { width: column.width } : undefined}
                    >
                      {renderCell(column, row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && totalItems > 0 && (
        <div className="chs-datatable__footer">
          <span className="chs-datatable__count">
            Showing {startItem}–{endItem} of {totalItems} items
          </span>
          <div className="chs-datatable__pager">
            <Button variant="secondary" size="sm" onClick={goToPrev} disabled={!canPrev}>
              Previous
            </Button>
            <span className="chs-datatable__page-status">
              Page {currentPage} of {totalPages}
            </span>
            <Button variant="secondary" size="sm" onClick={goToNext} disabled={!canNext}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

DataTable.displayName = 'DataTable'
