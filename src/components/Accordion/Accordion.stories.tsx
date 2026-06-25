import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, type AccordionItem } from './Accordion'

const items: AccordionItem[] = [
  {
    id: 'shipping',
    title: 'How long does shipping take?',
    content:
      'Standard shipping takes 3–5 business days. Express options are offered at checkout and arrive within 1–2 business days.',
  },
  {
    id: 'returns',
    title: 'What is your return policy?',
    content:
      'Unused items can be returned within 30 days of delivery for a full refund. Just start a return from your orders page.',
  },
  {
    id: 'warranty',
    title: 'Is there a warranty?',
    content:
      'Every product carries a two-year limited warranty covering manufacturing defects. Wear and tear is not included.',
  },
]

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    items,
    allowMultiple: false,
    variant: 'default',
    defaultOpenIds: ['shipping'],
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'bordered'],
    },
    allowMultiple: { control: 'boolean' },
    items: { control: false },
    openIds: { control: false },
    defaultOpenIds: { control: false },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
    defaultOpenIds: ['shipping', 'returns'],
  },
}

export const Bordered: Story = {
  args: {
    variant: 'bordered',
  },
}

const disabledItems: AccordionItem[] = [
  {
    id: 'available',
    title: 'Available section',
    content: 'This section can be opened and closed freely.',
  },
  {
    id: 'locked',
    title: 'Locked section',
    content: 'You should never see this — the header is disabled.',
    disabled: true,
  },
  {
    id: 'also-available',
    title: 'Another available section',
    content: 'This one works too.',
  },
]

export const WithDisabled: Story = {
  args: {
    items: disabledItems,
    defaultOpenIds: ['available'],
  },
}

export const Controlled: Story = {
  render: (args) => {
    // External buttons own the open set; the accordion just reflects `openIds`.
    const [openIds, setOpenIds] = useState<string[]>(['returns'])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                setOpenIds((open) =>
                  open.includes(item.id)
                    ? open.filter((id) => id !== item.id)
                    : [...open, item.id],
                )
              }
            >
              Toggle {item.id}
            </button>
          ))}
        </div>
        <Accordion
          {...args}
          allowMultiple
          openIds={openIds}
          onChange={setOpenIds}
        />
      </div>
    )
  },
}
