export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export interface ToastOptions {
    /** The text shown in the toast. */
    message: string;
    /** Semantic style of the toast. */
    variant: ToastVariant;
    /** Auto-dismiss delay in ms. Pass 0 to keep it until dismissed. @default 4000 */
    duration?: number;
}
export interface ToastContextValue {
    /** Enqueue a toast. */
    toast: (options: ToastOptions) => void;
}
export declare const ToastContext: import('../../../node_modules/react').Context<ToastContextValue | undefined>;
