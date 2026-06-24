import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders its label', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies the matching class for each variant', () => {
    const variants = ['default', 'success', 'warning', 'danger', 'info'] as const
    for (const variant of variants) {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>)
      expect(screen.getByText(variant)).toHaveClass('chs-badge', `chs-badge--${variant}`)
      unmount()
    }
  })

  it('shows the status dot only when `dot` is set', () => {
    const { container, rerender } = render(<Badge>Plain</Badge>)
    expect(container.querySelector('.chs-badge__dot')).not.toBeInTheDocument()

    rerender(<Badge dot>Dotted</Badge>)
    expect(container.querySelector('.chs-badge__dot')).toBeInTheDocument()
  })
})
