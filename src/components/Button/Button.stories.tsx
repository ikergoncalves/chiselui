import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

// Small decorative icons used by the icon stories — kept inline so the stories
// stay self-contained and dependency-free.
const PlusIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    leftIcon: { control: false },
    rightIcon: { control: false },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Danger: Story = {
  args: { variant: 'danger' },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Saving…' },
}

export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} leftIcon={<PlusIcon />}>
        Add item
      </Button>
      <Button {...args} variant="secondary" rightIcon={<ArrowRightIcon />}>
        Continue
      </Button>
    </div>
  ),
}

export const DisabledState: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} variant="primary" disabled>
        Primary
      </Button>
      <Button {...args} variant="secondary" disabled>
        Secondary
      </Button>
      <Button {...args} variant="ghost" disabled>
        Ghost
      </Button>
      <Button {...args} variant="danger" disabled>
        Danger
      </Button>
    </div>
  ),
}
