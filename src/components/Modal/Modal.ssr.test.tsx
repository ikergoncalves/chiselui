// @vitest-environment node
//
// Runs in a Node environment (no jsdom) so `document` is genuinely undefined,
// reproducing the real "ReferenceError: document is not defined". The Modal
// only reaches its `createPortal(..., document.body)` call when open, so the
// guard is exercised with `isOpen` set.
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { Modal } from './Modal'

describe('Modal SSR safety', () => {
  it('renders an open dialog to a string without throwing when document is unavailable', () => {
    expect(() =>
      renderToString(
        <Modal isOpen onClose={() => {}} title="My dialog">
          <p>content</p>
        </Modal>,
      ),
    ).not.toThrow()
  })
})
