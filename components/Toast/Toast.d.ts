import { ToastVariant } from './ToastContext';
export interface ToastProps {
    /** Text content of the toast. */
    message: string;
    /** Semantic style. */
    variant: ToastVariant;
    /** Invoked when the close button is pressed. */
    onDismiss: () => void;
    /** When true, plays the fade-out animation ahead of removal. @default false */
    leaving?: boolean;
}
/**
 * Toast — the visual presentation of a single notification.
 *
 * Stateless on purpose: lifecycle (queueing, auto-dismiss, exit timing) is owned
 * by ToastProvider, so this component just renders what it's told.
 */
export declare function Toast({ message, variant, onDismiss, leaving }: ToastProps): import("react").JSX.Element;
export declare namespace Toast {
    var displayName: string;
}
