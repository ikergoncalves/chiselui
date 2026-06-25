import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker, type DateRangePickerProps } from './DateRangePicker'
import type { DateRange } from './useDateRange'

const today = new Date()
// A date `n` days from today, used to seed the min/max and disabled scenarios.
const inDays = (n: number): Date => {
  const d = new Date(today)
  d.setDate(d.getDate() + n)
  return d
}

// DateRangePicker is controlled; the demo owns the value so selections stick.
function DateRangePickerDemo({ value: initial, ...args }: Partial<DateRangePickerProps>) {
  const [range, setRange] = useState<DateRange>(initial ?? { start: null, end: null })
  return (
    <div style={{ width: 360 }}>
      <DateRangePicker {...args} value={range} onChange={setRange} />
    </div>
  )
}

const meta = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  argTypes: {
    value: { control: false },
    onChange: { control: false },
    minDate: { control: false },
    maxDate: { control: false },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <DateRangePickerDemo {...args} />,
}

export const WithMinMax: Story = {
  args: { minDate: today, maxDate: inDays(30) },
  render: (args) => <DateRangePickerDemo {...args} />,
}

export const WithLabel: Story = {
  args: { label: 'Trip dates', startLabel: 'Check-in', endLabel: 'Check-out' },
  render: (args) => <DateRangePickerDemo {...args} />,
}

export const Disabled: Story = {
  args: { disabled: true, value: { start: today, end: inDays(5) } },
  render: (args) => <DateRangePickerDemo {...args} />,
}

export const WithError: Story = {
  args: { error: 'Please choose both dates.' },
  render: (args) => <DateRangePickerDemo {...args} />,
}
