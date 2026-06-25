import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from './ThemeToggle'

// The component writes to <html> and localStorage, both of which are shared
// across tests in jsdom — reset them before each so cases stay independent.
beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

describe('ThemeToggle', () => {
  it('renders a button', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('cycles light → dark → system → light on each click', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle defaultTheme="light" />)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')

    await user.click(button) // light → dark
    expect(button).toHaveAttribute('aria-label', 'Switch to system theme')

    await user.click(button) // dark → system
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')

    await user.click(button) // system → light
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('sets data-theme="light" on <html> when the theme is light', () => {
    render(<ThemeToggle defaultTheme="light" />)
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })

  it('sets data-theme="dark" on <html> when the theme is dark', () => {
    render(<ThemeToggle defaultTheme="dark" />)
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('removes data-theme from <html> when the theme is system', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle defaultTheme="dark" />)
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')

    await user.click(screen.getByRole('button')) // dark → system
    expect(document.documentElement).not.toHaveAttribute('data-theme')
  })

  it('persists the selected theme to localStorage', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle defaultTheme="light" storageKey="test-theme" />)

    await user.click(screen.getByRole('button')) // light → dark
    expect(localStorage.getItem('test-theme')).toBe('dark')

    await user.click(screen.getByRole('button')) // dark → system
    expect(localStorage.getItem('test-theme')).toBe('system')
  })

  it('reads the persisted theme on mount', () => {
    localStorage.setItem('chiselui-theme', 'dark')
    render(<ThemeToggle />)

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to system theme',
    )
  })

  it('updates the aria-label to describe the next action', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle defaultTheme="system" />)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')

    await user.click(button) // system → light
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('applies the requested size class', () => {
    render(<ThemeToggle size="lg" />)
    expect(screen.getByRole('button')).toHaveClass('chs-theme-toggle--lg')
  })
})
