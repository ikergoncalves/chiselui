import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup } from './RadioGroup'

const options = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
]

describe('RadioGroup', () => {
  it('renders all of the options', () => {
    render(<RadioGroup name="plan" label="Plan" options={options} />)
    for (const option of options) {
      expect(screen.getByRole('radio', { name: option.label })).toBeInTheDocument()
    }
  })

  it('calls onChange with the correct value when an option is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<RadioGroup name="plan" label="Plan" options={options} onChange={onChange} />)

    await user.click(screen.getByRole('radio', { name: 'Pro' }))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('pro')
  })

  it('does not call onChange for a disabled option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <RadioGroup
        name="plan"
        label="Plan"
        options={[
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro', disabled: true },
        ]}
        onChange={onChange}
      />,
    )

    await user.click(screen.getByRole('radio', { name: 'Pro' }))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('has role="radiogroup"', () => {
    render(<RadioGroup name="plan" label="Plan" options={options} />)
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('links the group label via aria-labelledby', () => {
    render(<RadioGroup name="plan" label="Subscription plan" options={options} />)
    const group = screen.getByRole('radiogroup')

    const labelledBy = group.getAttribute('aria-labelledby')
    expect(labelledBy).toBeTruthy()

    const labelEl = document.getElementById(labelledBy as string)
    expect(labelEl).toHaveTextContent('Subscription plan')
    // The group is also reachable by its accessible name.
    expect(screen.getByRole('radiogroup', { name: 'Subscription plan' })).toBe(group)
  })
})
