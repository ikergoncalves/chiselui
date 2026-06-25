import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, type RadioGroupProps } from './RadioGroup'

const PLANS: RadioGroupProps['options'] = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
]

// RadioGroup is controlled, so the stories wrap it with local state and let the
// args flow through (label, error, orientation, …) for the docs controls.
function ControlledRadioGroup({ value: initial = 'free', ...args }: Partial<RadioGroupProps>) {
  const [value, setValue] = useState(initial)
  return (
    <RadioGroup
      name="plan"
      label="Subscription plan"
      options={PLANS}
      {...args}
      value={value}
      onChange={setValue}
    />
  )
}

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    name: 'plan',
    label: 'Subscription plan',
    options: PLANS,
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
    onChange: { control: false },
    options: { control: false },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ControlledRadioGroup {...args} />,
}

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => <ControlledRadioGroup {...args} />,
}

export const WithError: Story = {
  args: { error: 'Please choose a plan to continue.' },
  render: (args) => <ControlledRadioGroup {...args} />,
}

export const Disabled: Story = {
  args: {
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro (unavailable in your region)', disabled: true },
      { value: 'enterprise', label: 'Enterprise' },
    ],
  },
  render: (args) => <ControlledRadioGroup {...args} />,
}

export const AllDisabled: Story = {
  args: { disabled: true },
  render: (args) => <ControlledRadioGroup {...args} />,
}
