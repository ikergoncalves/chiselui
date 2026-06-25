import {
  type KeyboardEvent,
  type ReactNode,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import './Tabs.css'

export interface TabItem {
  /** Stable identifier; ties a tab to its panel and is reported to `onChange`. */
  id: string
  /** Clickable tab label (text, or text + icon). */
  label: ReactNode
  /** Panel body shown when the tab is active. */
  content: ReactNode
  /** Block selection and dim the tab. @default false */
  disabled?: boolean
}

export interface TabsProps {
  /** The tabs to render, in display order. */
  items: TabItem[]
  /** Initially active tab when uncontrolled. Falls back to the first enabled tab. */
  defaultActiveId?: string
  /** Active tab id (controlled). Pair with `onChange`. */
  activeId?: string
  /** Fired with the id of the tab the user activates. */
  onChange?: (id: string) => void
  /** Visual treatment for the tab row. @default 'line' */
  variant?: 'line' | 'pill'
  /** Tab padding and font scale. @default 'md' */
  size?: 'sm' | 'md' | 'lg'
  /** Stretch the tabs to fill the available width. @default false */
  fullWidth?: boolean
}

/**
 * Tabs — an accessible tabbed interface following the WAI-ARIA tabs pattern.
 *
 * Selection works controlled (`activeId` + `onChange`) or uncontrolled
 * (`defaultActiveId`). Activation is *manual*: arrow keys roam focus across the
 * tab row (roving `tabindex`) without switching panels, and Enter/Space commits
 * the focused tab — exactly what the pattern prescribes. The `line` variant draws
 * an underline that slides to the active tab by measuring its box; panels fade in
 * on entry. Both effects fold away under `prefers-reduced-motion` (see Tabs.css).
 */
export function Tabs({
  items,
  defaultActiveId,
  activeId,
  onChange,
  variant = 'line',
  size = 'md',
  fullWidth = false,
}: TabsProps) {
  const baseId = useId()
  const tabId = (id: string) => `${baseId}-tab-${id}`
  const panelId = (id: string) => `${baseId}-panel-${id}`

  const firstEnabledId = items.find((item) => !item.disabled)?.id ?? items[0]?.id ?? ''

  const isControlled = activeId !== undefined
  const [internalActiveId, setInternalActiveId] = useState(
    () => defaultActiveId ?? firstEnabledId,
  )
  const currentActiveId = isControlled ? activeId : internalActiveId
  const currentActiveIndex = Math.max(
    0,
    items.findIndex((item) => item.id === currentActiveId),
  )

  // Roving tabindex: exactly one tab is in the tab sequence at a time. `focusIndex`
  // tracks which one — it starts on the active tab and follows arrow-key roaming.
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [focusIndex, setFocusIndex] = useState(currentActiveIndex)

  // Sliding underline (line variant): measure the active tab and feed its box into
  // inline styles so CSS can transition `left`/`width`. Layout effect so the move
  // is committed before paint and never lags a frame behind a resize/reorder.
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  useLayoutEffect(() => {
    if (variant !== 'line') return
    const button = tabRefs.current[currentActiveIndex]
    if (button) setIndicator({ left: button.offsetLeft, width: button.offsetWidth })
  }, [variant, currentActiveIndex, items, fullWidth, size])

  const activate = (id: string) => {
    if (!isControlled) setInternalActiveId(id)
    onChange?.(id)
  }

  // Indices of the tabs a keyboard user is allowed to land on (disabled ones are
  // skipped per the ARIA pattern).
  const enabledIndices = () =>
    items.reduce<number[]>((acc, item, index) => {
      if (!item.disabled) acc.push(index)
      return acc
    }, [])

  const moveFocus = (index: number) => {
    setFocusIndex(index)
    tabRefs.current[index]?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = enabledIndices()
    if (enabled.length === 0) return
    const pos = enabled.indexOf(focusIndex)

    switch (event.key) {
      case 'ArrowRight': {
        event.preventDefault()
        const next = enabled[(pos + 1) % enabled.length]
        if (next !== undefined) moveFocus(next)
        break
      }
      case 'ArrowLeft': {
        event.preventDefault()
        const prev = enabled[(pos - 1 + enabled.length) % enabled.length]
        if (prev !== undefined) moveFocus(prev)
        break
      }
      case 'Home': {
        event.preventDefault()
        const first = enabled[0]
        if (first !== undefined) moveFocus(first)
        break
      }
      case 'End': {
        event.preventDefault()
        const last = enabled[enabled.length - 1]
        if (last !== undefined) moveFocus(last)
        break
      }
      case 'Enter':
      case ' ': {
        event.preventDefault()
        const item = items[focusIndex]
        if (item && !item.disabled) activate(item.id)
        break
      }
    }
  }

  const rootClass = [
    'chs-tabs',
    `chs-tabs--${variant}`,
    `chs-tabs--${size}`,
    fullWidth && 'chs-tabs--full',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
      <div role="tablist" className="chs-tabs__list" onKeyDown={handleKeyDown}>
        {items.map((item, index) => {
          const selected = item.id === currentActiveId
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              type="button"
              role="tab"
              id={tabId(item.id)}
              className="chs-tabs__tab"
              aria-selected={selected}
              aria-controls={panelId(item.id)}
              tabIndex={index === focusIndex ? 0 : -1}
              disabled={item.disabled}
              onClick={() => {
                setFocusIndex(index)
                activate(item.id)
              }}
            >
              {item.label}
            </button>
          )
        })}
        {variant === 'line' && (
          <span
            className="chs-tabs__indicator"
            aria-hidden="true"
            style={{ left: indicator.left, width: indicator.width }}
          />
        )}
      </div>

      <div className="chs-tabs__panels">
        {items.map((item) => {
          const selected = item.id === currentActiveId
          return (
            <div
              key={item.id}
              role="tabpanel"
              id={panelId(item.id)}
              className="chs-tabs__panel"
              aria-labelledby={tabId(item.id)}
              hidden={!selected}
              tabIndex={selected ? 0 : -1}
            >
              {item.content}
            </div>
          )
        })}
      </div>
    </div>
  )
}

Tabs.displayName = 'Tabs'
