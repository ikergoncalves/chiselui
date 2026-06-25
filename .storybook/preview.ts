import type { Preview, Decorator } from '@storybook/react'

// Global chiselui styles — reset, design tokens and base layer.
import '../src/styles/reset.css'
import '../src/tokens/index.css'
import '../src/styles/base.css'

import { chiselTheme, readMode, THEME_STORAGE_KEY, type ThemeChoice } from './theme'

// Reflect the toolbar's theme choice onto <html>, the same way the ThemeToggle
// component does: an explicit `data-theme` for light/dark, or no attribute for
// `system` so the tokens follow the OS `prefers-color-scheme`. This drives the
// component canvas (and the inline previews inside Docs) live.
//
// The Storybook chrome — the manager UI and the Docs page — is themed once at
// load and can't react to the toggle live (see manager.ts), so we also persist
// the choice here for those surfaces to pick up on the next load.
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as ThemeChoice
  const root = document.documentElement
  if (theme === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  return Story(context)
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    // The theme is driven manually through `data-theme`/our tokens, so the
    // backgrounds switcher would only fight it. Disable it to avoid a stray
    // toolbar control painting over the themed surface.
    backgrounds: { disable: true },
    // Theme the Docs chrome (page background + prose) natively through
    // Storybook's emotion theme instead of overriding its classes with
    // `!important`. Evaluated at load from the persisted choice / OS preference
    // so it matches the manager UI.
    docs: { theme: chiselTheme(readMode()) },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'system',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark', 'system'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
}

export default preview
