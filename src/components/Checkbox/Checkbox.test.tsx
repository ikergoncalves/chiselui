import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'
import { checkA11y } from '../../../tests/a11y'

describe('Checkbox', () => {
  it('renders the label', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('calls onChange with true when clicked while unchecked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Accept" checked={false} onChange={onChange} />)

    await user.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('calls onChange with false when clicked while checked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Accept" checked onChange={onChange} />)

    await user.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Accept" disabled onChange={onChange} />)

    await user.click(screen.getByRole('checkbox'))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies the indeterminate property through the ref', () => {
    render(<Checkbox label="Accept" indeterminate />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.indeterminate).toBe(true)
  })

  it('shows the error message', () => {
    render(<Checkbox label="Accept" error="You must accept" />)
    expect(screen.getByText('You must accept')).toBeInTheDocument()
  })

  it('has aria-checked="mixed" when indeterminate', () => {
    render(<Checkbox label="Accept" indeterminate />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed')
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container, unmount } = render(
        <Checkbox label="Accept" checked={false} onChange={() => {}} />,
      )
      await checkA11y(container)
      unmount()

      const { container: indeterminate } = render(
        <Checkbox label="Accept" indeterminate />,
      )
      await checkA11y(indeterminate)
    })
  })
})
