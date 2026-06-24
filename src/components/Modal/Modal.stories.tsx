import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal, type ModalProps, type ModalSize } from './Modal'
import { Button } from '../Button'

// Modal is driven by `isOpen`, so every story wires up a trigger + local state.
// Story args flow straight through to the dialog (size, close behaviour, etc.).
function ModalDemo({ buttonLabel = 'Open modal', ...args }: Partial<ModalProps> & {
  buttonLabel?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{buttonLabel}</Button>
      <Modal
        title="Dialog title"
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        {args.children ?? <p style={{ margin: 0 }}>This is the modal body.</p>}
      </Modal>
    </>
  )
}

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'fullscreen'] satisfies ModalSize[],
    },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    isOpen: { control: false },
    onClose: { control: false },
    children: { control: false },
  },
  args: {
    // isOpen / onClose are driven by ModalDemo's local state; these defaults just
    // satisfy the required-prop types so individual stories can omit them.
    isOpen: false,
    onClose: () => {},
    title: 'Edit profile',
    children: <p style={{ margin: 0 }}>This is the modal body.</p>,
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEsc: true,
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
}

export const LargeContent: Story = {
  args: { title: 'Terms of service', size: 'md' },
  render: (args) => (
    <ModalDemo {...args} buttonLabel="Read terms">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Array.from({ length: 24 }, (_, i) => (
          <p key={i} style={{ margin: 0 }}>
            Paragraph {i + 1}. The dialog body scrolls on its own while the header
            and the close button stay pinned in place.
          </p>
        ))}
      </div>
    </ModalDemo>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg', 'fullscreen'] satisfies ModalSize[]).map((size) => (
        <ModalDemo
          key={size}
          size={size}
          title={`Size: ${size}`}
          buttonLabel={`Open ${size}`}
        />
      ))}
    </div>
  ),
}

export const Fullscreen: Story = {
  args: { size: 'fullscreen', title: 'Fullscreen dialog' },
  render: (args) => (
    <ModalDemo {...args} buttonLabel="Open fullscreen">
      <p style={{ margin: 0 }}>This dialog fills the entire viewport.</p>
    </ModalDemo>
  ),
}
