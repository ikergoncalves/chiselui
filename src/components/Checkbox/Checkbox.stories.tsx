import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox, type CheckboxProps } from './Checkbox'

// Checkbox is controlled, so the interactive stories wrap it with local state.
// Args flow straight through (size, error, hint, …) so the docs controls work.
function ControlledCheckbox({ checked: initial = false, ...args }: Partial<CheckboxProps>) {
  const [checked, setChecked] = useState(initial)
  return <Checkbox {...args} checked={checked} onChange={setChecked} />
}

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    label: 'Accept terms and conditions',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    onChange: { control: false },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
}

export const Checked: Story = {
  render: (args) => <ControlledCheckbox {...args} checked />,
}

export const Indeterminate: Story = {
  args: { indeterminate: true },
  render: (args) => <ControlledCheckbox {...args} />,
}

export const WithError: Story = {
  args: {
    label: 'I agree to the policy',
    error: 'You must accept before continuing.',
  },
  render: (args) => <ControlledCheckbox {...args} />,
}

export const WithHint: Story = {
  args: {
    label: 'Subscribe to the newsletter',
    hint: 'We send at most one email per week.',
  },
  render: (args) => <ControlledCheckbox {...args} />,
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox {...args} label="Disabled, unchecked" checked={false} />
      <Checkbox {...args} label="Disabled, checked" checked />
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ControlledCheckbox {...args} size="sm" label="Small" checked />
      <ControlledCheckbox {...args} size="md" label="Medium" checked />
    </div>
  ),
}

const FRUITS = [
  { id: 'apple', label: 'Apple' },
  { id: 'banana', label: 'Banana' },
  { id: 'cherry', label: 'Cherry' },
]

// A "select all" parent that goes indeterminate when only some children are on.
function CheckboxGroup() {
  const [selected, setSelected] = useState<string[]>(['apple'])

  const allChecked = selected.length === FRUITS.length
  const someChecked = selected.length > 0 && !allChecked

  const toggle = (id: string, checked: boolean) =>
    setSelected((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Checkbox
        label="Select all fruit"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={(checked) => setSelected(checked ? FRUITS.map((f) => f.id) : [])}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          paddingInlineStart: 24,
        }}
      >
        {FRUITS.map((fruit) => (
          <Checkbox
            key={fruit.id}
            label={fruit.label}
            checked={selected.includes(fruit.id)}
            onChange={(checked) => toggle(fruit.id, checked)}
          />
        ))}
      </div>
    </div>
  )
}

export const Group: Story = {
  render: () => <CheckboxGroup />,
}
