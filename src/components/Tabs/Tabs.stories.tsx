import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, type TabItem } from './Tabs'

const items: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    content:
      'A high-level summary of the project, its goals, and the people involved.',
  },
  {
    id: 'specs',
    label: 'Specs',
    content: 'Technical specifications: dimensions, materials, and tolerances.',
  },
  {
    id: 'reviews',
    label: 'Reviews',
    content: 'What customers think — ratings, written feedback, and photos.',
  },
]

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    items,
    variant: 'line',
    size: 'md',
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['line', 'pill'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    items: { control: false },
    activeId: { control: false },
    defaultActiveId: { control: false },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Pill: Story = {
  args: {
    variant: 'pill',
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Tabs {...args} size="sm" />
      <Tabs {...args} size="md" />
      <Tabs {...args} size="lg" />
    </div>
  ),
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
}

const iconItems: TabItem[] = [
  {
    id: 'home',
    label: (
      <>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 11l9-8 9 8M5 10v10h14V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Home
      </>
    ),
    content: 'Welcome home — recent activity and quick links live here.',
  },
  {
    id: 'profile',
    label: (
      <>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Profile
      </>
    ),
    content: 'Your name, avatar, and the bio everyone else sees.',
  },
  {
    id: 'settings',
    label: (
      <>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 15a3 3 0 100-6 3 3 0 000 6z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M19 12a7 7 0 00-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 00-1.7-1L16.5 2h-4l-.3 2.6a7 7 0 00-1.7 1l-2.4-1-2 3.4 2 1.6a7 7 0 000 2l-2 1.6 2 3.4 2.4-1a7 7 0 001.7 1l.3 2.4h4l.3-2.6a7 7 0 001.7-1l2.4 1 2-3.4-2-1.6a7 7 0 00.1-1z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Settings
      </>
    ),
    content: 'Preferences, notifications, and account controls.',
  },
]

export const WithIcons: Story = {
  args: {
    items: iconItems,
  },
}

const disabledItems: TabItem[] = [
  { id: 'active', label: 'Active', content: 'This tab is selectable.' },
  {
    id: 'archived',
    label: 'Archived',
    content: 'Archived items — read only.',
    disabled: true,
  },
  { id: 'trash', label: 'Trash', content: 'Deleted items waiting to be purged.' },
]

export const Disabled: Story = {
  args: {
    items: disabledItems,
  },
}

export const Controlled: Story = {
  render: (args) => {
    // `useState` drives selection; the external buttons prove `activeId` wins over
    // any internal state.
    const [active, setActive] = useState('specs')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              style={{ fontWeight: active === item.id ? 700 : 400 }}
            >
              Go to {item.id}
            </button>
          ))}
        </div>
        <Tabs {...args} activeId={active} onChange={setActive} />
      </div>
    )
  },
}
