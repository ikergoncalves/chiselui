import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion, type AccordionItem } from './Accordion'
import { checkA11y } from '../../../tests/a11y'

const items: AccordionItem[] = [
  { id: 'a', title: 'Title A', content: 'Content A' },
  { id: 'b', title: 'Title B', content: 'Content B' },
  { id: 'c', title: 'Title C', content: 'Content C' },
]

describe('Accordion', () => {
  it('renders every title', () => {
    render(<Accordion items={items} />)
    expect(screen.getByText('Title A')).toBeInTheDocument()
    expect(screen.getByText('Title B')).toBeInTheDocument()
    expect(screen.getByText('Title C')).toBeInTheDocument()
  })

  it('shows the content of an open item', () => {
    render(<Accordion items={items} defaultOpenIds={['a']} />)
    expect(screen.getByText('Content A')).toBeVisible()
  })

  it('keeps closed items out of the accessibility tree', () => {
    render(<Accordion items={items} defaultOpenIds={['a']} />)
    // Closed regions are aria-hidden (and visually collapsed), so they neither
    // resolve by role nor count as visible.
    expect(screen.queryByRole('region', { name: 'Title B' })).not.toBeInTheDocument()
    expect(screen.getByText('Content B')).not.toBeVisible()
  })

  it('opens an item when its header is clicked', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    await user.click(screen.getByRole('button', { name: 'Title A' }))

    expect(screen.getByText('Content A')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Title A' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('closes an open item when its header is clicked again', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} defaultOpenIds={['a']} />)

    await user.click(screen.getByRole('button', { name: 'Title A' }))

    expect(screen.getByText('Content A')).not.toBeVisible()
    expect(screen.getByRole('button', { name: 'Title A' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('closes the previous item when opening another (allowMultiple=false)', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} defaultOpenIds={['a']} />)

    await user.click(screen.getByRole('button', { name: 'Title B' }))

    expect(screen.getByText('Content B')).toBeVisible()
    expect(screen.getByText('Content A')).not.toBeVisible()
  })

  it('keeps prior items open when opening another (allowMultiple=true)', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} defaultOpenIds={['a']} allowMultiple />)

    await user.click(screen.getByRole('button', { name: 'Title B' }))

    expect(screen.getByText('Content A')).toBeVisible()
    expect(screen.getByText('Content B')).toBeVisible()
  })

  it('does not open a disabled item when clicked', async () => {
    const user = userEvent.setup()
    const withDisabled: AccordionItem[] = [
      { id: 'a', title: 'Title A', content: 'Content A' },
      { id: 'b', title: 'Title B', content: 'Content B', disabled: true },
    ]
    render(<Accordion items={withDisabled} />)

    await user.click(screen.getByRole('button', { name: 'Title B' }))

    expect(screen.getByText('Content B')).not.toBeVisible()
    expect(screen.getByRole('button', { name: 'Title B' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('reflects open state through aria-expanded', () => {
    render(<Accordion items={items} defaultOpenIds={['a']} />)
    expect(screen.getByRole('button', { name: 'Title A' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Title B' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('points aria-controls at the matching region', () => {
    render(<Accordion items={items} defaultOpenIds={['a']} />)
    const header = screen.getByRole('button', { name: 'Title A' })
    const region = screen.getByRole('region', { name: 'Title A' })
    expect(header.getAttribute('aria-controls')).toBe(region.id)
    expect(region).toHaveAttribute('aria-labelledby', header.id)
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Accordion items={items} defaultOpenIds={['a']} />,
      )
      await checkA11y(container)
    })
  })
})
