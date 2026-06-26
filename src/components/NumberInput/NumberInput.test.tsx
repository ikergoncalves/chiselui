import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberInput } from './NumberInput'
import { checkA11y } from '../../../tests/a11y'

// Format expectations are derived from the same engine the component uses, so the
// assertions stay correct across ICU/locale quirks (e.g. the non-breaking space
// pt-BR inserts after a currency symbol).
const decimal = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'decimal', maximumFractionDigits: 20 }).format(n)

describe('NumberInput', () => {
  it('renders the label', () => {
    render(<NumberInput label="Quantity" />)
    expect(screen.getByText('Quantity')).toBeInTheDocument()
  })

  it('shows the formatted value initially', () => {
    render(<NumberInput label="Price" value={1234.56} />)
    expect(screen.getByRole('spinbutton')).toHaveValue(decimal(1234.56))
  })

  it('increments when the "+" button is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput label="Quantity" defaultValue={0} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Increment' }))

    expect(onChange).toHaveBeenCalledWith(1)
    expect(screen.getByRole('spinbutton')).toHaveValue(decimal(1))
  })

  it('decrements when the "-" button is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput label="Quantity" defaultValue={5} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Decrement' }))

    expect(onChange).toHaveBeenCalledWith(4)
    expect(screen.getByRole('spinbutton')).toHaveValue(decimal(4))
  })

  it('disables the "-" button when value === min', () => {
    render(<NumberInput label="Quantity" value={0} min={0} />)
    expect(screen.getByRole('button', { name: 'Decrement' })).toBeDisabled()
  })

  it('disables the "+" button when value === max', () => {
    render(<NumberInput label="Quantity" value={10} max={10} />)
    expect(screen.getByRole('button', { name: 'Increment' })).toBeDisabled()
  })

  it('increments the value with ArrowUp', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput label="Quantity" defaultValue={5} onChange={onChange} />)

    await user.click(screen.getByRole('spinbutton'))
    await user.keyboard('{ArrowUp}')

    expect(onChange).toHaveBeenCalledWith(6)
    expect(screen.getByRole('spinbutton')).toHaveValue(decimal(6))
  })

  it('decrements the value with ArrowDown', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput label="Quantity" defaultValue={5} onChange={onChange} />)

    await user.click(screen.getByRole('spinbutton'))
    await user.keyboard('{ArrowDown}')

    expect(onChange).toHaveBeenCalledWith(4)
    expect(screen.getByRole('spinbutton')).toHaveValue(decimal(4))
  })

  it('calls onChange with the correct value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput label="Quantity" value={10} step={2} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Increment' }))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(12)
  })

  it('does not exceed max when incrementing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <NumberInput label="Quantity" defaultValue={8} max={10} step={5} onChange={onChange} />,
    )

    await user.click(screen.getByRole('button', { name: 'Increment' }))

    expect(onChange).toHaveBeenCalledWith(10)
    expect(screen.getByRole('spinbutton')).toHaveValue(decimal(10))
  })

  it('does not go below min when decrementing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <NumberInput label="Quantity" defaultValue={2} min={0} step={5} onChange={onChange} />,
    )

    await user.click(screen.getByRole('button', { name: 'Decrement' }))

    expect(onChange).toHaveBeenCalledWith(0)
    expect(screen.getByRole('spinbutton')).toHaveValue(decimal(0))
  })

  it('has role="spinbutton"', () => {
    render(<NumberInput label="Quantity" />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('exposes aria-valuemin and aria-valuemax when defined', () => {
    render(<NumberInput label="Quantity" value={50} min={0} max={100} />)
    const spinner = screen.getByRole('spinbutton')
    expect(spinner).toHaveAttribute('aria-valuemin', '0')
    expect(spinner).toHaveAttribute('aria-valuemax', '100')
    expect(spinner).toHaveAttribute('aria-valuenow', '50')
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <NumberInput label="Quantity" defaultValue={5} min={0} max={100} />,
      )
      await checkA11y(container)
    })
  })
})
