import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    dot: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { variant: 'default' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Warning' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Danger' },
}

export const Info: Story = {
  args: { variant: 'info', children: 'Info' },
}

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge {...args} variant="default">
        Default
      </Badge>
      <Badge {...args} variant="success">
        Success
      </Badge>
      <Badge {...args} variant="warning">
        Warning
      </Badge>
      <Badge {...args} variant="danger">
        Danger
      </Badge>
      <Badge {...args} variant="info">
        Info
      </Badge>
    </div>
  ),
}

export const WithDot: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge {...args} variant="success" dot>
        Active
      </Badge>
      <Badge {...args} variant="warning" dot>
        Pending
      </Badge>
      <Badge {...args} variant="danger" dot>
        Failed
      </Badge>
      <Badge {...args} variant="info" dot>
        Syncing
      </Badge>
    </div>
  ),
}
