import { addons } from '@storybook/manager-api'
import { chiselTheme, readMode } from './theme'

// Theme the Storybook manager UI (sidebar, toolbar, top bar) and brand it as
// "chiselui". The manager theme is applied once, when Storybook boots — there is
// no API to swap it live — so we read the toolbar choice the preview decorator
// persisted (falling back to the OS `prefers-color-scheme`). Pick a theme in the
// toolbar and reload to bring the whole chrome along. See preview.ts.
addons.setConfig({
  theme: chiselTheme(readMode()),
})
