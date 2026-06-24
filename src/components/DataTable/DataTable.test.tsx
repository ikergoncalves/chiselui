import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DataTable, type DataTableColumn } from './DataTable'

// `type`, not `interface`, so it satisfies the Record<string, unknown> constraint.
type Person = {
  id: number
  name: string
  age: number
}

const people: Person[] = [
  { id: 1, name: 'Charlie', age: 30 },
  { id: 2, name: 'Alice', age: 25 },
  { id: 3, name: 'Bob', age: 40 },
]

const columns: DataTableColumn<Person>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
]

// Names of the data rows, in render order (header row dropped).
function dataRowNames(): (string | null)[] {
  return screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => row.querySelectorAll('td')[0]?.textContent ?? null)
}

describe('DataTable', () => {
  it('renders the headers', () => {
    render(<DataTable columns={columns} data={people} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
  })

  it('renders the data rows', () => {
    render(<DataTable columns={columns} data={people} />)
    expect(screen.getByText('Charlie')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('sorts ascending when a sortable header is clicked', async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={people} />)

    await user.click(screen.getByRole('button', { name: 'Name' }))

    expect(dataRowNames()).toEqual(['Alice', 'Bob', 'Charlie'])
  })

  it('flips to descending on a second click', async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={people} />)

    const header = screen.getByRole('button', { name: 'Name' })
    await user.click(header)
    await user.click(header)

    expect(dataRowNames()).toEqual(['Charlie', 'Bob', 'Alice'])
  })

  it('advances to the next page when Next is clicked', async () => {
    const user = userEvent.setup()
    const many: Person[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`,
      age: 20 + i,
    }))

    render(<DataTable columns={columns} data={many} pageSize={10} />)
    expect(screen.getByText('Person 1')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(screen.getByText(/Page 2 of 3/)).toBeInTheDocument()
    expect(screen.getByText('Person 11')).toBeInTheDocument()
    expect(screen.queryByText('Person 1')).not.toBeInTheDocument()
  })

  it('shows Skeleton rows when loading', () => {
    const { container } = render(
      <DataTable columns={columns} data={[]} loading pageSize={4} />,
    )
    expect(container.querySelectorAll('.chs-skeleton').length).toBeGreaterThan(0)
  })

  it('shows the empty message when data is empty', () => {
    render(
      <DataTable columns={columns} data={[]} emptyMessage="Nothing here yet." />,
    )
    expect(screen.getByText('Nothing here yet.')).toBeInTheDocument()
  })

  it('uses a column render() for custom cell content', () => {
    const withRender: DataTableColumn<Person>[] = [
      {
        key: 'name',
        header: 'Name',
        render: (_value, row) => <em data-testid="custom">{row.name.toUpperCase()}</em>,
      },
    ]
    render(<DataTable columns={withRender} data={people} />)

    expect(screen.getByText('CHARLIE')).toBeInTheDocument()
    expect(screen.getAllByTestId('custom').length).toBe(people.length)
  })
})
