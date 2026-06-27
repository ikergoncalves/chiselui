import type { Preview, Decorator } from '@storybook/react'

// Global chiselui styles — reset, design tokens and base layer.
import '../src/styles/reset.css'
import '../src/tokens/index.css'
import '../src/styles/base.css'

import { chiselTheme, readMode, THEME_STORAGE_KEY, type ThemeChoice } from './theme'

// Reflect a theme choice onto a single element: an explicit `data-theme` for
// light/dark, or no attribute for `system` so the tokens follow the OS
// `prefers-color-scheme`.
function reflectTheme(target: HTMLElement, theme: ThemeChoice): void {
  if (theme === 'system') {
    target.removeAttribute('data-theme')
  } else {
    target.setAttribute('data-theme', theme)
  }
}

// Canvases Storybook is currently rendering into. The internal ThemeToggle sets
// `data-theme` on <html>, which the isolated Docs canvas ignores, so we relay its
// `chiselui:theme-change` event onto every live canvas. A module-level Set with a
// single listener avoids re-registering (and leaking) a handler per re-render;
// disconnected canvases are pruned as they're encountered. We deliberately avoid
// a React `useEffect` here: a Storybook decorator is invoked as a plain function,
// not mounted as a component, so calling React hooks inside it isn't reliable.
const canvases = new Set<HTMLElement>()
let listening = false

function startCanvasSync(): void {
  if (listening) return
  listening = true
  document.addEventListener('chiselui:theme-change', (event) => {
    const next = (event as CustomEvent<{ theme: ThemeChoice }>).detail.theme
    for (const canvas of canvases) {
      if (canvas.isConnected) {
        reflectTheme(canvas, next)
      } else {
        canvases.delete(canvas)
      }
    }
  })
}

// Reflect the toolbar's theme choice onto <html>, the same way the ThemeToggle
// component does. This drives the regular component canvas live.
//
// We also mirror the attribute onto `context.canvasElement` — the DOM container
// Storybook renders each story into. In the Docs page the inline previews render
// into their own canvas outside <html>'s themed context, so without this the
// design tokens (and the surface background) stay light there even in dark mode.
// `canvasElement` is absent in non-browser contexts (SSR, tests), so it's guarded.
// Each canvas is also registered for live sync with the internal ThemeToggle.
//
// The Storybook chrome — the manager UI and the Docs page — is themed once at
// load and can't react to the toggle live (see manager.ts), so we also persist
// the choice here for those surfaces to pick up on the next load.
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as ThemeChoice
  reflectTheme(document.documentElement, theme)

  const canvas = context.canvasElement as HTMLElement | undefined
  if (canvas) {
    reflectTheme(canvas, theme)
    canvases.add(canvas)
    startCanvasSync()
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
