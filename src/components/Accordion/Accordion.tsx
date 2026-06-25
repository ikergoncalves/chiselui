import { type ReactNode, useEffect, useId, useRef, useState } from 'react'
import './Accordion.css'

export interface AccordionItem {
  /** Stable identifier; ties a header to its region and appears in `onChange`. */
  id: string
  /** Header label rendered inside the toggle button. */
  title: ReactNode
  /** Body revealed when the item is open. */
  content: ReactNode
  /** Block toggling and dim the header. @default false */
  disabled?: boolean
}

export interface AccordionProps {
  /** The expandable items, in display order. */
  items: AccordionItem[]
  /** Ids open initially when uncontrolled. @default [] */
  defaultOpenIds?: string[]
  /** Open ids (controlled). Pair with `onChange`. */
  openIds?: string[]
  /** Fired with the full set of open ids after every toggle. */
  onChange?: (openIds: string[]) => void
  /** Allow several items open at once. When false, opening one closes the rest. @default false */
  allowMultiple?: boolean
  /** Visual treatment. @default 'default' */
  variant?: 'default' | 'bordered'
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

interface AccordionPanelProps {
  open: boolean
  id: string
  labelledBy: string
  children: ReactNode
}

/**
 * The animated region for one item. Height has no animatable `auto` keyword, so I
 * drive the slide imperatively: measure the content's `scrollHeight`, pin the
 * region to that pixel value, force a reflow, then transition to the target. On
 * open I settle back to `auto` once the transition ends so the panel keeps fitting
 * content that changes later. `aria-hidden` (not `display:none`) gates the closed
 * state so the collapse can animate while still being hidden from assistive tech.
 */
function AccordionPanel({ open, id, labelledBy, children }: AccordionPanelProps) {
  const regionRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const isFirstRun = useRef(true)

  useEffect(() => {
    const region = regionRef.current
    const inner = innerRef.current
    if (!region || !inner) return

    // First commit: snap to the right state with no animation.
    if (isFirstRun.current) {
      isFirstRun.current = false
      region.style.height = open ? 'auto' : '0px'
      region.style.opacity = open ? '1' : '0'
      return
    }

    const full = inner.scrollHeight

    if (prefersReducedMotion()) {
      region.style.transition = 'none'
      region.style.height = open ? 'auto' : '0px'
      region.style.opacity = open ? '1' : '0'
      return
    }

    if (open) {
      region.style.transition = 'none'
      region.style.height = '0px'
      region.style.opacity = '0'
      // Force a reflow so the browser registers the start frame before we animate.
      void region.offsetHeight
      region.style.transition = 'height 250ms ease-out, opacity 250ms ease-out'
      region.style.height = `${full}px`
      region.style.opacity = '1'

      const onEnd = () => {
        // Release the fixed height so the open panel grows with its content.
        region.style.height = 'auto'
        region.style.transition = ''
        region.removeEventListener('transitionend', onEnd)
      }
      region.addEventListener('transitionend', onEnd)
      return () => region.removeEventListener('transitionend', onEnd)
    }

    // Closing: pin the current height, reflow, then collapse to zero.
    region.style.transition = 'none'
    region.style.height = `${full}px`
    region.style.opacity = '1'
    void region.offsetHeight
    region.style.transition = 'height 200ms ease-in, opacity 200ms ease-in'
    region.style.height = '0px'
    region.style.opacity = '0'
  }, [open])

  return (
    <div
      ref={regionRef}
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!open}
      className="chs-accordion__region"
    >
      <div ref={innerRef} className="chs-accordion__panel">
        {children}
      </div>
    </div>
  )
}

/**
 * Accordion — a set of expandable sections following the WAI-ARIA accordion
 * pattern. State works controlled (`openIds` + `onChange`) or uncontrolled
 * (`defaultOpenIds`). Each header is a real `<button>` carrying `aria-expanded`
 * and `aria-controls`; its region is `role="region"` linked back via
 * `aria-labelledby`. `allowMultiple` decides whether opening one item closes the
 * others. The slide/fade animation honours `prefers-reduced-motion`.
 */
export function Accordion({
  items,
  defaultOpenIds,
  openIds,
  onChange,
  allowMultiple = false,
  variant = 'default',
}: AccordionProps) {
  const baseId = useId()
  const headerId = (id: string) => `${baseId}-header-${id}`
  const regionId = (id: string) => `${baseId}-region-${id}`

  const isControlled = openIds !== undefined
  const [internalOpen, setInternalOpen] = useState<string[]>(
    () => defaultOpenIds ?? [],
  )
  const currentOpen = isControlled ? openIds : internalOpen

  const setOpen = (next: string[]) => {
    if (!isControlled) setInternalOpen(next)
    onChange?.(next)
  }

  const toggle = (id: string) => {
    if (currentOpen.includes(id)) {
      setOpen(currentOpen.filter((openId) => openId !== id))
    } else if (allowMultiple) {
      setOpen([...currentOpen, id])
    } else {
      setOpen([id])
    }
  }

  const rootClass = ['chs-accordion', `chs-accordion--${variant}`].join(' ')

  return (
    <div className={rootClass}>
      {items.map((item) => {
        const open = currentOpen.includes(item.id)
        return (
          <div key={item.id} className="chs-accordion__item">
            <h3 className="chs-accordion__heading">
              <button
                type="button"
                id={headerId(item.id)}
                className="chs-accordion__trigger"
                aria-expanded={open}
                aria-controls={regionId(item.id)}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
              >
                <span className="chs-accordion__title">{item.title}</span>
                <svg
                  className="chs-accordion__icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <AccordionPanel
              open={open}
              id={regionId(item.id)}
              labelledBy={headerId(item.id)}
            >
              {item.content}
            </AccordionPanel>
          </div>
        )
      })}
    </div>
  )
}

Accordion.displayName = 'Accordion'
