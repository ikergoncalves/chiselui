import { type FormEvent, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Textarea } from '../components/Textarea'
import { Checkbox } from '../components/Checkbox'
import { Button } from '../components/Button'
import { ToastProvider, useToast } from '../components/Toast'

// Subjects live outside the component so the option array keeps a stable identity
// across renders instead of being rebuilt every time the form re-renders.
const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General inquiry' },
  { value: 'support', label: 'Technical support' },
  { value: 'billing', label: 'Billing question' },
]

// The fields live in their own component so they can call useToast(); the exported
// composition below wraps them in the ToastProvider that the hook requires.
function ContactFormFields() {
  const { toast } = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [terms, setTerms] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // The text fields carry native `required`, so by the time submit fires they
    // are already filled; only the checkbox (which has no native required) still
    // needs an explicit guard here.
    if (!terms) {
      toast({ message: 'Please accept the terms', variant: 'error' })
      return
    }
    toast({ message: 'Message sent successfully!', variant: 'success' })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        maxWidth: 480,
      }}
    >
      <Input
        label="Full name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <Input
        label="Email address"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Select
        label="Subject"
        options={SUBJECT_OPTIONS}
        placeholder="Select a subject"
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
        required
      />
      <Textarea
        label="Message"
        rows={4}
        showCount
        maxLength={500}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />
      <Checkbox
        label="I agree to the terms and conditions"
        checked={terms}
        onChange={setTerms}
      />
      {/* Button has no `fullWidth` prop, so I stretch it to the form width via
          style — the design system intentionally keeps that a styling concern. */}
      <Button variant="primary" type="submit" style={{ width: '100%' }}>
        Send message
      </Button>
    </form>
  )
}

/**
 * ContactForm — Input + Select + Textarea + Checkbox + Button wired together
 * inside a ToastProvider, showing the form primitives composing into a real,
 * validated contact form with toast feedback on submit.
 */
export function ContactForm() {
  return (
    <ToastProvider>
      <ContactFormFields />
    </ToastProvider>
  )
}

const meta = {
  title: 'Compositions/Contact Form',
  component: ContactForm,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ContactForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
