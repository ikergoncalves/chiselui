import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ColorPicker } from './ColorPicker'

// The Controlled story owns its colour state here — the project forbids inline
// useState inside a story's render(), so the stateful wrapper lives outside.
function ControlledColorPicker() {
  const [color, setColor] = useState('#3b82f6')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ColorPicker label="Pick a color" value={color} onChange={setColor} />
      <p style={{ fontFamily: 'monospace', margin: 0 }}>Current: {color}</p>
    </div>
  )
}

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    onChange: { control: false },
    value: { control: false },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultValue: '#3b82f6' },
}

export const Red: Story = {
  args: { defaultValue: '#ef4444' },
}

export const Green: Story = {
  args: { defaultValue: '#22c55e' },
}

export const WithLabel: Story = {
  args: { label: 'Brand color', defaultValue: '#3b82f6' },
}

export const Disabled: Story = {
  args: { label: 'Brand color', defaultValue: '#3b82f6', disabled: true },
}

export const Controlled: Story = {
  render: () => <ControlledColorPicker />,
}
