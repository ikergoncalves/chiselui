/**
 * Internal date helpers for DateRangePicker. They work in local time and compare
 * by calendar day — a date picker never cares about the hours — so timezones and
 * stray time-of-day values can't cause off-by-one bugs. Native `Date` only; the
 * design system ships zero date libraries.
 */

/** Local midnight of `date`, as a fresh Date. Never mutates the argument. */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/** True when both dates land on the same calendar day. */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** `<0` when `a` is an earlier day than `b`, `0` on the same day, `>0` when later. */
export function compareDay(a: Date, b: Date): number {
  return startOfDay(a).getTime() - startOfDay(b).getTime()
}

/** Format as zero-padded MM/DD/YYYY, matching the inputs' placeholder shape. */
export function formatDate(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${mm}/${dd}/${date.getFullYear()}`
}
