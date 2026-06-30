import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { ToastContext, type ToastOptions } from './ToastContext'
import { Toast } from './Toast'
import './Toast.css'

interface ToastItem extends ToastOptions {
  id: number
  leaving?: boolean
}

const DEFAULT_DURATION = 4000
// How long the fade-out animation runs before the node is dropped from the queue.
// Kept in sync with the `chs-toast--leaving` animation duration in Toast.css.
const EXIT_MS = 200

export interface ToastProviderProps {
  children: ReactNode
  /** Fallback auto-dismiss delay when a toast omits its own. @default 4000 */
  defaultDuration?: number
}

/**
 * ToastProvider — owns the toast queue and renders it in a portal on `document.body`.
 *
 * Wrap your app once near the root; any descendant can then call `useToast()`.
 * Dismissal is two-phased: a toast is first flagged `leaving` (so the CSS
 * fade-out plays), then removed from state once the animation has had time to run.
 */
export function ToastProvider({
  children,
  defaultDuration = DEFAULT_DURATION,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  // Monotonic id source. A ref keeps it stable across renders without re-seeding.
  const idRef = useRef(0)
  // The toast region portals onto `document.body`, which doesn't exist during SSR
  // or static prerendering. Gate the portal behind a mount flag so the server (and
  // the first client render, for hydration parity) renders a pure provider, and the
  // portal only appears once the effect has run on the client.
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const remove = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id))
  }, [])

  const dismiss = useCallback(
    (id: number) => {
      // Phase 1: mark as leaving so the exit animation plays.
      setToasts((current) =>
        current.map((item) => (item.id === id ? { ...item, leaving: true } : item)),
      )
      // Phase 2: actually drop it once the animation has finished.
      window.setTimeout(() => remove(id), EXIT_MS)
    },
    [remove],
  )

  const toast = useCallback(
    ({ message, variant, duration }: ToastOptions) => {
      const id = idRef.current++
      setToasts((current) => [...current, { id, message, variant, duration }])

      const ttl = duration ?? defaultDuration
      // A non-positive duration opts out of auto-dismiss (sticky toast).
      if (ttl > 0) {
        window.setTimeout(() => dismiss(id), ttl)
      }
    },
    [defaultDuration, dismiss],
  )

  // Memoized so context consumers don't re-render every time the queue changes.
  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div className="chs-toast-region" role="status" aria-live="polite">
            {toasts.map((item) => (
              <Toast
                key={item.id}
                message={item.message}
                variant={item.variant}
                leaving={item.leaving}
                onDismiss={() => dismiss(item.id)}
              />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = 'ToastProvider'
