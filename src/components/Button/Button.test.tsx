import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies the matching class for each variant', () => {
    const variants = ['primary', 'secondary', 'ghost', 'danger'] as const
    for (const variant of variants) {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>)
      expect(screen.getByRole('button', { name: variant })).toHaveClass(
        'chs-button',
        `chs-button--${variant}`,
      )
      unmount()
    }
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Press</Button>)
    await user.click(screen.getByRole('button', { name: 'Press' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Nope' })
    expect(button).toBeDisabled()
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('shows a spinner and blocks clicks while loading', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { container } = render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Saving' })
    expect(button).toHaveClass('chs-button--loading')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(container.querySelector('.chs-button__spinner')).toBeInTheDocument()

    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders the left and right icons', () => {
    render(
      <Button
        leftIcon={<span data-testid="left">L</span>}
        rightIcon={<span data-testid="right">R</span>}
      >
        Labelled
      </Button>,
    )
    expect(screen.getByTestId('left')).toBeInTheDocument()
    expect(screen.getByTestId('right')).toBeInTheDocument()
  })
})
