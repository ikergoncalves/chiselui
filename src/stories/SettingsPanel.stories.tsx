import { type CSSProperties, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { AccordionItem } from '../components/Accordion'
import { Accordion } from '../components/Accordion'
import { Badge } from '../components/Badge'
import { Switch } from '../components/Switch'
import { ThemeToggle } from '../components/ThemeToggle'

const panelStyle: CSSProperties = {
  maxWidth: 560,
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
}

const headerStyle: CSSProperties = {
  // 20px 24px expressed through the spacing scale.
  padding: 'var(--space-5) var(--space-6)',
  borderBottom: '1px solid var(--color-border)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

// Each accordion section stacks its switches with consistent padding/gap.
const sectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
  padding: 'var(--space-4) var(--space-6)',
}

/**
 * SettingsPanel — Accordion + Switch + Badge + ThemeToggle composing into a
 * settings surface. Each switch is independently controlled, the accordion lets
 * several sections stay open at once, and the ThemeToggle in the header recolours
 * every component through the shared design tokens.
 */
export function SettingsPanel() {
  // One useState per switch keeps each toggle independently controlled.
  const [compactLayout, setCompactLayout] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [shareUsage, setShareUsage] = useState(false)
  const [personalizedAds, setPersonalizedAds] = useState(false)

  // "Dark mode" is owned by the ThemeToggle in the header, so this switch is just
  // an indicator: it's disabled and never toggles. I still keep it in state so
  // every switch in the panel follows the same controlled pattern.
  const [darkMode] = useState(false)

  const items: AccordionItem[] = [
    {
      id: 'appearance',
      title: 'Appearance',
      content: (
        <div style={sectionStyle}>
          <Switch label="Dark mode" checked={darkMode} disabled />
          <Switch
            label="Compact layout"
            checked={compactLayout}
            onChange={setCompactLayout}
          />
        </div>
      ),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      content: (
        <div style={sectionStyle}>
          <Switch
            label="Email notifications"
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />
          <Switch
            label="Push notifications"
            checked={pushNotifications}
            onChange={setPushNotifications}
          />
          <Switch
            label="Weekly digest"
            checked={weeklyDigest}
            onChange={setWeeklyDigest}
          />
        </div>
      ),
    },
    {
      id: 'privacy',
      title: 'Privacy',
      content: (
        <div style={sectionStyle}>
          <Switch
            label="Share usage data"
            checked={shareUsage}
            onChange={setShareUsage}
          />
          <Switch
            label="Personalized ads"
            checked={personalizedAds}
            onChange={setPersonalizedAds}
          />
        </div>
      ),
    },
  ]

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 'var(--font-size-lg)',
              // Re-resolve the token at this element so it follows the themed
              // canvas in Docs (where data-theme lives on the canvas, not <html>).
              color: 'var(--color-neutral-900)',
            }}
          >
            Settings
          </h2>
          <Badge variant="info">Beta</Badge>
        </div>
        <ThemeToggle />
      </div>

      <Accordion items={items} allowMultiple defaultOpenIds={['appearance']} />
    </div>
  )
}

const meta = {
  title: 'Compositions/Settings Panel',
  component: SettingsPanel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SettingsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
