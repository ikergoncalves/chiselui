import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

// Brand the Storybook manager UI as "chiselui".
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'chiselui',
    brandUrl: 'https://ikergoncalves.github.io/chiselui',
  }),
})
