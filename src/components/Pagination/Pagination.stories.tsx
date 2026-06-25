import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Pagination, type PaginationProps } from './Pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    totalItems: 100,
    pageSize: 10,
    siblingCount: 1,
    showFirstLast: true,
    disabled: false,
  },
  argTypes: {
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
    showFirstLast: { control: 'boolean' },
    disabled: { control: 'boolean' },
    currentPage: { control: false },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FewPages: Story = {
  args: {
    totalItems: 25,
    pageSize: 10,
  },
}

export const ManyPages: Story = {
  args: {
    totalItems: 200,
    pageSize: 10,
    // Start mid-trail so both gaps collapse to an ellipsis.
    defaultPage: 10,
  },
}

export const WithSiblings: Story = {
  args: {
    totalItems: 200,
    pageSize: 10,
    defaultPage: 10,
    siblingCount: 2,
  },
}

export const NoFirstLast: Story = {
  args: {
    showFirstLast: false,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

// `useState` owns the page; lives in a named component so the Hooks lint recognizes
// it as a real component (an inline `render` function does not qualify).
function ControlledPagination(args: PaginationProps) {
  const [page, setPage] = useState(1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0 }}>Current page: {page}</p>
      <Pagination {...args} currentPage={page} onChange={setPage} />
    </div>
  )
}

export const Controlled: Story = {
  render: (args) => <ControlledPagination {...args} />,
}
