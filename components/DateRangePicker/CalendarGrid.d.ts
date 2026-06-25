import { CalendarDay } from './useCalendar';
interface CalendarGridProps {
    days: CalendarDay[];
    minDate?: Date;
    maxDate?: Date;
    /** True once both ends exist, so start/end cells square off against the band. */
    ranged: boolean;
    onSelect: (date: Date) => void;
    isStart: (date: Date) => boolean;
    isEnd: (date: Date) => boolean;
    isInRange: (date: Date) => boolean;
}
/**
 * CalendarGrid — the 7×N button grid. Internal to DateRangePicker (never exported
 * from the barrel). It owns roving-tabindex keyboard navigation: exactly one day
 * is tabbable, the arrow keys walk focus across the grid (skipping disabled
 * cells), and Enter/Space fall through to the native button click that selects.
 */
export declare function CalendarGrid({ days, minDate, maxDate, ranged, onSelect, isStart, isEnd, isInRange, }: CalendarGridProps): import("react").JSX.Element;
export declare namespace CalendarGrid {
    var displayName: string;
}
export {};
