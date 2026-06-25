import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './Progress'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 60,
    variant: 'linear',
    size: 'md',
    color: 'primary',
    showLabel: false,
    animated: false,
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    variant: {
      control: 'inline-radio',
      options: ['linear', 'circular'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'success', 'warning', 'danger'],
    },
    showLabel: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
  // Give the linear bar a sensible width to render against.
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 60 },
}

export const Circular: Story = {
  args: { variant: 'circular', value: 75 },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Progress {...args} variant="linear" size="sm" />
        <Progress {...args} variant="linear" size="md" />
        <Progress {...args} variant="linear" size="lg" />
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Progress {...args} variant="circular" size="sm" />
        <Progress {...args} variant="circular" size="md" />
        <Progress {...args} variant="circular" size="lg" />
      </div>
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Progress {...args} color="primary" />
      <Progress {...args} color="success" />
      <Progress {...args} color="warning" />
      <Progress {...args} color="danger" />
    </div>
  ),
}

export const WithLabel: Story = {
  args: { showLabel: true, value: 42 },
}

export const Animated: Story = {
  args: { variant: 'linear', value: 60, animated: true },
}

// `value=0` + `animated` reads as an open-ended "working on it" state.
export const Indeterminate: Story = {
  args: { variant: 'linear', value: 0, animated: true },
}
