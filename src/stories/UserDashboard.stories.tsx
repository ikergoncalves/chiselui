import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { DataTableColumn } from '../components/DataTable'
import { DataTable } from '../components/DataTable'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Pagination } from '../components/Pagination'
import { Progress } from '../components/Progress'
import { Spinner } from '../components/Spinner'
import { ToastProvider, useToast } from '../components/Toast'

// `type` (not `interface`) on purpose: only an object-literal type satisfies the
// DataTable's `Record<string, unknown>` constraint via TS's implicit index signature.
type User = {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  status: 'Active' | 'Inactive'
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
      // Sprinkle a few inactive users so the danger Badge actually shows up.
      status: i % 3 === 0 ? 'Inactive' : 'Active',
    }
  })
}

// Built once at module scope so paging/sorting never reshuffles the dataset.
const ALL_USERS = makeUsers(20)
const PAGE_SIZE = 5

const columns: DataTableColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  {
    key: 'role',
    header: 'Role',
    width: '120px',
    // Surface the role as a coloured Badge.
    render: (value) => {
      const role = value as User['role']
      const variant =
        role === 'Admin' ? 'info' : role === 'Editor' ? 'success' : 'default'
      return <Badge variant={variant}>{role}</Badge>
    },
  },
  {
    key: 'status',
    header: 'Status',
    width: '120px',
    // Active reads as success, inactive as danger.
    render: (value) => {
      const status = value as User['status']
      return (
        <Badge variant={status === 'Active' ? 'success' : 'danger'}>{status}</Badge>
      )
    },
  },
]

function UserDashboardInner() {
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  // Storage figure kept in state so it reads as live dashboard data.
  const [storageUsed] = useState(68)

  // The standalone Pagination owns the page, so I slice the dataset myself and
  // hand only the current page to the DataTable. The table still renders its own
  // footer, but with a single page of rows it simply reads "Page 1 of 1"; the
  // real navigation is the Pagination below, synced through `currentPage`.
  const pageUsers = ALL_USERS.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const handleRefresh = () => {
    setLoading(true)
    // Fake a 1.5s fetch, then announce completion through the toast queue.
    window.setTimeout(() => {
      setLoading(false)
      toast({ message: 'Data refreshed', variant: 'info' })
    }, 1500)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: 760,
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}
        >
          <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)' }}>Users</h2>
          <Badge variant="default">{ALL_USERS.length}</Badge>
          {loading && <Spinner size="sm" />}
        </div>
        <Button variant="ghost" onClick={handleRefresh}>
          Refresh
        </Button>
      </header>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
      >
        <span
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-neutral-600)',
          }}
        >
          Storage used
        </span>
        <Progress variant="linear" color="primary" value={storageUsed} showLabel />
      </div>

      <DataTable
        columns={columns}
        data={pageUsers}
        loading={loading}
        pageSize={PAGE_SIZE}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          totalItems={ALL_USERS.length}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

/**
 * UserDashboard — DataTable + Badge + Progress + Spinner + Pagination + Button
 * composing into a data dashboard inside a ToastProvider. The standalone
 * Pagination drives the table's rows via external state, and Refresh shows a
 * loading state plus a toast once the fake fetch resolves.
 */
export function UserDashboard() {
  return (
    <ToastProvider>
      <UserDashboardInner />
    </ToastProvider>
  )
}

const meta = {
  title: 'Compositions/User Dashboard',
  component: UserDashboard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof UserDashboard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
