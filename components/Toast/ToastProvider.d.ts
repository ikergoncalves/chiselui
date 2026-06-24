import { ReactNode } from '../../../node_modules/react';
export interface ToastProviderProps {
    children: ReactNode;
    /** Fallback auto-dismiss delay when a toast omits its own. @default 4000 */
    defaultDuration?: number;
}
/**
 * ToastProvider — owns the toast queue and renders it in a portal on `document.body`.
 *
 * Wrap your app once near the root; any descendant can then call `useToast()`.
 * Dismissal is two-phased: a toast is first flagged `leaving` (so the CSS
 * fade-out plays), then removed from state once the animation has had time to run.
 */
export declare function ToastProvider({ children, defaultDuration, }: ToastProviderProps): import("react").JSX.Element;
export declare namespace ToastProvider {
    var displayName: string;
}
