# chiselui

> Precisely chiseled React components

[![CI](https://github.com/ikergoncalves/chiselui/actions/workflows/ci.yml/badge.svg)](https://github.com/ikergoncalves/chiselui/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/chiselui)](https://www.npmjs.com/package/chiselui)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/chiselui)](https://bundlephobia.com/package/chiselui)
[![Tree Shaking](https://img.shields.io/bundlephobia/tree-shaking/chiselui)](https://bundlephobia.com/package/chiselui)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/npm/l/chiselui)](https://github.com/ikergoncalves/chiselui/blob/main/LICENSE)

chiselui is a React + TypeScript component library built on plain CSS custom
properties — override a few `--color-*` / `--space-*` tokens on `:root` and the
whole system re-themes, with no Tailwind config or CSS-in-JS runtime. It ships
28 accessible components with dark mode out of the box, strict TypeScript types,
and full tree-shaking with zero runtime dependencies.

## Installation

```bash
npm install chiselui
```

`react` and `react-dom` (**v18+**) are peer dependencies — install them in your
app if you haven't already.

## Usage

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
| `Spinner`   | ✅ Stable  | Indeterminate loading indicator with size and color variants. |
| `Progress`  | ✅ Stable  | Determinate progress bar and circular ring.                   |
| `Drawer`    | ✅ Stable  | Sliding panel with left, right, top and bottom placements.    |
| `Popover`   | ✅ Stable  | Click-triggered floating panel with focus trap support.       |
| `ThemeToggle` | ✅ Stable  | Light/dark/system theme toggle with localStorage persistence. |
| `NumberInput` | ✅ Stable  | Numeric field with decimal, currency, percent and unit formatting. |
| `FileUpload`  | ✅ Stable  | Drag-and-drop file upload with previews and file list.             |
| `ColorPicker` | ✅ Stable  | HSV color picker with spectrum, hue slider and hex input.          |

## Dark mode

Dark mode follows `prefers-color-scheme` automatically, or you can force a theme
with `data-theme`. Drop in `ThemeToggle` to give users control:

```tsx
import { ThemeToggle } from 'chiselui'

export function App() {
  return (
    <header>
      <ThemeToggle />
    </header>
  )
}
```

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
| `npm run chromatic`       | Run visual regression tests via Chromatic   |

## License

MIT
