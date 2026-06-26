// Allow side-effect imports of stylesheets in `.ts`/`.tsx` source.
declare module '*.css'

// View Transitions API — still missing from the bundled DOM lib typings, so we
// declare the slice we use. Optional (`?`) because unsupported browsers lack it,
// which is exactly the branch ThemeToggle's graceful degradation checks for.
interface Document {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    ready: Promise<void>
    finished: Promise<void>
    updateCallbackDone: Promise<void>
  }
}
