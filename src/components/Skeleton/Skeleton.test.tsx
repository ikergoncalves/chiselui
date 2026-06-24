import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelector('.chs-skeleton')).toBeInTheDocument()
  })

  it('applies numeric width/height as pixel dimensions via style', () => {
    render(<Skeleton data-testid="sk" width={200} height={20} />)
    const el = screen.getByTestId('sk')
    expect(el).toHaveStyle({ width: '200px', height: '20px' })
  })

  it('passes string dimensions through untouched', () => {
    render(<Skeleton data-testid="sk" width="50%" height="2rem" />)
    const el = screen.getByTestId('sk')
    expect(el).toHaveStyle({ width: '50%', height: '2rem' })
  })

  it('makes the circular variant fully rounded', () => {
    render(<Skeleton data-testid="sk" variant="circular" width={40} />)
    const el = screen.getByTestId('sk')
    expect(el).toHaveClass('chs-skeleton--circular')
    expect(el).toHaveStyle({ borderRadius: '50%' })
  })

  it('stacks the requested number of text lines', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />)
    expect(container.querySelectorAll('.chs-skeleton')).toHaveLength(3)
  })

  it('drops the animation class when animated is false', () => {
    render(<Skeleton data-testid="sk" animated={false} />)
    expect(screen.getByTestId('sk')).not.toHaveClass('chs-skeleton--animated')
  })

  it('animates by default', () => {
    render(<Skeleton data-testid="sk" />)
    expect(screen.getByTestId('sk')).toHaveClass('chs-skeleton--animated')
  })
})
