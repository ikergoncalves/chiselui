import { createContext } from 'react'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastOptions {
  /** The text shown in the toast. */
  message: string
  /** Semantic style of the toast. */
  variant: ToastVariant
  /** Auto-dismiss delay in ms. Pass 0 to keep it until dismissed. @default 4000 */
  duration?: number
}

export interface ToastContextValue {
  /** Enqueue a toast. */
  toast: (options: ToastOptions) => void
}

// Lives in its own module so the provider and the hook can both import it without
// creating an import cycle. Default `undefined` lets useToast detect misuse
// (rendered outside a provider) instead of silently returning a dead value.
export const ToastContext = createContext<ToastContextValue | undefined>(undefined)
