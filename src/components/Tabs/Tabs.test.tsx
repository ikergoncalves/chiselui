import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, type TabItem } from './Tabs'
import { checkA11y } from '../../../tests/a11y'

const items: TabItem[] = [
  { id: 'one', label: 'One', content: 'Panel one content' },
  { id: 'two', label: 'Two', content: 'Panel two content' },
  { id: 'three', label: 'Three', content: 'Panel three content' },
]

describe('Tabs', () => {
  it('renders every tab', () => {
    render(<Tabs items={items} />)
    expect(screen.getByRole('tab', { name: 'One' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Two' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Three' })).toBeInTheDocument()
  })

  it('shows the active panel', () => {
    render(<Tabs items={items} defaultActiveId="one" />)
    expect(screen.getByText('Panel one content')).toBeVisible()
  })

  it('hides the inactive panels', () => {
    render(<Tabs items={items} defaultActiveId="one" />)
    // Only the active panel is exposed; the others carry the `hidden` attribute,
    // so they are absent from the accessibility tree and not visible.
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByText('Panel two content')).not.toBeVisible()
  })

  it('switches the panel when another tab is clicked', async () => {
    const user = userEvent.setup()
    render(<Tabs items={items} defaultActiveId="one" />)

    await user.click(screen.getByRole('tab', { name: 'Two' }))

    expect(screen.getByText('Panel two content')).toBeVisible()
    expect(screen.getByText('Panel one content')).not.toBeVisible()
  })

  it('does not switch the panel when a disabled tab is clicked', async () => {
    const user = userEvent.setup()
    const withDisabled: TabItem[] = [
      { id: 'one', label: 'One', content: 'Panel one content' },
      { id: 'two', label: 'Two', content: 'Panel two content', disabled: true },
    ]
    render(<Tabs items={withDisabled} defaultActiveId="one" />)

    await user.click(screen.getByRole('tab', { name: 'Two' }))

    expect(screen.getByText('Panel one content')).toBeVisible()
    expect(screen.getByText('Panel two content')).not.toBeVisible()
  })

  it('moves focus to the next tab with ArrowRight', async () => {
    const user = userEvent.setup()
    render(<Tabs items={items} defaultActiveId="one" />)

    screen.getByRole('tab', { name: 'One' }).focus()
    await user.keyboard('{ArrowRight}')

    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus()
  })

  it('moves focus to the first tab with Home', async () => {
    const user = userEvent.setup()
    render(<Tabs items={items} defaultActiveId="three" />)

    screen.getByRole('tab', { name: 'Three' }).focus()
    await user.keyboard('{Home}')

    expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus()
  })

  it('activates the focused tab on Enter (manual activation)', async () => {
    const user = userEvent.setup()
    render(<Tabs items={items} defaultActiveId="one" />)

    screen.getByRole('tab', { name: 'One' }).focus()
    await user.keyboard('{ArrowRight}')
    // Arrowing only moved focus — panel one is still the active one.
    expect(screen.getByText('Panel one content')).toBeVisible()

    await user.keyboard('{Enter}')
    expect(screen.getByText('Panel two content')).toBeVisible()
  })

  it('marks the active tab with aria-selected', () => {
    render(<Tabs items={items} defaultActiveId="two" />)
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
      'aria-selected',
      'false',
    )
  })

  it('links each tab to its panel via aria-controls', () => {
    render(<Tabs items={items} defaultActiveId="one" />)
    const tab = screen.getByRole('tab', { name: 'One' })
    const panel = screen.getByRole('tabpanel')
    expect(tab.getAttribute('aria-controls')).toBe(panel.id)
    expect(panel).toHaveAttribute('aria-labelledby', tab.id)
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Tabs items={items} />)
      await checkA11y(container)
    })
  })
})
