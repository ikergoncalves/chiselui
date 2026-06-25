import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Popover, type PopoverPlacement } from './Popover'
import { Button } from '../Button'
import { Input } from '../Input'

// All twelve placements, reused by both the argType control and the showcase grid.
const PLACEMENTS: PopoverPlacement[] = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
]

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: {
    content: 'I am a popover — click outside or press Escape to close me.',
    placement: 'bottom',
    trapFocus: false,
    closeOnEsc: true,
    offset: 8,
    // A default trigger satisfies the required `children` prop; the showcase
    // stories below supply their own via a custom `render`.
    children: <Button>Open popover</Button>,
  },
  argTypes: {
    placement: {
      control: 'select',
      options: PLACEMENTS,
    },
    // `content` is typed ReactNode, which autodocs won't infer an editable control
    // for — force a text control so the panel text is editable.
    content: { control: 'text' },
    // The trigger is a React element; there's no meaningful args control for it.
    children: { control: false },
    // Driven by the Controlled story's own state, not the args panel.
    open: { control: false },
    onOpenChange: { control: false },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

// Plain args-only story so the `content`, `placement`, `offset` … controls drive
// the component directly (click the trigger to open).
export const Default: Story = {}

// A focus-trapping popover hosting a small form: Tab cycles inside the panel and
// focus returns to the trigger on close.
export const WithForm: Story = {
  args: {
    trapFocus: true,
    content: (
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 220 }}
        onSubmit={(event) => event.preventDefault()}
      >
        <Input label="Name" placeholder="Ada Lovelace" />
        <Input label="Email" type="email" placeholder="ada@example.com" />
        <Button type="submit">Save changes</Button>
      </form>
    ),
  },
  render: (args) => (
    <div style={{ padding: 80 }}>
      <Popover {...args}>
        <Button>Edit profile</Button>
      </Popover>
    </div>
  ),
}

// Grid of every supported placement; generous padding gives `flip`/`shift` room
// so each one anchors where it's asked rather than bouncing off a viewport edge.
export const Placements: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, max-content)',
        gap: 24,
        padding: 140,
      }}
    >
      {PLACEMENTS.map((placement) => (
        <Popover
          {...args}
          key={placement}
          placement={placement}
          content={`placement: ${placement}`}
        >
          <Button variant="secondary">{placement}</Button>
        </Popover>
      ))}
    </div>
  ),
}

// State lives in the parent: an external button toggles the same popover whose
// trigger also opens it, and both stay in sync through `open` + `onOpenChange`.
function ControlledExample() {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 80 }}
    >
      <Button variant="ghost" onClick={() => setOpen((value) => !value)}>
        Toggle externally ({open ? 'open' : 'closed'})
      </Button>
      <Popover
        open={open}
        onOpenChange={setOpen}
        content="My visibility is owned by the parent component."
      >
        <Button>Anchor</Button>
      </Popover>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
}
