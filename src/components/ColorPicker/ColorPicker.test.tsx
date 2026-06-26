import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ColorPicker } from './ColorPicker'
import { checkA11y } from '../../../tests/a11y'

describe('ColorPicker', () => {
  it('renders', () => {
    render(<ColorPicker />)
    expect(screen.getByLabelText('Hex color')).toBeInTheDocument()
  })

  it('renders the label when provided', () => {
    render(<ColorPicker label="Brand color" />)
    expect(screen.getByText('Brand color')).toBeInTheDocument()
  })

  it('shows the current hex value in the input', () => {
    render(<ColorPicker value="#3b82f6" />)
    expect(screen.getByLabelText('Hex color')).toHaveValue('#3b82f6')
  })

  it('updates the colour via the hex text input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ColorPicker defaultValue="#3b82f6" onChange={onChange} />)

    const input = screen.getByLabelText('Hex color')
    await user.clear(input)
    await user.type(input, '#ff0000')

    expect(onChange).toHaveBeenLastCalledWith('#ff0000')
  })

  it('does not call onChange for an invalid hex', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ColorPicker defaultValue="#3b82f6" onChange={onChange} />)

    const input = screen.getByLabelText('Hex color')
    await user.clear(input)
    await user.type(input, 'nothex')

    expect(onChange).not.toHaveBeenCalled()
  })

  it('changes the colour when the hue slider moves', () => {
    const onChange = vi.fn()
    render(<ColorPicker defaultValue="#3b82f6" onChange={onChange} />)

    fireEvent.change(screen.getByLabelText('Hue'), { target: { value: '0' } })

    expect(onChange).toHaveBeenCalled()
  })

  it('exposes the current colour on the swatch', () => {
    render(<ColorPicker value="#3b82f6" />)
    expect(
      screen.getByRole('img', { name: 'Current color: #3b82f6' }),
    ).toBeInTheDocument()
  })

  it('associates a label with the hex input', () => {
    render(<ColorPicker />)
    expect(screen.getByLabelText('Hex color')).toHaveAttribute('id')
  })

  it('exposes a keyboard-operable spectrum', () => {
    const { container } = render(<ColorPicker defaultValue="#3b82f6" />)
    const spectrum = container.querySelector('.chs-color-picker__spectrum')
    expect(spectrum).toHaveAttribute('aria-label', 'Color spectrum. Use arrow keys to adjust.')
    expect(spectrum).toHaveAttribute('tabindex', '0')
  })

  it('adjusts the colour from arrow keys on the spectrum', () => {
    const onChange = vi.fn()
    const { container } = render(<ColorPicker defaultValue="#3b82f6" onChange={onChange} />)
    const spectrum = container.querySelector('.chs-color-picker__spectrum')!

    fireEvent.keyDown(spectrum, { key: 'ArrowRight' })

    expect(onChange).toHaveBeenCalled()
  })

  it('ignores interaction when disabled', () => {
    const onChange = vi.fn()
    const { container } = render(
      <ColorPicker defaultValue="#3b82f6" disabled onChange={onChange} />,
    )
    const spectrum = container.querySelector('.chs-color-picker__spectrum')!

    fireEvent.keyDown(spectrum, { key: 'ArrowRight' })

    expect(onChange).not.toHaveBeenCalled()
    expect(spectrum).toHaveAttribute('tabindex', '-1')
  })

  it('reflects a controlled value change', () => {
    const { rerender } = render(<ColorPicker value="#3b82f6" />)
    expect(screen.getByLabelText('Hex color')).toHaveValue('#3b82f6')

    rerender(<ColorPicker value="#ef4444" />)
    expect(screen.getByLabelText('Hex color')).toHaveValue('#ef4444')
    expect(
      screen.getByRole('img', { name: 'Current color: #ef4444' }),
    ).toBeInTheDocument()
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <ColorPicker label="Brand color" defaultValue="#3b82f6" />,
      )
      await checkA11y(container)
    })
  })
})
