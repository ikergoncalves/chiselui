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

// View Transitions demo: the toggle drives `data-theme` on <html>, so cycling it
// crossfades the whole preview via the View Transitions API (Chrome 111+,
// Safari 18+). Themed surfaces, borders and text make the fade visible; browsers
// without support simply switch instantly. Click the toggle to see it.
export const Transition: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: 320,
        padding: 24,
        borderRadius: 12,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-neutral-900)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <strong style={{ fontSize: 'var(--font-size-lg)' }}>Theme preview</strong>
        <ThemeToggle defaultTheme="light" />
      </div>
      <p style={{ margin: 0, color: 'var(--color-neutral-600)' }}>
        Click the toggle to crossfade between light, dark and system themes.
      </p>
      <div
        style={{
          padding: 12,
          borderRadius: 8,
          background: 'var(--color-neutral-100)',
          color: 'var(--color-neutral-700)',
        }}
      >
        Surface, border and text colours all animate together.
      </div>
    </div>
  ),
}
