import { type RefObject, useEffect } from 'react'

// Everything that can take keyboard focus, minus anything explicitly removed from
// the tab order (`tabindex="-1"`) or disabled. I keep this as one selector so the
// trap and the initial-focus logic always agree on what "focusable" means.
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * useFocusTrap — confines keyboard focus inside `ref` while `active` is true.
 *
 * On activation it remembers whatever element currently has focus, then moves
 * focus to the first focusable node inside the container. Tab / Shift+Tab wrap
 * around the container's focusable edges instead of escaping to the page behind
 * it. When the trap releases (deactivates or unmounts) focus is handed back to
 * the element that opened it — exactly the lifecycle a modal dialog needs.
 *
 * I deliberately don't filter by visibility (e.g. `offsetParent`): jsdom never
 * computes layout, so such a check would wrongly hide every node under test.
 */
export function useFocusTrap(ref: RefObject<HTMLElement>, active: boolean): void {
  useEffect(() => {
    if (!active) return
    const container = ref.current
    if (!container) return

    // Remember who had focus so we can give it back when the trap releases.
    const previouslyFocused = document.activeElement as HTMLElement | null

    const getFocusable = (): HTMLElement[] =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))

    // Move focus inside on open: first focusable child, or the container itself
    // (it carries tabindex="-1") when there's nothing focusable yet.
    const focusables = getFocusable()
    const firstFocusable = focusables[0]
    if (firstFocusable) {
      firstFocusable.focus()
    } else {
      container.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const items = getFocusable()
      const first = items[0]
      const last = items[items.length - 1]
      // Nothing to cycle through — swallow Tab so focus can't leave the dialog.
      if (!first || !last) {
        event.preventDefault()
        return
      }

      const activeEl = document.activeElement
      if (event.shiftKey) {
        // Shift+Tab off the first element (or from outside) wraps to the last.
        if (activeEl === first || !container.contains(activeEl)) {
          event.preventDefault()
          last.focus()
        }
      } else {
        // Tab off the last element (or from outside) wraps back to the first.
        if (activeEl === last || !container.contains(activeEl)) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    // Capture phase so the trap runs before any inner handler can act on Tab.
    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      // Restore focus to the opener, guarding against a node that has since
      // detached from the document (e.g. the trigger was unmounted too).
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus()
      }
    }
  }, [ref, active])
}
