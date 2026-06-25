import { create, type ThemeVars } from '@storybook/theming'

/**
 * chiselui — shared Storybook chrome theming
 *
 * Storybook's chrome (the manager: sidebar, toolbar, top bar; and the Docs page)
 * is themed by Storybook's own emotion theme, not by our CSS tokens. The manager
 * theme in particular is applied **once**, when Storybook boots — there is no API
 * to swap it at runtime. So instead of fighting Storybook's runtime styles with
 * `!important` overrides, we feed it a native theme and keep the manager, the
 * Docs chrome and the toolbar choice in sync through this module.
 *
 * The toolbar decorator (preview.ts) persists the chosen theme here; the manager
 * (manager.ts) and the Docs `docs.theme` parameter read it back on load, falling
 * back to the OS `prefers-color-scheme`.
 */

export const THEME_STORAGE_KEY = 'chiselui-sb-theme'

export type ThemeChoice = 'light' | 'dark' | 'system'

/** Resolve a toolbar choice (including `system`) to a concrete light/dark mode. */
export function resolveMode(choice: ThemeChoice | null): 'light' | 'dark' {
  if (choice === 'light' || choice === 'dark') return choice
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** Read the last persisted toolbar choice, resolving `system`/absent via the OS. */
export function readMode(): 'light' | 'dark' {
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeChoice | null
  return resolveMode(stored)
}

/** chiselui-branded Storybook theme for a given mode (manager UI + Docs chrome). */
export function chiselTheme(mode: 'light' | 'dark'): ThemeVars {
  return create({
    base: mode,
    brandTitle: 'chiselui',
    brandUrl: 'https://ikergoncalves.github.io/chiselui',
  })
}
