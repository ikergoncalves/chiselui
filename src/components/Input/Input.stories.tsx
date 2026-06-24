import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    leftAddon: { control: false },
    rightAddon: { control: false },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    label: 'Email',
    defaultValue: 'not-an-email',
    error: 'Enter a valid email address.',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    hint: 'Use at least 8 characters.',
  },
}

export const WithAddons: Story = {
  args: {
    label: 'Amount',
    leftAddon: '$',
    rightAddon: 'USD',
    placeholder: '0.00',
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    disabled: true,
    defaultValue: 'you@example.com',
  },
}
