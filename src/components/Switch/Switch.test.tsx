import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders the label', () => {
    render(<Switch label="Enable notifications" />)
    expect(screen.getByText('Enable notifications')).toBeInTheDocument()
  })

  it('calls onChange with true when switched on', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Switch label="Wi-Fi" checked={false} onChange={onChange} />)

    await user.click(screen.getByRole('switch'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('calls onChange with false when switched off', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Switch label="Wi-Fi" checked onChange={onChange} />)

    await user.click(screen.getByRole('switch'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Switch label="Wi-Fi" disabled onChange={onChange} />)

    await user.click(screen.getByRole('switch'))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('has role="switch"', () => {
    render(<Switch label="Wi-Fi" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('reflects its state through aria-checked', () => {
    const { rerender } = render(<Switch label="Wi-Fi" checked={false} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')

    rerender(<Switch label="Wi-Fi" checked />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })
})
