import { useState } from 'react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Combobox, type ComboboxOption } from './Combobox'

const options: ComboboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

// jsdom doesn't implement scrollIntoView; the active-option effect calls it.
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn()
})

// Controlled wrapper so a selection updates the displayed value, like real usage.
function ControlledCombobox(props: {
  onChange?: (value: string) => void
}) {
  const [value, setValue] = useState<string | undefined>(undefined)
  return (
    <Combobox
      label="Fruit"
      options={options}
      value={value}
      onChange={(next) => {
        setValue(next)
        props.onChange?.(next)
      }}
    />
  )
}

describe('Combobox', () => {
  it('renders the label', () => {
    render(<Combobox label="Fruit" options={options} onChange={vi.fn()} />)
    expect(screen.getByText('Fruit')).toBeInTheDocument()
    expect(screen.getByLabelText('Fruit')).toBe(screen.getByRole('combobox'))
  })

  it('filters options as the user types', async () => {
    const user = userEvent.setup()
    render(<Combobox label="Fruit" options={options} onChange={vi.fn()} />)

    await user.type(screen.getByRole('combobox'), 'ban')

    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Cherry' })).not.toBeInTheDocument()
  })

  it('ArrowDown moves the active option to the first item', async () => {
    const user = userEvent.setup()
    render(<Combobox label="Fruit" options={options} onChange={vi.fn()} />)

    const input = screen.getByRole('combobox')
    await user.type(input, '{ArrowDown}')

    const first = screen.getByRole('option', { name: 'Apple' })
    expect(first).toHaveClass('chs-combobox__option--active')
    expect(input).toHaveAttribute('aria-activedescendant', first.id)
  })

  it('Enter confirms the selection and closes the dropdown', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Combobox label="Fruit" options={options} onChange={onChange} />)

    const input = screen.getByRole('combobox')
    await user.type(input, '{ArrowDown}{ArrowDown}{Enter}')

    expect(onChange).toHaveBeenCalledWith('banana')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('Escape closes without selecting', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Combobox label="Fruit" options={options} onChange={onChange} />)

    const input = screen.getByRole('combobox')
    await user.type(input, '{ArrowDown}')
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('calls onChange with the correct value when an option is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ControlledCombobox onChange={onChange} />)

    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.click(screen.getByRole('option', { name: 'Cherry' }))

    expect(onChange).toHaveBeenCalledWith('cherry')
    expect(input).toHaveValue('Cherry')
  })
})
