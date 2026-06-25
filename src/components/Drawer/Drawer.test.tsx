import { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Drawer, type DrawerProps } from './Drawer'

// A trigger + Drawer pair so we can assert real open/close and focus-return flows.
function Harness(props: Partial<DrawerProps>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Drawer
        title="Panel title"
        {...props}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        {props.children ?? <p>Body content</p>}
      </Drawer>
    </>
  )
}

describe('Drawer', () => {
  it('renders the title and content when isOpen is true', () => {
    render(
      <Drawer isOpen onClose={() => {}} title="My panel">
        <p>Hello body</p>
      </Drawer>,
    )
    expect(screen.getByText('My panel')).toBeInTheDocument()
    expect(screen.getByText('Hello body')).toBeInTheDocument()
  })

  it('renders nothing when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={() => {}} title="My panel">
        <p>Hello body</p>
      </Drawer>,
    )
    expect(screen.queryByText('My panel')).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('calls onClose when the overlay is clicked (closeOnOverlayClick=true)', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Drawer isOpen onClose={onClose} title="My panel">
        <p>Body</p>
      </Drawer>,
    )
    // The overlay is the dialog's parent element.
    const overlay = screen.getByRole('dialog').parentElement as HTMLElement
    await user.click(overlay)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose on overlay click when closeOnOverlayClick=false', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Drawer isOpen onClose={onClose} title="My panel" closeOnOverlayClick={false}>
        <p>Body</p>
      </Drawer>,
    )
    const overlay = screen.getByRole('dialog').parentElement as HTMLElement
    await user.click(overlay)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onClose when Escape is pressed (closeOnEsc=true)', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Drawer isOpen onClose={onClose} title="My panel">
        <p>Body</p>
      </Drawer>,
    )
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the X button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Drawer isOpen onClose={onClose} title="My panel">
        <p>Body</p>
      </Drawer>,
    )
    await user.click(screen.getByRole('button', { name: 'Close dialog' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('returns focus to the trigger after closing', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const trigger = screen.getByRole('button', { name: 'Open' })
    await user.click(trigger)
    // Opening moves focus into the panel (off the trigger).
    expect(trigger).not.toHaveFocus()

    await user.keyboard('{Escape}')
    expect(trigger).toHaveFocus()
  })

  it('has role="dialog" and aria-modal="true"', () => {
    render(
      <Drawer isOpen onClose={() => {}} title="My panel">
        <p>Body</p>
      </Drawer>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('renders the footer when provided', () => {
    render(
      <Drawer
        isOpen
        onClose={() => {}}
        title="My panel"
        footer={<button>Save</button>}
      >
        <p>Body</p>
      </Drawer>,
    )
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('applies the correct placement class', () => {
    render(
      <Drawer isOpen onClose={() => {}} title="My panel" placement="left">
        <p>Body</p>
      </Drawer>,
    )
    expect(screen.getByRole('dialog')).toHaveClass('chs-drawer--left')
  })
})
