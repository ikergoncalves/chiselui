import { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, type ModalProps } from './Modal'

// A trigger + Modal pair so we can assert real open/close and focus-return flows.
function Harness(props: Partial<ModalProps>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal
        title="Dialog title"
        {...props}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        {props.children ?? <p>Body content</p>}
      </Modal>
    </>
  )
}

describe('Modal', () => {
  it('renders the title and content when isOpen is true', () => {
    render(
      <Modal isOpen onClose={() => {}} title="My dialog">
        <p>Hello body</p>
      </Modal>,
    )
    expect(screen.getByText('My dialog')).toBeInTheDocument()
    expect(screen.getByText('Hello body')).toBeInTheDocument()
  })

  it('renders nothing when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="My dialog">
        <p>Hello body</p>
      </Modal>,
    )
    expect(screen.queryByText('My dialog')).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('calls onClose when the overlay is clicked (closeOnOverlayClick=true)', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Modal isOpen onClose={onClose} title="My dialog">
        <p>Body</p>
      </Modal>,
    )
    // The overlay is the dialog's parent element.
    const overlay = screen.getByRole('dialog').parentElement as HTMLElement
    await user.click(overlay)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape is pressed (closeOnEsc=true)', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Modal isOpen onClose={onClose} title="My dialog">
        <p>Body</p>
      </Modal>,
    )
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose on overlay click when closeOnOverlayClick=false', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Modal isOpen onClose={onClose} title="My dialog" closeOnOverlayClick={false}>
        <p>Body</p>
      </Modal>,
    )
    const overlay = screen.getByRole('dialog').parentElement as HTMLElement
    await user.click(overlay)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('returns focus to the trigger after closing', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const trigger = screen.getByRole('button', { name: 'Open' })
    await user.click(trigger)
    // Opening moves focus into the dialog (off the trigger).
    expect(trigger).not.toHaveFocus()

    await user.keyboard('{Escape}')
    expect(trigger).toHaveFocus()
  })

  it('has role="dialog" and aria-modal="true"', () => {
    render(
      <Modal isOpen onClose={() => {}} title="My dialog">
        <p>Body</p>
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })
})
