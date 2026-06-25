import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Progress } from './Progress'

describe('Progress', () => {
  it('renders with role="progressbar"', () => {
    render(<Progress value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('reflects the value in aria-valuenow', () => {
    render(<Progress value={42} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42')
  })

  it('exposes the min/max bounds', () => {
    render(<Progress value={42} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('auto-generates the aria-label as "N% complete"', () => {
    render(<Progress value={42} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-label',
      '42% complete',
    )
  })

  it('applies a custom label when provided', () => {
    render(<Progress value={42} label="Upload progress" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-label',
      'Upload progress',
    )
  })

  it('renders the linear bar with the correct width via style', () => {
    const { container } = render(<Progress value={40} variant="linear" />)
    const bar = container.querySelector('.chs-progress__bar')
    expect(bar).toBeInTheDocument()
    expect(bar).toHaveStyle({ width: '40%' })
  })

  it('renders an SVG for the circular variant', () => {
    const { container } = render(<Progress value={75} variant="circular" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('shows the percentage when showLabel is set', () => {
    render(<Progress value={42} showLabel />)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('applies the matching color class', () => {
    const colors = ['primary', 'success', 'warning', 'danger'] as const
    for (const color of colors) {
      const { unmount } = render(<Progress value={50} color={color} />)
      expect(screen.getByRole('progressbar')).toHaveClass(`chs-progress--${color}`)
      unmount()
    }
  })

  it('applies the matching size class', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Progress value={50} size={size} />)
      expect(screen.getByRole('progressbar')).toHaveClass(`chs-progress--${size}`)
      unmount()
    }
  })

  it('clamps out-of-range values', () => {
    const { rerender } = render(<Progress value={150} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')

    rerender(<Progress value={-20} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
  })
})
