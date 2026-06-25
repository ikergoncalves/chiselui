import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Drawer,
  type DrawerPlacement,
  type DrawerProps,
  type DrawerSize,
} from './Drawer'
import { Button } from '../Button'

// Drawer is driven by `isOpen`, so every story wires up a trigger + local state.
// Story args flow straight through to the panel (placement, size, etc.).
function DrawerDemo({ buttonLabel = 'Open drawer', ...args }: Partial<DrawerProps> & {
  buttonLabel?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{buttonLabel}</Button>
      <Drawer
        title="Panel title"
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        {args.children ?? <p style={{ margin: 0 }}>This is the drawer body.</p>}
      </Drawer>
    </>
  )
}

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'inline-radio',
      options: ['left', 'right', 'top', 'bottom'] satisfies DrawerPlacement[],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'full'] satisfies DrawerSize[],
    },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    isOpen: { control: false },
    onClose: { control: false },
    children: { control: false },
    footer: { control: false },
  },
  args: {
    // isOpen / onClose are driven by DrawerDemo's local state; these defaults just
    // satisfy the required-prop types so individual stories can omit them.
    isOpen: false,
    onClose: () => {},
    title: 'Filters',
    children: <p style={{ margin: 0 }}>This is the drawer body.</p>,
    placement: 'right',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEsc: true,
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <DrawerDemo {...args} />,
}

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['left', 'right', 'top', 'bottom'] satisfies DrawerPlacement[]).map(
        (placement) => (
          <DrawerDemo
            key={placement}
            placement={placement}
            title={`Placement: ${placement}`}
            buttonLabel={`Open ${placement}`}
          />
        ),
      )}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg', 'full'] satisfies DrawerSize[]).map((size) => (
        <DrawerDemo
          key={size}
          placement="right"
          size={size}
          title={`Size: ${size}`}
          buttonLabel={`Open ${size}`}
        />
      ))}
    </div>
  ),
}

export const WithFooter: Story = {
  render: (args) => (
    <DrawerDemo
      {...args}
      title="Edit settings"
      buttonLabel="Open with footer"
      footer={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </>
      }
    >
      <p style={{ margin: 0 }}>
        The footer stays pinned to the bottom of the panel while this body scrolls
        on its own.
      </p>
    </DrawerDemo>
  ),
}

export const NoOverlayClose: Story = {
  args: { closeOnOverlayClick: false, title: 'Click X to close' },
  render: (args) => (
    <DrawerDemo {...args} buttonLabel="Open (overlay locked)">
      <p style={{ margin: 0 }}>
        Clicking the backdrop won&apos;t close this drawer — use the X button or
        Escape instead.
      </p>
    </DrawerDemo>
  ),
}
