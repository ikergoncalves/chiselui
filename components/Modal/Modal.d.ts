import { ReactNode } from '../../../node_modules/react';
export type ModalSize = 'sm' | 'md' | 'lg' | 'fullscreen';
export interface ModalProps {
    /** Whether the dialog is mounted and visible. */
    isOpen: boolean;
    /** Called whenever the user requests to close (X, overlay, Escape). */
    onClose: () => void;
    /** Accessible dialog heading, linked via `aria-labelledby`. */
    title: string;
    /** Dialog body. */
    children: ReactNode;
    /** Width preset, or `fullscreen` to fill the viewport. @default 'md' */
    size?: ModalSize;
    /** Close when the backdrop (not the panel) is clicked. @default true */
    closeOnOverlayClick?: boolean;
    /** Close when Escape is pressed. @default true */
    closeOnEsc?: boolean;
}
/**
 * Modal — an accessible dialog rendered in a portal on `document.body`.
 *
 * Focus is trapped inside while open and returned to the trigger on close (see
 * `useFocusTrap`), the body is scroll-locked, and the dialog is wired with
 * `role="dialog"` + `aria-modal` + `aria-labelledby` so assistive tech announces
 * it correctly. Closing is offered three ways — the header X, the backdrop, and
 * Escape — with the latter two individually toggleable.
 */
export declare function Modal({ isOpen, onClose, title, children, size, closeOnOverlayClick, closeOnEsc, }: ModalProps): import('../../../node_modules/react').ReactPortal | null;
export declare namespace Modal {
    var displayName: string;
}
