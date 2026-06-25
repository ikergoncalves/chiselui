import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself…',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    autoResize: { control: 'boolean' },
    showCount: { control: 'boolean' },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    label: 'Message',
    defaultValue: 'Too short',
    error: 'Please write at least 20 characters.',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Feedback',
    hint: 'Markdown is supported.',
  },
}

export const AutoResize: Story = {
  args: {
    label: 'Notes',
    autoResize: true,
    placeholder: 'Start typing — the field grows with your content…',
  },
}

export const WithCounter: Story = {
  args: {
    label: 'Tweet',
    showCount: true,
    maxLength: 140,
    defaultValue: 'Hello from chiselui!',
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <Textarea {...args} size="sm" label="Small" />
      <Textarea {...args} size="md" label="Medium" />
      <Textarea {...args} size="lg" label="Large" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Bio',
    disabled: true,
    defaultValue: 'This field is read-only.',
  },
}
