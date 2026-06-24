import { ToastContextValue } from './ToastContext';
/**
 * useToast — access the toast queue from anywhere under a `<ToastProvider>`.
 *
 * @example
 * const { toast } = useToast()
 * toast({ message: 'Saved', variant: 'success' })
 */
export declare function useToast(): ToastContextValue;
