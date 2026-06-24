import { RefObject } from '../../node_modules/react';
/**
 * useOnClickOutside — runs `handler` when a pointer press lands outside `ref`.
 *
 * I listen on `mousedown` / `touchstart` rather than `click` so the callback
 * fires before focus moves — the right moment to close a dropdown, since a
 * `click` would arrive too late (after the input has already blurred). Pass
 * `enabled = false` to detach the listeners entirely while the surface is closed.
 */
export declare function useOnClickOutside(ref: RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void, enabled?: boolean): void;
