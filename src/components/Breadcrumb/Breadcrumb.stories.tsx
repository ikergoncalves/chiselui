import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb'

const items: BreadcrumbItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Components', href: '#components' },
  { label: 'Navigation', href: '#navigation' },
  { label: 'Breadcrumb', href: '#breadcrumb' },
]

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    items,
  },
  argTypes: {
    items: { control: false },
    separator: { control: false },
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithOnClick: Story = {
  args: {
    items: [
      { label: 'Dashboard', onClick: () => alert('Go to Dashboard') },
      { label: 'Reports', onClick: () => alert('Go to Reports') },
      { label: 'Q3 Summary' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    separator: '›',
  },
}

export const Collapsed: Story = {
  args: {
    items: [
      { label: 'Home', href: '#home' },
      { label: 'Library', href: '#library' },
      { label: 'Data', href: '#data' },
      { label: 'Reports', href: '#reports' },
      { label: '2026', href: '#2026' },
      { label: 'June', href: '#june' },
    ],
    maxItems: 4,
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home' }],
  },
}
