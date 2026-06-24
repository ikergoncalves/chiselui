import { type ReactNode } from 'react'
import { type ToastVariant } from './ToastContext'

export interface ToastProps {
  /** Text content of the toast. */
  message: string
  /** Semantic style. */
  variant: ToastVariant
  /** Invoked when the close button is pressed. */
  onDismiss: () => void
  /** When true, plays the fade-out animation ahead of removal. @default false */
  leaving?: boolean
}

// Per-variant glyphs, hand-rolled as inline SVGs to keep the component icon-free
// of any runtime dependency. They inherit the variant accent via `currentColor`.
const ICONS: Record<ToastVariant, ReactNode> = {
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l9 16H3L12 3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 10v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
}

/**
 * Toast — the visual presentation of a single notification.
 *
 * Stateless on purpose: lifecycle (queueing, auto-dismiss, exit timing) is owned
 * by ToastProvider, so this component just renders what it's told.
 */
export function Toast({ message, variant, onDismiss, leaving = false }: ToastProps) {
  const classNames = [
    'chs-toast',
    `chs-toast--${variant}`,
    leaving && 'chs-toast--leaving',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classNames}>
      <span className="chs-toast__icon">{ICONS[variant]}</span>
      <span className="chs-toast__message">{message}</span>
      <button
        type="button"
        className="chs-toast__close"
        aria-label="Dismiss notification"
        onClick={onDismiss}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

Toast.displayName = 'Toast'
