import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import './Modal.css'

export type ModalSize = 'sm' | 'md' | 'lg' | 'fullscreen'

export interface ModalProps {
  /** Whether the dialog is mounted and visible. */
  isOpen: boolean
  /** Called whenever the user requests to close (X, overlay, Escape). */
  onClose: () => void
  /** Accessible dialog heading, linked via `aria-labelledby`. */
  title: string
  /** Dialog body. */
  children: ReactNode
  /** Width preset, or `fullscreen` to fill the viewport. @default 'md' */
  size?: ModalSize
  /** Close when the backdrop (not the panel) is clicked. @default true */
  closeOnOverlayClick?: boolean
  /** Close when Escape is pressed. @default true */
  closeOnEsc?: boolean
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
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  // The dialog portals onto `document.body`, which doesn't exist during SSR or
  // static prerendering. Stay unrendered until the component has mounted on the
  // client so the server never touches `document`.
  const [mounted, setMounted] = useState(false)

  useFocusTrap(dialogRef, isOpen)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Escape-to-close, bound on the document so it works wherever focus sits within
  // the trapped dialog.
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeOnEsc, onClose])

  // Scroll-lock the page while open; restore the previous inline value on close so
  // we don't clobber a lock some other component may have set.
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!isOpen || !mounted) return null

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    // Only the backdrop itself closes — a click that bubbled up from the panel
    // has a different target and is ignored.
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div className="chs-modal-overlay" onClick={handleOverlayClick}>
      <div
        ref={dialogRef}
        className={`chs-modal chs-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="chs-modal__header">
          <h2 id={titleId} className="chs-modal__title">
            {title}
          </h2>
          <button
            type="button"
            className="chs-modal__close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="chs-modal__body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

Modal.displayName = 'Modal'
