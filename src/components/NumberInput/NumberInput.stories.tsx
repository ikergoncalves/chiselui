import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NumberInput, type NumberInputProps } from './NumberInput'

// NumberInput supports controlled use, so the interactive stories wrap it with local
// state and let the remaining args flow through for the docs controls.
function ControlledNumberInput({ value: initial = 0, ...args }: Partial<NumberInputProps>) {
  const [value, setValue] = useState(initial)
  return <NumberInput {...args} value={value} onChange={setValue} />
}

const meta = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  args: {
    label: 'Quantity',
  },
  argTypes: {
    format: {
      control: 'inline-radio',
      options: ['decimal', 'currency', 'percent', 'unit'],
    },
    disabled: { control: 'boolean' },
    onChange: { control: false },
  },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ControlledNumberInput {...args} value={0} step={1} />,
}

export const Currency: Story = {
  render: (args) => (
    <ControlledNumberInput
      {...args}
      label="Price"
      format="currency"
      currency="BRL"
      value={1234.56}
    />
  ),
}

export const Percent: Story = {
  render: (args) => (
    <ControlledNumberInput
      {...args}
      label="Discount"
      format="percent"
      value={0.45}
      step={0.01}
      min={0}
      max={1}
    />
  ),
}

export const Unit: Story = {
  render: (args) => (
    <ControlledNumberInput
      {...args}
      label="Weight"
      format="unit"
      unit="kilogram"
      value={75}
      step={0.5}
    />
  ),
}

export const WithLimits: Story = {
  render: (args) => (
    <ControlledNumberInput {...args} label="Volume" min={0} max={100} value={50} />
  ),
}

export const WithError: Story = {
  render: (args) => (
    <ControlledNumberInput {...args} value={0} error="Valor inválido" />
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Quantity',
    value: 42,
    disabled: true,
  },
}
