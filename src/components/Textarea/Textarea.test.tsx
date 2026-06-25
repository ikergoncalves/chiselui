import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders the label', () => {
    render(<Textarea label="Bio" />)
    expect(screen.getByText('Bio')).toBeInTheDocument()
  })

  it('associates the label with the textarea via htmlFor/id', () => {
    render(<Textarea label="Bio" />)
    const textarea = screen.getByRole('textbox')
    const label = screen.getByText('Bio')

    expect(textarea.id).toBeTruthy()
    expect(label).toHaveAttribute('for', textarea.id)
    expect(screen.getByLabelText('Bio')).toBe(textarea)
  })

  it('shows the error message', () => {
    render(<Textarea label="Bio" error="Bio is required" />)
    expect(screen.getByText('Bio is required')).toBeInTheDocument()
  })

  it('applies aria-invalid when there is an error', () => {
    render(<Textarea label="Bio" error="Bio is required" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows the counter when showCount is set and maxLength is defined', () => {
    render(<Textarea label="Bio" showCount maxLength={100} />)
    expect(screen.getByText('0 / 100')).toBeInTheDocument()
  })

  it('updates the counter as the user types', async () => {
    const user = userEvent.setup()
    render(<Textarea label="Bio" showCount maxLength={100} />)

    await user.type(screen.getByRole('textbox'), 'hello')

    expect(screen.getByText('5 / 100')).toBeInTheDocument()
  })

  it('caps input at maxLength via the native attribute', () => {
    render(<Textarea label="Bio" maxLength={100} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '100')
  })
})
