import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from './Select'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

describe('Select', () => {
  it('renders all of the options', () => {
    render(<Select label="Fruit" options={options} />)
    for (const option of options) {
      expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument()
    }
  })

  it('renders the placeholder as a disabled option', () => {
    render(<Select label="Fruit" options={options} placeholder="Pick one…" />)
    const placeholder = screen.getByRole('option', { name: 'Pick one…' })
    expect(placeholder).toBeDisabled()
    expect(placeholder).toHaveValue('')
  })

  it('shows the error message', () => {
    render(<Select label="Fruit" options={options} error="Selection required" />)
    expect(screen.getByText('Selection required')).toBeInTheDocument()
  })

  it('applies aria-invalid when there is an error', () => {
    render(<Select label="Fruit" options={options} error="Selection required" />)
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('calls onChange when an option is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Select label="Fruit" options={options} onChange={onChange} />)

    await user.selectOptions(screen.getByRole('combobox'), 'banana')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('combobox')).toHaveValue('banana')
  })
})
