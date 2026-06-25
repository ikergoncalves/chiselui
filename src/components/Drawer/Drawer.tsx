import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import './Drawer.css'

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

export type DrawerSize = 'sm' | 'md' | 'lg' | 'full'

export interface DrawerProps {
  /** Whether the panel is mounted and visible. */
  isOpen: boolean
  /** Called whenever the user requests to close (X, overlay, Escape). */
  onClose: () => void
  /** Accessible dialog heading, linked via `aria-labelledby`. */
  title: string
  /** Panel body. */
  children: ReactNode
  /** Edge the panel slides in from. @default 'right' */
  placement?: DrawerPlacement
  /**
   * Panel extent along its sliding axis: width for `left`/`right`, height for
   * `top`/`bottom`. `full` fills the available space. @default 'md'
   */
  size?: DrawerSize
  /** Close when the backdrop (not the panel) is clicked. @default true */
  closeOnOverlayClick?: boolean
  /** Close when Escape is pressed. @default true */
  closeOnEsc?: boolean
  /** Pinned footer area, ideal for primary/secondary actions. */
  footer?: ReactNode
}

/**
 * Drawer — an accessible sliding panel rendered in a portal on `document.body`.
 *
 * It shares the Modal's dialog mechanics: focus is trapped while open and handed
 * back to the trigger on close (see `useFocusTrap`), the body is scroll-locked,
 * and the panel carries `role="dialog"` + `aria-modal` + `aria-labelledby`. The
 * only real difference is presentation — it anchors to one of four viewport edges
 * and slides in from there instead of fading into the centre.
 */
export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  placement = 'right',
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  footer,
}: DrawerProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useFocusTrap(dialogRef, isOpen)

  // Escape-to-close, bound on the document so it works wherever focus sits within
  // the trapped panel.
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

  if (!isOpen) return null

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    // Only the backdrop itself closes — a click that bubbled up from the panel
    // has a different target and is ignored.
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div
      className={`chs-drawer-overlay chs-drawer-overlay--${placement}`}
      onClick={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        className={`chs-drawer chs-drawer--${placement} chs-drawer--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="chs-drawer__header">
          <h2 id={titleId} className="chs-drawer__title">
            {title}
          </h2>
          <button
            type="button"
            className="chs-drawer__close"
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

        <div className="chs-drawer__body">{children}</div>

        {footer && <footer className="chs-drawer__footer">{footer}</footer>}
      </div>
    </div>,
    document.body,
  )
}

Drawer.displayName = 'Drawer'
