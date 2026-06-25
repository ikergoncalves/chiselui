import { useEffect, useState } from 'react'
import './ThemeToggle.css'

export type ThemeValue = 'light' | 'dark' | 'system'
export type ThemeToggleSize = 'sm' | 'md' | 'lg'

export interface ThemeToggleProps {
  /** Theme to use when nothing is persisted yet. @default 'system' */
  defaultTheme?: ThemeValue
  /** localStorage key the preference is stored under. @default 'chiselui-theme' */
  storageKey?: string
  /** Button (and icon) size. @default 'md' */
  size?: ThemeToggleSize
}

/** Clicking the toggle advances to the next theme in this order. */
const NEXT_THEME: Record<ThemeValue, ThemeValue> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
}

/** aria-label describing the *action* a click performs, keyed by current theme. */
const ACTION_LABEL: Record<ThemeValue, string> = {
  light: 'Switch to dark mode',
  dark: 'Switch to system theme',
  system: 'Switch to light mode',
}

function isThemeValue(value: string | null): value is ThemeValue {
  return value === 'light' || value === 'dark' || value === 'system'
}

/** Read a previously persisted theme, tolerating an unavailable localStorage. */
function readStoredTheme(storageKey: string): ThemeValue | null {
  try {
    const stored = localStorage.getItem(storageKey)
    return isThemeValue(stored) ? stored : null
  } catch {
    return null
  }
}

/**
 * Reflect the active theme onto <html>: an explicit `data-theme` for light/dark,
 * or no attribute at all for `system` so the tokens fall back to the OS via
 * `prefers-color-scheme`.
 */
function applyTheme(theme: ThemeValue): void {
  const root = document.documentElement
  if (theme === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
}

function ThemeIcon({ theme }: { theme: ThemeValue }) {
  if (theme === 'light') {
    // Sun: a disc surrounded by eight rays.
    return (
      <svg
        className="chs-theme-toggle__svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    )
  }

  if (theme === 'dark') {
    // Moon: a crescent.
    return (
      <svg
        className="chs-theme-toggle__svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    )
  }

  // System: a monitor/computer.
  return (
    <svg
      className="chs-theme-toggle__svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

/**
 * ThemeToggle — a sun / moon / monitor button that cycles the colour theme.
 *
 * It owns its state: the choice is persisted to `localStorage` and applied to
 * the <html> element as `data-theme`, which the design tokens read. Cycling
 * goes light → dark → system → light; `system` clears the attribute so the
 * tokens follow the OS `prefers-color-scheme`.
 */
export function ThemeToggle({
  defaultTheme = 'system',
  storageKey = 'chiselui-theme',
  size = 'md',
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeValue>(
    () => readStoredTheme(storageKey) ?? defaultTheme,
  )

  // Apply on mount (with the persisted/default value) and on every change.
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const cycle = () => {
    const next = NEXT_THEME[theme]
    setTheme(next)
    try {
      localStorage.setItem(storageKey, next)
    } catch {
      // Storage may be unavailable (private mode, quota) — the in-memory state
      // still works for the session.
    }
  }

  const className = ['chs-theme-toggle', `chs-theme-toggle--${size}`].join(' ')

  return (
    <button
      type="button"
      className={className}
      onClick={cycle}
      aria-label={ACTION_LABEL[theme]}
      title={ACTION_LABEL[theme]}
    >
      {/* Re-keying on `theme` remounts the icon so the rotate-in animation
          replays on each switch. */}
      <span className="chs-theme-toggle__icon" key={theme} aria-hidden="true">
        <ThemeIcon theme={theme} />
      </span>
    </button>
  )
}

ThemeToggle.displayName = 'ThemeToggle'
