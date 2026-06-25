export interface DateRange {
    start: Date | null;
    end: Date | null;
}
/** Which endpoint the next day click will set. */
export type SelectingTarget = 'start' | 'end';
interface UseDateRangeOptions {
    /** Controlled range value. */
    value?: DateRange;
    /** Fired with the next range on every selection. */
    onChange?: (range: DateRange) => void;
    /** Called once a valid end completes the range, so the UI can close itself. */
    onComplete?: () => void;
}
export interface UseDateRangeResult {
    start: Date | null;
    end: Date | null;
    selecting: SelectingTarget;
    setSelecting: (target: SelectingTarget) => void;
    selectDate: (date: Date) => void;
    clearRange: () => void;
    isStart: (date: Date) => boolean;
    isEnd: (date: Date) => boolean;
    isInRange: (date: Date) => boolean;
}
/**
 * useDateRange — the range state and the click-to-select rules.
 *
 * It owns `{ start, end, selecting }` but stays in step with a controlled
 * `value`: every selection updates local state and reports through `onChange`,
 * and an external `value` is mirrored back in. The selection flow is the classic
 * two-click one — pick the start, then the end; clicking an end earlier than the
 * start restarts from that earlier day instead of inverting the range.
 */
export declare function useDateRange({ value, onChange, onComplete, }: UseDateRangeOptions): UseDateRangeResult;
export {};
