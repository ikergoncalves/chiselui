import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['text', 'circular', 'rectangular'],
    },
    animated: { control: 'boolean' },
    lines: { control: { type: 'number', min: 1, max: 8 } },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const TextBlock: Story = {
  args: { variant: 'text', lines: 3 },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Skeleton {...args} />
    </div>
  ),
}

export const Avatar: Story = {
  args: { variant: 'circular', width: 48, height: 48 },
}

export const Card: Story = {
  args: { variant: 'rectangular', width: 320, height: 160 },
}

export const Static: Story = {
  args: { variant: 'text', lines: 3, animated: false },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Skeleton {...args} />
    </div>
  ),
}

export const ProfileExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', width: 320 }}>
      <Skeleton variant="circular" width={56} height={56} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" lines={2} />
      </div>
    </div>
  ),
}
