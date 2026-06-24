import type { Preview } from '@storybook/react'

// Global chiselui styles — reset, design tokens and base layer.
import '../src/styles/reset.css'
import '../src/tokens/index.css'
import '../src/styles/base.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
}

export default preview
