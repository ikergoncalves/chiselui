import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { act, renderHook, screen } from '@testing-library/react'
import { ToastProvider } from './ToastProvider'
import { useToast } from './useToast'

describe('Toast', () => {
  // Fake timers let us drive auto-dismiss deterministically; they also park the
  // default 4s timers in tests that don't advance, so nothing fires post-cleanup.
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('throws when useToast is used outside a ToastProvider', () => {
    // Silence the expected React error log for the thrown render.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useToast())).toThrow(/ToastProvider/)
    spy.mockRestore()
  })

  it('adds a toast to the queue', () => {
    const { result } = renderHook(() => useToast(), { wrapper: ToastProvider })

    act(() => {
      result.current.toast({ message: 'Saved', variant: 'success' })
    })

    expect(screen.getByText('Saved')).toBeInTheDocument()
  })

  it('auto-dismisses after the duration', () => {
    const { result } = renderHook(() => useToast(), { wrapper: ToastProvider })

    act(() => {
      result.current.toast({ message: 'Bye', variant: 'info', duration: 1000 })
    })
    expect(screen.getByText('Bye')).toBeInTheDocument()

    // Duration elapses -> the toast is flagged "leaving" (exit animation).
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    // Exit animation window elapses -> the toast is removed from the DOM.
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(screen.queryByText('Bye')).not.toBeInTheDocument()
  })

  it('applies the correct class for each variant', () => {
    const variants = ['success', 'error', 'warning', 'info'] as const
    const { result } = renderHook(() => useToast(), { wrapper: ToastProvider })

    for (const variant of variants) {
      act(() => {
        result.current.toast({ message: `${variant} message`, variant })
      })
    }

    for (const variant of variants) {
      expect(document.querySelector(`.chs-toast--${variant}`)).toBeInTheDocument()
    }
  })
})
