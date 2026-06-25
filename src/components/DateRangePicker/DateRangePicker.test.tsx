import { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateRangePicker } from './DateRangePicker'
import type { DateRange } from './useDateRange'

// The calendar opens on the real current month, so expectations are built from
// `now` rather than a hard-coded date that would rot over time. I pick days well
// inside the month (10/11/15/20) so they always exist and stay in the same month.
const longDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

const now = new Date()
const dayInThisMonth = (day: number): Date =>
  new Date(now.getFullYear(), now.getMonth(), day)
const labelFor = (day: number): string => longDate.format(dayInThisMonth(day))
const mmddyyyy = (day: number): string => {
  const d = dayInThisMonth(day)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}/${dd}/${d.getFullYear()}`
}

// Controlled wrapper so a selection updates the displayed value, like real usage.
function ControlledPicker(props: {
  onChange?: (range: DateRange) => void
  minDate?: Date
  maxDate?: Date
  error?: string
}) {
  const [range, setRange] = useState<DateRange>({ start: null, end: null })
  return (
    <DateRangePicker
      value={range}
      onChange={(next) => {
        setRange(next)
        props.onChange?.(next)
      }}
      minDate={props.minDate}
      maxDate={props.maxDate}
      error={props.error}
    />
  )
}

const openCalendar = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByLabelText('Start date'))
  return screen.getByRole('dialog')
}

describe('DateRangePicker', () => {
  it('renders the two inputs', () => {
    render(<DateRangePicker />)
    expect(screen.getByLabelText('Start date')).toBeInTheDocument()
    expect(screen.getByLabelText('End date')).toBeInTheDocument()
  })

  it('opens the calendar when the start input is clicked', async () => {
    const user = userEvent.setup()
    render(<DateRangePicker />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getByLabelText('Start date'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes the calendar when clicking outside', async () => {
    const user = userEvent.setup()
    render(<DateRangePicker />)

    await openCalendar(user)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(document.body)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('selecting a date sets the start and switches to choosing the end', async () => {
    const user = userEvent.setup()
    render(<ControlledPicker />)

    const dialog = await openCalendar(user)
    await user.click(within(dialog).getByRole('button', { name: labelFor(10) }))

    expect(screen.getByLabelText('Start date')).toHaveValue(mmddyyyy(10))
    // Still open and now highlighting the end input.
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByLabelText('End date').closest('.chs-daterange__input')).toHaveClass(
      'chs-daterange__input--active',
    )
  })

  it('selecting an end >= start completes the range and closes', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<ControlledPicker onChange={onChange} />)

    await openCalendar(user)
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: labelFor(10) }),
    )
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: labelFor(20) }),
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Start date')).toHaveValue(mmddyyyy(10))
    expect(screen.getByLabelText('End date')).toHaveValue(mmddyyyy(20))

    const calls = onChange.mock.calls
    const last = calls[calls.length - 1]?.[0] as DateRange
    expect(last.start).not.toBeNull()
    expect(last.end).not.toBeNull()
  })

  it('selecting an end < start restarts with the new date as the start', async () => {
    const user = userEvent.setup()
    render(<ControlledPicker />)

    await openCalendar(user)
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: labelFor(15) }),
    )
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: labelFor(10) }),
    )

    expect(screen.getByLabelText('Start date')).toHaveValue(mmddyyyy(10))
    expect(screen.getByLabelText('End date')).toHaveValue('')
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('marks days outside minDate/maxDate as aria-disabled', async () => {
    const user = userEvent.setup()
    render(<ControlledPicker minDate={dayInThisMonth(15)} />)

    const dialog = await openCalendar(user)
    const earlier = within(dialog).getByRole('button', { name: labelFor(10) })
    expect(earlier).toHaveAttribute('aria-disabled', 'true')
  })

  it('moves focus to the next day with ArrowRight', async () => {
    const user = userEvent.setup()
    render(<ControlledPicker />)

    const dialog = await openCalendar(user)
    const day10 = within(dialog).getByRole('button', { name: labelFor(10) })
    // Focusing flips the roving tabindex via onFocus, so flush that state update.
    act(() => day10.focus())
    expect(day10).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(within(dialog).getByRole('button', { name: labelFor(11) })).toHaveFocus()
  })

  it('shows an error message when error is set', () => {
    render(<DateRangePicker error="Please choose both dates." />)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Please choose both dates.')
  })
})
