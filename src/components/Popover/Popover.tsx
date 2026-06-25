import {
  type ReactElement,
  type ReactNode,
  type Ref,
  cloneElement,
  useRef,
  useState,
} from 'react'
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip,
  shift,
  useClick,
  useRole,
  useDismiss,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
} from '@floating-ui/react'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import './Popover.css'

export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

export interface PopoverProps {
  /** Panel contents — may be interactive (forms, menus, lists). */
  content: ReactNode
  /** The single trigger element. Must accept a ref and DOM props. */
  children: ReactElement
  /** Side of the trigger to anchor on; flips automatically near a viewport edge.
   * @default 'bottom' */
  placement?: PopoverPlacement
  /**
   * Confine keyboard focus inside the panel and hand it back to the trigger on
   * close. Switches the panel role to `dialog` (from `region`). Use it for menus
   * and forms. @default false
   */
  trapFocus?: boolean
  /** Close when Escape is pressed. @default true */
  closeOnEsc?: boolean
  /** Distance in px between the trigger and the panel. @default 8 */
  offset?: number
  /** Controlled open state. Provide alongside `onOpenChange`. */
  open?: boolean
  /** Notified on every open/close request (click, Escape, outside press). */
  onOpenChange?: (open: boolean) => void
}

/**
 * Popover — a click-triggered floating panel for interactive content.
 *
 * Where {@link Tooltip} opens on hover and holds a passive label, the Popover
 * opens on click and is meant to host real UI: forms, menus, lists. Positioning
 * is delegated to Floating UI (`offset` + `flip` + `shift`, kept current by
 * `autoUpdate`); `useClick` toggles it, `useDismiss` closes it on Escape and
 * outside press. With `trapFocus` it becomes a `dialog` whose focus is confined
 * by {@link useFocusTrap}; otherwise it's a passive `region`.
 *
 * The trigger is never modified — it's cloned with the reference ref and the
 * interaction props merged in, exactly like the Tooltip.
 */
export function Popover({
  content,
  children,
  placement = 'bottom',
  trapFocus = false,
  closeOnEsc = true,
  offset = 8,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)

  // Controlled when `open` is supplied; otherwise we own the state. Either way the
  // change funnels through `onOpenChange`, so a controlled parent always hears
  // about user-driven open/close (click, Escape, outside press).
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  // The panel itself (inner element), so the focus trap and aria target the node
  // that actually holds the interactive content rather than the positioner.
  const panelRef = useRef<HTMLDivElement>(null)

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offsetMiddleware(offset), flip(), shift({ padding: 8 })],
  })

  // Click toggles the panel; dismiss closes it on outside press and (optionally)
  // Escape. role='dialog' wires the trigger's aria-haspopup/expanded/controls and
  // gives the panel a stable id — its rendered role is narrowed below.
  const click = useClick(context)
  const dismiss = useDismiss(context, { escapeKey: closeOnEsc })
  const role = useRole(context, { role: 'dialog' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  // While trapping, keep keyboard focus inside the panel; the hook restores focus
  // to whatever was focused on open (the trigger) once it deactivates.
  useFocusTrap(panelRef, trapFocus && open)

  // Preserve any ref the trigger already carries while wiring up the reference.
  const childRef = (children as ReactElement & { ref?: Ref<unknown> }).ref
  const referenceRef = useMergeRefs([refs.setReference, childRef])

  const trigger = cloneElement(
    children,
    getReferenceProps({ ref: referenceRef, ...children.props }),
  )

  return (
    <>
      {trigger}
      {open && (
        <FloatingPortal>
          {/* Outer node owns positioning (Floating UI's translate transform); the
              inner panel owns the scale animation, so the two transforms never
              fight over the same element. */}
          <div
            ref={refs.setFloating}
            className="chs-popover-positioner"
            style={floatingStyles}
          >
            <div
              ref={panelRef}
              className="chs-popover"
              tabIndex={-1}
              {...getFloatingProps()}
              // Override useRole's 'dialog' for the non-trapping case, where the
              // panel is a passive region rather than a focus-capturing dialog.
              role={trapFocus ? 'dialog' : 'region'}
              aria-modal={trapFocus || undefined}
            >
              {content}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  )
}

Popover.displayName = 'Popover'
