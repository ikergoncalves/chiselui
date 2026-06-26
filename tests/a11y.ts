// Assertion-based accessibility auditing for component tests.
//
// We drive axe-core directly (via `axe.run`) rather than through jest-axe, so the
// design system carries no extra test-framework shim — just the same engine that
// powers the axe browser extension. `checkA11y` runs the audit over a rendered
// subtree and fails the test with a readable report listing every WCAG violation.
import * as axe from 'axe-core'

// A few rules can't be judged meaningfully here and are switched off centrally so
// every component audit shares one definition of "environmental noise":
//  - `color-contrast`              jsdom never computes resolved CSS colors.
//  - `scrollable-region-focusable` jsdom never computes overflow / scroll height.
//  - `landmark-one-main`           an isolated component has no <main> by design.
//  - `region`                      component content sits outside page landmarks.
const JSDOM_DISABLED_RULES: axe.RunOptions['rules'] = {
  'color-contrast': { enabled: false },
  'scrollable-region-focusable': { enabled: false },
  'landmark-one-main': { enabled: false },
  region: { enabled: false },
}

/**
 * Audit a rendered subtree with axe-core and throw on any WCAG violation.
 *
 * Pass the element you want scanned — usually Testing Library's `container`, or
 * `document.body` for components that render through a portal (e.g. Modal).
 */
export async function checkA11y(container: Element): Promise<void> {
  const results = await axe.run(container, { rules: JSDOM_DISABLED_RULES })

  if (results.violations.length > 0) {
    const messages = results.violations
      .map(
        (violation) =>
          `[${violation.impact}] ${violation.id}: ${violation.description}\n` +
          violation.nodes.map((node) => `  → ${node.html}`).join('\n'),
      )
      .join('\n\n')

    throw new Error(`Accessibility violations found:\n\n${messages}`)
  }
}
