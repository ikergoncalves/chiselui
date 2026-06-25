/**
 * Internal date helpers for DateRangePicker. They work in local time and compare
 * by calendar day — a date picker never cares about the hours — so timezones and
 * stray time-of-day values can't cause off-by-one bugs. Native `Date` only; the
 * design system ships zero date libraries.
 */
/** Local midnight of `date`, as a fresh Date. Never mutates the argument. */
export declare function startOfDay(date: Date): Date;
/** True when both dates land on the same calendar day. */
export declare function isSameDay(a: Date, b: Date): boolean;
/** `<0` when `a` is an earlier day than `b`, `0` on the same day, `>0` when later. */
export declare function compareDay(a: Date, b: Date): number;
/** Format as zero-padded MM/DD/YYYY, matching the inputs' placeholder shape. */
export declare function formatDate(date: Date): string;
