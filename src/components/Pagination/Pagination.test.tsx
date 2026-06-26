import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './Pagination'
import { checkA11y } from '../../../tests/a11y'

describe('Pagination', () => {
  it('renders the previous and next buttons', () => {
    render(<Pagination totalItems={100} pageSize={10} />)
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument()
  })

  it('disables previous on the first page', () => {
    render(<Pagination totalItems={100} pageSize={10} />)
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
  })

  it('disables next on the last page', () => {
    render(
      <Pagination totalItems={100} pageSize={10} currentPage={10} onChange={() => {}} />,
    )
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
  })

  it('advances to page 2 when Next is clicked', async () => {
    const user = userEvent.setup()
    render(<Pagination totalItems={100} pageSize={10} />)

    await user.click(screen.getByRole('button', { name: 'Next page' }))

    expect(screen.getByRole('button', { name: 'Go to page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('goes back to the previous page when Previous is clicked', async () => {
    const user = userEvent.setup()
    render(<Pagination totalItems={100} pageSize={10} />)

    await user.click(screen.getByRole('button', { name: 'Next page' }))
    await user.click(screen.getByRole('button', { name: 'Previous page' }))

    expect(screen.getByRole('button', { name: 'Go to page 1' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('navigates to a page when its number is clicked', async () => {
    const user = userEvent.setup()
    render(<Pagination totalItems={100} pageSize={10} />)

    await user.click(screen.getByRole('button', { name: 'Go to page 3' }))

    expect(screen.getByRole('button', { name: 'Go to page 3' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('fires onChange with the target page', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Pagination totalItems={100} pageSize={10} onChange={handleChange} />)

    await user.click(screen.getByRole('button', { name: 'Go to page 3' }))

    expect(handleChange).toHaveBeenCalledWith(3)
  })

  it('marks the current page with aria-current="page"', () => {
    render(<Pagination totalItems={100} pageSize={10} />)
    expect(screen.getByRole('button', { name: 'Go to page 1' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('shows an ellipsis when there are many pages', () => {
    const { container } = render(<Pagination totalItems={200} pageSize={10} />)
    expect(
      container.querySelectorAll('.chs-pagination__ellipsis').length,
    ).toBeGreaterThan(0)
  })

  it('does not show an ellipsis when there are few pages', () => {
    const { container } = render(<Pagination totalItems={25} pageSize={10} />)
    expect(container.querySelectorAll('.chs-pagination__ellipsis')).toHaveLength(0)
  })

  it('disables every control when disabled', () => {
    render(<Pagination totalItems={100} pageSize={10} disabled />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
    buttons.forEach((button) => {
      expect(button).toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Pagination totalItems={100} pageSize={10} />)
      await checkA11y(container)
    })
  })
})
