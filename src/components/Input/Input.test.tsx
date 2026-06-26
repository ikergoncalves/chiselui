import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from './Input'
import { checkA11y } from '../../../tests/a11y'

describe('Input', () => {
  it('renders the label', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('associates the label with the input via htmlFor/id', () => {
    render(<Input label="Email" />)
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Email')

    expect(input.id).toBeTruthy()
    expect(label).toHaveAttribute('for', input.id)
    // The clincher: querying by label text resolves to this exact input.
    expect(screen.getByLabelText('Email')).toBe(input)
  })

  it('shows the error message', () => {
    render(<Input label="Email" error="Email is required" />)
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  it('applies aria-invalid when there is an error', () => {
    render(<Input label="Email" error="Email is required" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('applies aria-describedby pointing at the error element', () => {
    render(<Input label="Email" error="Email is required" />)
    const input = screen.getByRole('textbox')

    const describedBy = input.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()

    const errorEl = document.getElementById(describedBy as string)
    expect(errorEl).toHaveTextContent('Email is required')
  })

  it('does not show an error when error is absent', () => {
    render(<Input label="Email" />)
    const input = screen.getByRole('textbox')

    expect(input).not.toHaveAttribute('aria-invalid')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container, unmount } = render(
        <Input label="Email" placeholder="you@example.com" />,
      )
      await checkA11y(container)
      unmount()

      const { container: withError } = render(
        <Input label="Email" error="Required" />,
      )
      await checkA11y(withError)
    })
  })
})
