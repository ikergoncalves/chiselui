# chiselui

> Precisely chiseled React components

[![CI](https://github.com/ikergoncalves/chiselui/actions/workflows/ci.yml/badge.svg)](https://github.com/ikergoncalves/chiselui/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/chiselui)](https://www.npmjs.com/package/chiselui)
[![license](https://img.shields.io/npm/l/chiselui)](https://github.com/ikergoncalves/chiselui/blob/main/LICENSE)

## Why chiselui

I built chiselui on plain CSS Variables because I wanted theming to be a runtime
concern the browser already understands — override a handful of `--color-*` /
`--space-*` tokens on `:root` and the whole system re-themes, with no Tailwind
build step to configure and no CSS-in-JS runtime shipping styles on every render.
I reach for Vite library mode rather than a pre-wired bundler kit so the build
stays a few lines I actually own: ESM + CJS output and hand-checked `.d.ts`,
nothing hidden behind a framework. And unlike shadcn/ui, chiselui is a real
versioned npm dependency you `npm install` and upgrade — not source you copy into
your repo and then maintain by hand.

## Install

```bash
npm install chiselui
```

`react` and `react-dom` (**v18+**) are peer dependencies — install them in your
app if you haven't already.

## Quick start

```tsx
import { Button, ToastProvider, useToast } from 'chiselui'
import 'chiselui/styles.css' // tokens + reset + base + component styles

function SaveButton() {
  const { toast } = useToast()
  return (
    <Button
      variant="primary"
      size="md"
      onClick={() => toast({ message: 'Saved!', variant: 'success' })}
    >
      Save
    </Button>
  )
}

export function App() {
  return (
    <ToastProvider>
      <SaveButton />
    </ToastProvider>
  )
}
```

## Theming

Every component reads from CSS custom properties, so retheming is just a matter
of overriding tokens on `:root` (or any scope):

```css
:root {
  --color-primary: #0ea5e9;
  --color-primary-hover: #0284c7;
  --radius-md: 6px;
  --space-4: 1rem;
}
```

## Components

| Component   | Status     | Description                                              |
| ----------- | ---------- | -------------------------------------------------------- |
| `Button`    | ✅ Stable  | Primary / secondary / ghost actions with size variants.  |
| `Badge`     | ✅ Stable  | Compact status and category labels.                      |
| `Skeleton`  | ✅ Stable  | Loading placeholders that match content shape.           |
| `Input`     | ✅ Stable  | Text field with label, hint and error states.            |
| `Select`    | ✅ Stable  | Native-backed select with consistent styling.            |
| `Tooltip`   | ✅ Stable  | Accessible, positioned hover/focus hints.                |
| `Toast`     | ✅ Stable  | Queue-based notifications via `ToastProvider`/`useToast`. |
| `Modal`     | ✅ Stable  | Dialog with focus trap and scroll locking.               |
| `Combobox`  | ✅ Stable  | Autocomplete select with full keyboard navigation.       |
| `DataTable` | ✅ Stable  | Tabular data with column sorting and pagination.         |
| `Checkbox`        | ✅ Stable  | Tri-state checkbox with indeterminate support.           |
| `Radio`           | ✅ Stable  | Radio button for use within a RadioGroup.                |
| `RadioGroup`      | ✅ Stable  | Grouped radios with keyboard navigation.                 |
| `Switch`          | ✅ Stable  | Animated on/off toggle.                                  |
| `Textarea`        | ✅ Stable  | Multi-line field with auto-resize and character counter. |
| `DateRangePicker` | ✅ Stable  | Range date picker with calendar and keyboard navigation. |
| `Tabs`        | ✅ Stable  | Tabbed interface with fade animation and line/pill variants. |
| `Accordion`   | ✅ Stable  | Expandable sections with slide animation.                    |
| `Breadcrumb`  | ✅ Stable  | Hierarchical navigation trail with collapse support.         |
| `Pagination`  | ✅ Stable  | Page navigation with windowed page numbers.                  |

## Documentation

Browse the live Storybook with interactive examples and prop tables:

**https://ikergoncalves.github.io/chiselui**

## Development

| Script                    | Description                                 |
| ------------------------- | ------------------------------------------- |
| `npm run dev`             | Vite dev server                             |
| `npm run build`           | Type-check + Vite library build (`dist/`)   |
| `npm run storybook`       | Storybook on port 6006                      |
| `npm run build-storybook` | Static Storybook build (`storybook-static`) |
| `npm run test`            | Run the Vitest suite once                   |
| `npm run test:watch`      | Vitest in watch mode                        |
| `npm run lint`            | ESLint over `src`                           |
| `npm run typecheck`       | `tsc --noEmit`                              |

## License

MIT
