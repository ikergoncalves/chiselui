import { useState } from 'react'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Popover } from './Popover'

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

// Controlled wrapper that mirrors `open` into local state while forwarding every
// change to a spy — lets the test assert on the controlled contract.
function ControlledPopover({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <Popover
      content="Panel body"
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        onOpenChange(next)
      }}
    >
      <button>Open</button>
    </Popover>
  )
}

describe('Popover', () => {
  it('does not render the panel initially', () => {
    render(
      <Popover content="Panel body">
        <button>Open</button>
      </Popover>,
    )

    expect(screen.queryByText('Panel body')).not.toBeInTheDocument()
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  it('opens when the trigger is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Popover content="Panel body">
        <button>Open</button>
      </Popover>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))

    expect(await screen.findByText('Panel body')).toBeInTheDocument()
  })

  it('renders the content when open', async () => {
    const user = userEvent.setup()
    render(
      <Popover content={<p>Interactive content</p>}>
        <button>Open</button>
      </Popover>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))

    expect(await screen.findByText('Interactive content')).toBeInTheDocument()
  })

  it('closes when clicking outside the panel', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <Popover content="Panel body">
          <button>Open</button>
        </Popover>
        <button>Outside</button>
      </div>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByText('Panel body')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Outside' }))
    await waitFor(() =>
      expect(screen.queryByText('Panel body')).not.toBeInTheDocument(),
    )
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(
      <Popover content="Panel body">
        <button>Open</button>
      </Popover>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByText('Panel body')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByText('Panel body')).not.toBeInTheDocument(),
    )
  })

  it('uses role="dialog" when trapping focus', async () => {
    const user = userEvent.setup()
    render(
      <Popover content="Panel body" trapFocus>
        <button>Open</button>
      </Popover>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  it('uses role="region" when not trapping focus', async () => {
    const user = userEvent.setup()
    render(
      <Popover content="Panel body">
        <button>Open</button>
      </Popover>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))

    expect(await screen.findByRole('region')).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('calls onOpenChange when opening and closing (controlled)', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<ControlledPopover onOpenChange={onOpenChange} />)

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(onOpenChange).toHaveBeenLastCalledWith(true)
    expect(await screen.findByText('Panel body')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    await waitFor(() =>
      expect(screen.queryByText('Panel body')).not.toBeInTheDocument(),
    )
  })
})
