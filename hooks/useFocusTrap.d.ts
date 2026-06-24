import { RefObject } from '../../node_modules/react';
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
export declare function useFocusTrap(ref: RefObject<HTMLElement>, active: boolean): void;
