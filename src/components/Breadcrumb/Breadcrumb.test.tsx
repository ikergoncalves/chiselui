import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb'
import { checkA11y } from '../../../tests/a11y'

const items: BreadcrumbItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Components', href: '#components' },
  { label: 'Navigation', href: '#navigation' },
  { label: 'Breadcrumb' },
]

describe('Breadcrumb', () => {
  it('renders every item when nothing is collapsed', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Components')).toBeInTheDocument()
    expect(screen.getByText('Navigation')).toBeInTheDocument()
    expect(screen.getByText('Breadcrumb')).toBeInTheDocument()
  })

  it('renders links for items with an href', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#home')
    expect(screen.getByRole('link', { name: 'Components' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Navigation' })).toBeInTheDocument()
  })

  it('renders buttons for items with an onClick', () => {
    const withClick: BreadcrumbItem[] = [
      { label: 'Dashboard', onClick: () => {} },
      { label: 'Reports', onClick: () => {} },
      { label: 'Current' },
    ]
    render(<Breadcrumb items={withClick} />)
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reports' })).toBeInTheDocument()
  })

  it('renders a span for items with neither href nor onClick', () => {
    const plain: BreadcrumbItem[] = [
      { label: 'Plain' },
      { label: 'Last' },
    ]
    render(<Breadcrumb items={plain} />)
    const plainCrumb = screen.getByText('Plain')
    expect(plainCrumb.tagName).toBe('SPAN')
    expect(plainCrumb).not.toHaveAttribute('aria-current')
  })

  it('marks the last item with aria-current="page"', () => {
    render(<Breadcrumb items={items} />)
    const last = screen.getByText('Breadcrumb')
    expect(last.tagName).toBe('SPAN')
    expect(last).toHaveAttribute('aria-current', 'page')
  })

  it('hides separators from assistive tech', () => {
    const { container } = render(<Breadcrumb items={items} />)
    const separators = container.querySelectorAll('.chs-breadcrumb__separator')
    // Four crumbs → three separators, each hidden from the a11y tree.
    expect(separators).toHaveLength(3)
    separators.forEach((sep) => {
      expect(sep).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('collapses the middle items into an ellipsis when maxItems is exceeded', () => {
    const six: BreadcrumbItem[] = [
      { label: 'One', href: '#1' },
      { label: 'Two', href: '#2' },
      { label: 'Three', href: '#3' },
      { label: 'Four', href: '#4' },
      { label: 'Five', href: '#5' },
      { label: 'Six' },
    ]
    render(<Breadcrumb items={six} maxItems={4} />)

    expect(screen.getByLabelText('more items')).toBeInTheDocument()
    // Middle crumbs are gone.
    expect(screen.queryByText('Two')).not.toBeInTheDocument()
    expect(screen.queryByText('Three')).not.toBeInTheDocument()
    expect(screen.queryByText('Four')).not.toBeInTheDocument()
  })

  it('preserves the first and last two items when collapsed', () => {
    const six: BreadcrumbItem[] = [
      { label: 'One', href: '#1' },
      { label: 'Two', href: '#2' },
      { label: 'Three', href: '#3' },
      { label: 'Four', href: '#4' },
      { label: 'Five', href: '#5' },
      { label: 'Six' },
    ]
    render(<Breadcrumb items={six} maxItems={4} />)

    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Five')).toBeInTheDocument()
    expect(screen.getByText('Six')).toBeInTheDocument()
  })

  it('calls onClick when an onClick item is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    const withClick: BreadcrumbItem[] = [
      { label: 'Dashboard', onClick: handleClick },
      { label: 'Current' },
    ]
    render(<Breadcrumb items={withClick} />)

    await user.click(screen.getByRole('button', { name: 'Dashboard' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Breadcrumb
          items={[{ label: 'Home', href: '#' }, { label: 'Current' }]}
        />,
      )
      await checkA11y(container)
    })
  })
})
