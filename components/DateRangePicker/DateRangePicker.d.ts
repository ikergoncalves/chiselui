import { DateRange } from './useDateRange';
export type { DateRange } from './useDateRange';
export interface DateRangePickerProps {
    /** Controlled range value. */
    value?: DateRange;
    /** Fired with the next range on every selection. */
    onChange?: (range: DateRange) => void;
    /** Label rendered above the pair of inputs. */
    label?: string;
    /** Label for the start input. @default 'Start date' */
    startLabel?: string;
    /** Label for the end input. @default 'End date' */
    endLabel?: string;
    /** Placeholder shared by both inputs. @default 'MM/DD/YYYY' */
    placeholder?: string;
    /** Days before this are disabled. */
    minDate?: Date;
    /** Days after this are disabled. */
    maxDate?: Date;
    /** Disable the whole control. @default false */
    disabled?: boolean;
    /** Error message; turns the border danger and flips aria-invalid when set. */
    error?: string;
    /** Caller-supplied id; falls back to a generated, stable one. */
    id?: string;
}
/**
 * DateRangePicker — two inputs that share one month calendar to pick a range.
 *
 * Clicking either input opens the calendar beneath the pair; pick the start, then
 * the end, and a highlighted band fills the days between. The input being chosen
 * is highlighted, a click outside closes the calendar, and full keyboard support
 * lives in CalendarGrid. Built on native Date + Intl with zero date libraries.
 */
export declare function DateRangePicker({ value, onChange, label, startLabel, endLabel, placeholder, minDate, maxDate, disabled, error, id: idProp, }: DateRangePickerProps): import("react").JSX.Element;
export declare namespace DateRangePicker {
    var displayName: string;
}
