export interface CalendarDay {
    /** The concrete day this cell represents (local midnight). */
    date: Date;
    /** False for the leading/trailing days borrowed from the adjacent months. */
    isCurrentMonth: boolean;
}
export interface UseCalendarResult {
    /** Four-digit year currently on screen. */
    year: number;
    /** Zero-based month index currently on screen. */
    month: number;
    /** Localized "June 2026" heading for the displayed month. */
    title: string;
    /** The 7-column grid, leading/trailing filler included. */
    days: CalendarDay[];
    prevMonth: () => void;
    nextMonth: () => void;
}
/**
 * useCalendar — owns which month is on screen and expands it into a day grid.
 *
 * The grid always starts on a Sunday: I pull in the trailing days of the previous
 * month to pad the first week, then the leading days of the next month to fill the
 * final week, so every row holds seven cells. Filler cells are flagged
 * `isCurrentMonth: false` so the grid can dim and disable them. Native Date + Intl
 * only — zero date libraries.
 */
export declare function useCalendar(initialDate?: Date | null): UseCalendarResult;
