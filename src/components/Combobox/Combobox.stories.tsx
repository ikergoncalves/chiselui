import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Combobox, type ComboboxOption, type ComboboxProps } from './Combobox'

const fruits: ComboboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
]

// 100 generated options for the "ManyOptions" scenario.
const manyOptions: ComboboxOption[] = Array.from({ length: 100 }, (_, i) => ({
  value: `option-${i + 1}`,
  label: `Option ${i + 1}`,
}))

// Combobox is controlled; the demo owns the value so selections stick.
function ComboboxDemo({ value: initial, ...args }: Partial<ComboboxProps>) {
  const [value, setValue] = useState<string | undefined>(initial)
  return (
    <div style={{ width: 320 }}>
      <Combobox
        options={fruits}
        label="Favourite fruit"
        {...args}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    options: { control: false },
    onChange: { control: false },
    filterFn: { control: false },
  },
  args: {
    // options / onChange are required props; ComboboxDemo overrides onChange with
    // its own state setter, and stories override options where needed.
    options: fruits,
    onChange: () => {},
    label: 'Favourite fruit',
    placeholder: 'Search fruit…',
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ComboboxDemo {...args} />,
}

export const CustomFilter: Story = {
  args: {
    label: 'Starts-with search',
    placeholder: 'Type the first letters…',
  },
  render: (args) => (
    <ComboboxDemo
      {...args}
      // Match only from the start of the label instead of anywhere within it.
      filterFn={(option, query) =>
        option.label.toLowerCase().startsWith(query.toLowerCase())
      }
    />
  ),
}

export const ManyOptions: Story = {
  args: { label: '100 options', placeholder: 'Search options…' },
  render: (args) => (
    <ComboboxDemo {...args} options={manyOptions} />
  ),
}

export const WithError: Story = {
  args: { error: 'Please choose a fruit.' },
  render: (args) => <ComboboxDemo {...args} />,
}

export const Disabled: Story = {
  args: { disabled: true, value: 'banana' },
  render: (args) => <ComboboxDemo {...args} />,
}
