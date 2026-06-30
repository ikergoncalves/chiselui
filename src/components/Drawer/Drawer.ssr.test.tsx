// @vitest-environment node
//
// Runs in a Node environment (no jsdom) so `document` is genuinely undefined,
// reproducing the real "ReferenceError: document is not defined". The Drawer
// only reaches its `createPortal(..., document.body)` call when open, so the
// guard is exercised with `isOpen` set.
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { Drawer } from './Drawer'

describe('Drawer SSR safety', () => {
  it('renders an open panel to a string without throwing when document is unavailable', () => {
    expect(() =>
      renderToString(
        <Drawer isOpen onClose={() => {}} title="My panel">
          <p>content</p>
        </Drawer>,
      ),
    ).not.toThrow()
  })
})
