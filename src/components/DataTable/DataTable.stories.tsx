import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../Badge'
import { DataTable, type DataTableColumn } from './DataTable'

// `type` (not `interface`) on purpose: only an object-literal type satisfies the
// `Record<string, unknown>` constraint via TS's implicit index signature.
type User = {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  age: number
}

const roles = ['Admin', 'Editor', 'Viewer'] as const
const firstNames = ['Ada', 'Linus', 'Grace', 'Alan', 'Margaret', 'Dennis', 'Barbara', 'Ken']
const lastNames = ['Lovelace', 'Torvalds', 'Hopper', 'Turing', 'Hamilton', 'Ritchie', 'Liskov', 'Thompson']

function makeUsers(count: number): User[] {
  return Array.from({ length: count }, (_, i) => {
    // Fallbacks keep the modulo index access total under noUncheckedIndexedAccess.
    const first = firstNames[i % firstNames.length] ?? 'Ada'
    const last = lastNames[i % lastNames.length] ?? 'Lovelace'
    const role = roles[i % roles.length] ?? 'Viewer'
    return {
      id: i + 1,
      name: `${first} ${last}`,
      email: `${first}.${last}`.toLowerCase() + '@example.com',
      role,
      age: 24 + ((i * 7) % 40),
    }
  })
}

const columns: DataTableColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', sortable: true, width: '140px' },
  { key: 'age', header: 'Age', sortable: true, width: '80px' },
]

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DataTable<User>>

export default meta
// `typeof meta` would widen T back to Record<string, unknown> and break the
// column/data types, so we instantiate the generic explicitly for the stories.
type Story = StoryObj<typeof DataTable<User>>

export const BasicTable: Story = {
  args: {
    columns: columns.map((c) => ({ ...c, sortable: false })),
    data: makeUsers(5),
  },
}

export const SortableColumns: Story = {
  args: {
    columns,
    data: makeUsers(8),
  },
}

export const Pagination: Story = {
  args: {
    columns,
    data: makeUsers(28),
    pageSize: 10,
  },
}

export const LoadingState: Story = {
  args: {
    columns,
    data: [],
    loading: true,
    pageSize: 5,
  },
}

export const EmptyState: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'No users match your filter.',
  },
}

export const RealData: Story = {
  args: {
    data: makeUsers(20),
    columns: [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email' },
      {
        key: 'role',
        header: 'Role',
        sortable: true,
        width: '140px',
        // Custom renderer: surface the role as a coloured Badge.
        render: (value) => {
          const role = value as User['role']
          const variant =
            role === 'Admin' ? 'info' : role === 'Editor' ? 'success' : 'default'
          return <Badge variant={variant}>{role}</Badge>
        },
      },
      { key: 'age', header: 'Age', sortable: true, width: '80px' },
    ],
  },
}
