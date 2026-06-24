import { type RefObject, useEffect } from 'react'

/**
 * useOnClickOutside — runs `handler` when a pointer press lands outside `ref`.
 *
 * I listen on `mousedown` / `touchstart` rather than `click` so the callback
 * fires before focus moves — the right moment to close a dropdown, since a
 * `click` would arrive too late (after the input has already blurred). Pass
 * `enabled = false` to detach the listeners entirely while the surface is closed.
 */
export function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      // No-op when the press is inside the element, or on a detached target.
      if (!el || el.contains(event.target as Node)) return
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, enabled])
}
