// @vitest-environment node
//
// Runs in a Node environment (no jsdom) so `document` is genuinely undefined,
// reproducing the real "ReferenceError: document is not defined" that broke
// SSR/static prerendering consumers. Under jsdom this guard would pass even
// with the bug, since `document.body` exists there.
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { ToastProvider } from './ToastProvider'

describe('ToastProvider SSR safety', () => {
  it('renders to a string without throwing when document is unavailable', () => {
    expect(() =>
      renderToString(
        <ToastProvider>
          <div>content</div>
        </ToastProvider>,
      ),
    ).not.toThrow()
  })
})
