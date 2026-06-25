import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch, type SwitchProps } from './Switch'

// Switch is controlled, so the interactive stories wrap it with local state and
// let the args flow through (size, labelPosition, …) for the docs controls.
function ControlledSwitch({ checked: initial = false, ...args }: Partial<SwitchProps>) {
  const [checked, setChecked] = useState(initial)
  return <Switch {...args} checked={checked} onChange={setChecked} />
}

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    label: 'Enable notifications',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    labelPosition: { control: 'inline-radio', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
    onChange: { control: false },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ControlledSwitch {...args} />,
}

export const Checked: Story = {
  render: (args) => <ControlledSwitch {...args} checked />,
}

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Switch {...args} label="Disabled, off" disabled checked={false} />
      <Switch {...args} label="Disabled, on" disabled checked />
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ControlledSwitch {...args} size="sm" label="Small" checked />
      <ControlledSwitch {...args} size="md" label="Medium" checked />
    </div>
  ),
}

export const LabelLeft: Story = {
  args: { labelPosition: 'left' },
  render: (args) => <ControlledSwitch {...args} />,
}

const SETTINGS = [
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'bluetooth', label: 'Bluetooth' },
  { id: 'airplane', label: 'Airplane mode' },
]

// A small settings panel showing several independently-controlled switches.
function SwitchGroup() {
  const [on, setOn] = useState<Record<string, boolean>>({
    wifi: true,
    bluetooth: false,
    airplane: false,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
      {SETTINGS.map((setting) => (
        <Switch
          key={setting.id}
          label={setting.label}
          checked={on[setting.id] ?? false}
          onChange={(checked) => setOn((prev) => ({ ...prev, [setting.id]: checked }))}
        />
      ))}
    </div>
  )
}

export const ControlledGroup: Story = {
  render: () => <SwitchGroup />,
}
