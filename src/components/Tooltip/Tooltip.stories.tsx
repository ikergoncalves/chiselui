import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    content: 'I am a tooltip',
    placement: 'top',
    delay: 300,
    // A default trigger satisfies the required `children` prop; every story below
    // supplies its own via a custom `render`.
    children: <Button>Hover me</Button>,
  },
  argTypes: {
    placement: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
    },
    // `content` is typed ReactNode, which autodocs won't infer an editable
    // control for — force a text control so the bubble text is editable.
    content: { control: 'text' },
    // The trigger is a React element; there's no meaningful args control for it.
    children: { control: false },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

// Plain args-only story so the `content`, `placement` and `delay` controls drive
// the component directly (hover the trigger to see edits). The showcase stories
// below intentionally override `content` per-instance, so they can't serve this
// role.
export const Default: Story = {}

export const AllPlacements: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, max-content)',
        gap: 32,
        padding: 80,
      }}
    >
      {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
        <Tooltip {...args} key={placement} placement={placement} content={`Placement: ${placement}`}>
          <Button variant="secondary">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
}

export const LongContent: Story = {
  args: {
    content:
      'This is a much longer tooltip whose text wraps once it reaches the 240px max-width cap, so it stays comfortably readable.',
  },
  render: (args) => (
    <div style={{ padding: 80 }}>
      <Tooltip {...args}>
        <Button>Hover for details</Button>
      </Tooltip>
    </div>
  ),
}

// A square icon-only trigger — the common case where a label is needed but there
// is no room for visible text.
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 11v5M12 8h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export const OnIcon: Story = {
  args: {
    content: 'More information',
  },
  render: (args) => (
    <div style={{ padding: 80 }}>
      <Tooltip {...args}>
        <button
          type="button"
          aria-label="More information"
          style={{
            display: 'inline-flex',
            padding: 8,
            borderRadius: 8,
            color: 'var(--color-neutral-600)',
            cursor: 'pointer',
          }}
        >
          <InfoIcon />
        </button>
      </Tooltip>
    </div>
  ),
}
