import {
  type ReactElement,
  type ReactNode,
  type Ref,
  cloneElement,
  useState,
} from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useRole,
  useDismiss,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
} from '@floating-ui/react'
import './Tooltip.css'

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps {
  /** The bubble contents. */
  content: ReactNode
  /** Side of the trigger to anchor on; flips automatically near a viewport edge.
   * @default 'top' */
  placement?: TooltipPlacement
  /** Delay in ms before opening on hover. @default 300 */
  delay?: number
  /** The single trigger element. Must accept a ref and DOM props. */
  children: ReactElement
}

/**
 * Tooltip — an accessible, edge-aware hover/focus bubble.
 *
 * Positioning is delegated to Floating UI: `offset` + `flip` + `shift` keep the
 * bubble on-screen even at the viewport edges, which is the whole reason this is
 * the one component allowed an external dependency. Opens on pointer hover (after
 * `delay`) and on keyboard focus, so it's reachable without a mouse.
 */
export function Tooltip({
  content,
  placement = 'top',
  delay = 300,
  children,
}: TooltipProps) {
  const [open, setOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  })

  // Hover drives the pointer experience (with the configured open delay); focus
  // mirrors it for keyboard users. dismiss closes on Escape.
  const hover = useHover(context, { move: false, delay: { open: delay, close: 0 } })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])

  // Preserve any ref the trigger already carries while wiring up the reference.
  const childRef = (children as ReactElement & { ref?: Ref<unknown> }).ref
  const ref = useMergeRefs([refs.setReference, childRef])

  const trigger = cloneElement(
    children,
    getReferenceProps({ ref, ...children.props }),
  )

  return (
    <>
      {trigger}
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className="chs-tooltip"
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  )
}

Tooltip.displayName = 'Tooltip'
