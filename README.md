# chiselui

> A precision React design system built with CSS Variables.

`chiselui` is a TypeScript-first component library. Every component is styled
exclusively through design tokens exposed as CSS custom properties — **no
Tailwind, no CSS-in-JS** — so theming is a matter of overriding a handful of
`--color-*` / `--space-*` variables.

## Install

```bash
npm install chiselui
```

`react` and `react-dom` (v18 or v19) are peer dependencies.

## Usage

```tsx
import { Button } from 'chiselui'
import 'chiselui/styles.css' // tokens + reset + base + component styles

export function App() {
  return (
    <Button variant="primary" size="md" onClick={() => alert('chiseled!')}>
      Click me
    </Button>
  )
}
```

### Theming

Override any token on `:root` (or any scope) to retheme the whole system:

```css
:root {
  --color-primary: #0ea5e9;
  --color-primary-hover: #0284c7;
  --radius-md: 6px;
}
```

## Development

| Script                  | Description                                   |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Vite dev server                               |
| `npm run storybook`     | Storybook on port 6006                        |
| `npm run test`          | Run the Vitest suite once                     |
| `npm run test:watch`    | Vitest in watch mode                          |
| `npm run lint`          | ESLint over `src`                             |
| `npm run typecheck`     | `tsc --noEmit`                                |
| `npm run build`         | Type-check + Vite library build (`dist/`)     |
| `npm run build-storybook` | Static Storybook build                      |

## Tech stack

- **Vite 5** (library mode) — ESM + CJS output, `.d.ts` via `vite-plugin-dts`
- **TypeScript 5** — `strict`, `noUncheckedIndexedAccess`
- **CSS Variables** — design tokens in `src/tokens/index.css`
- **Storybook 8** — `@storybook/react-vite`
- **Vitest + Testing Library** — unit tests
- **GitHub Actions** — lint · test · build on every push & PR

## Project structure

```
chiselui/
  src/
    components/   # one directory per component
    tokens/       # design tokens as CSS custom properties
    styles/       # reset.css + base global
    index.ts      # barrel of exports
  .storybook/     # Storybook config
  tests/          # test setup
```

## License

MIT
