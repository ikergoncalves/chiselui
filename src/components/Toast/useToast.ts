import { useContext } from 'react'
import { ToastContext, type ToastContextValue } from './ToastContext'

/**
 * useToast — access the toast queue from anywhere under a `<ToastProvider>`.
 *
 * @example
 * const { toast } = useToast()
 * toast({ message: 'Saved', variant: 'success' })
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  // Throwing here (rather than returning a no-op) makes the missing-provider
  // mistake loud and immediate instead of a toast that silently never appears.
  if (context === undefined) {
    throw new Error('useToast must be used within a <ToastProvider>.')
  }
  return context
}
