import { ReactElement, ReactNode } from '../../../node_modules/react';
export type PopoverPlacement = 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
export interface PopoverProps {
    /** Panel contents — may be interactive (forms, menus, lists). */
    content: ReactNode;
    /** The single trigger element. Must accept a ref and DOM props. */
    children: ReactElement;
    /** Side of the trigger to anchor on; flips automatically near a viewport edge.
     * @default 'bottom' */
    placement?: PopoverPlacement;
    /**
     * Confine keyboard focus inside the panel and hand it back to the trigger on
     * close. Switches the panel role to `dialog` (from `region`). Use it for menus
     * and forms. @default false
     */
    trapFocus?: boolean;
    /** Close when Escape is pressed. @default true */
    closeOnEsc?: boolean;
    /** Distance in px between the trigger and the panel. @default 8 */
    offset?: number;
    /** Controlled open state. Provide alongside `onOpenChange`. */
    open?: boolean;
    /** Notified on every open/close request (click, Escape, outside press). */
    onOpenChange?: (open: boolean) => void;
}
/**
 * Popover — a click-triggered floating panel for interactive content.
 *
 * Where {@link Tooltip} opens on hover and holds a passive label, the Popover
 * opens on click and is meant to host real UI: forms, menus, lists. Positioning
 * is delegated to Floating UI (`offset` + `flip` + `shift`, kept current by
 * `autoUpdate`); `useClick` toggles it, `useDismiss` closes it on Escape and
 * outside press. With `trapFocus` it becomes a `dialog` whose focus is confined
 * by {@link useFocusTrap}; otherwise it's a passive `region`.
 *
 * The trigger is never modified — it's cloned with the reference ref and the
 * interaction props merged in, exactly like the Tooltip.
 */
export declare function Popover({ content, children, placement, trapFocus, closeOnEsc, offset, open: controlledOpen, onOpenChange, }: PopoverProps): import("react").JSX.Element;
export declare namespace Popover {
    var displayName: string;
}
