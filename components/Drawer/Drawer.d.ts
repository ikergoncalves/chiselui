import { ReactNode } from '../../../node_modules/react';
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';
export interface DrawerProps {
    /** Whether the panel is mounted and visible. */
    isOpen: boolean;
    /** Called whenever the user requests to close (X, overlay, Escape). */
    onClose: () => void;
    /** Accessible dialog heading, linked via `aria-labelledby`. */
    title: string;
    /** Panel body. */
    children: ReactNode;
    /** Edge the panel slides in from. @default 'right' */
    placement?: DrawerPlacement;
    /**
     * Panel extent along its sliding axis: width for `left`/`right`, height for
     * `top`/`bottom`. `full` fills the available space. @default 'md'
     */
    size?: DrawerSize;
    /** Close when the backdrop (not the panel) is clicked. @default true */
    closeOnOverlayClick?: boolean;
    /** Close when Escape is pressed. @default true */
    closeOnEsc?: boolean;
    /** Pinned footer area, ideal for primary/secondary actions. */
    footer?: ReactNode;
}
/**
 * Drawer — an accessible sliding panel rendered in a portal on `document.body`.
 *
 * It shares the Modal's dialog mechanics: focus is trapped while open and handed
 * back to the trigger on close (see `useFocusTrap`), the body is scroll-locked,
 * and the panel carries `role="dialog"` + `aria-modal` + `aria-labelledby`. The
 * only real difference is presentation — it anchors to one of four viewport edges
 * and slides in from there instead of fading into the centre.
 */
export declare function Drawer({ isOpen, onClose, title, children, placement, size, closeOnOverlayClick, closeOnEsc, footer, }: DrawerProps): import('../../../node_modules/react').ReactPortal | null;
export declare namespace Drawer {
    var displayName: string;
}
