import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: {
    size: 'md',
    color: 'primary',
    label: 'Loading...',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'white', 'current'],
    },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Every preset side by side so the diameter steps are easy to compare.
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Spinner {...args} size="xs" />
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
      <Spinner {...args} size="xl" />
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Spinner {...args} color="primary" />
      {/* `white` only reads against a dark surface. */}
      <span
        style={{
          display: 'inline-flex',
          padding: 16,
          borderRadius: 8,
          background: 'var(--color-neutral-900)',
        }}
      >
        <Spinner {...args} color="white" />
      </span>
      {/* `current` inherits the parent text color. */}
      <span style={{ display: 'inline-flex', color: 'var(--color-danger)' }}>
        <Spinner {...args} color="current" />
      </span>
    </div>
  ),
}

export const WithLabel: Story = {
  args: {
    size: 'lg',
    label: 'Saving changes...',
  },
}
