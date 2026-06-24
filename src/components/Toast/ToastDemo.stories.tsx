import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider } from './ToastProvider'
import { useToast } from './useToast'
import { Button } from '../Button'

// A small consumer that lives under the provider so the stories can fire toasts.
function ToastDemo() {
  const { toast } = useToast()

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button
        variant="primary"
        onClick={() => toast({ message: 'Changes saved successfully.', variant: 'success' })}
      >
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() => toast({ message: 'Something went wrong. Try again.', variant: 'error' })}
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ message: 'Your session expires in 5 minutes.', variant: 'warning' })}
      >
        Warning
      </Button>
      <Button
        variant="ghost"
        onClick={() => toast({ message: 'A new version is available.', variant: 'info' })}
      >
        Info
      </Button>
    </div>
  )
}

const meta = {
  title: 'Components/Toast',
  component: ToastDemo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
