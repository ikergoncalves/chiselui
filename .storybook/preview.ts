import type { Preview, Decorator } from '@storybook/react'

// Global chiselui styles — reset, design tokens and base layer.
import '../src/styles/reset.css'
import '../src/tokens/index.css'
import '../src/styles/base.css'

// Bridges Storybook's Docs surfaces onto our tokens so the Docs tab follows
// the toolbar theme just like the canvas does.
import './docs.css'

// Reflect the toolbar's theme choice onto <html>, the same way the ThemeToggle
// component does: an explicit `data-theme` for light/dark, or no attribute for
// `system` so the tokens follow the OS `prefers-color-scheme`.
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as 'light' | 'dark' | 'system'
  const root = document.documentElement
  if (theme === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
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
