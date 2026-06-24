import { describe, it, expect, beforeAll, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip } from './Tooltip'

// Floating UI's `autoUpdate` instantiates a ResizeObserver, which jsdom doesn't
// ship. A no-op stub is enough for these behavioural tests.
beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
})

describe('Tooltip', () => {
  it('appears after hovering the trigger', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Tip text" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    )

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    await user.hover(screen.getByRole('button', { name: 'Trigger' }))

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Tip text')
  })

  it('disappears after the pointer leaves', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Tip text" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    )
    const trigger = screen.getByRole('button', { name: 'Trigger' })

    await user.hover(trigger)
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()

    await user.unhover(trigger)
    await waitFor(() =>
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument(),
    )
  })

  it('renders the bubble with role="tooltip"', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Tip text" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    )

    await user.hover(screen.getByRole('button', { name: 'Trigger' }))
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
  })

  it('appears when the trigger receives focus (keyboard a11y)', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Tip text">
        <button>Trigger</button>
      </Tooltip>,
    )

    // Tab moves focus to the only focusable element, the trigger.
    await user.tab()
    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveFocus()

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Tip text')
  })
})
