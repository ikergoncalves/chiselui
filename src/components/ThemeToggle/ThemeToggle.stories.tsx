import type { Meta, StoryObj } from '@storybook/react'
import { ThemeToggle } from './ThemeToggle'

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    defaultTheme: { control: 'inline-radio', options: ['light', 'dark', 'system'] },
    storageKey: { control: 'text' },
  },
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <ThemeToggle size="sm" />
      <ThemeToggle size="md" />
      <ThemeToggle size="lg" />
    </div>
  ),
}

// A locally dark-themed surface: `data-theme="dark"` re-resolves the tokens for
// everything inside, so the toggle shows its moon icon against a dark panel
// without affecting the rest of Storybook.
export const DarkBackground: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        background: 'var(--color-neutral-50)',
      }}
    >
      <ThemeToggle defaultTheme="dark" />
    </div>
  ),
}
