import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with role="status"', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('exposes the label via aria-label', () => {
    render(<Spinner label="Fetching data" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Fetching data')
  })

  it('defaults the label to "Loading..."', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading...')
  })

  it('applies the matching size class', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    for (const size of sizes) {
      const { unmount } = render(<Spinner size={size} label={`spinner-${size}`} />)
      expect(screen.getByRole('status')).toHaveClass('chs-spinner', `chs-spinner--${size}`)
      unmount()
    }
  })

  it('applies the matching color class', () => {
    const colors = ['primary', 'white', 'current'] as const
    for (const color of colors) {
      const { unmount } = render(<Spinner color={color} label={`spinner-${color}`} />)
      expect(screen.getByRole('status')).toHaveClass(`chs-spinner--${color}`)
      unmount()
    }
  })
})
