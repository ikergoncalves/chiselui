# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.3] - 2026-06-29

### Fixed
- Portal-based components (ToastProvider, Modal, Drawer) no longer throw
  `ReferenceError: document is not defined` when server-rendered or statically
  prerendered (e.g. Next.js App Router). Portals now mount only after the
  component has hydrated on the client.

## [0.6.2] - 2026-06-26

### Fixed
- Storybook Docs canvas background now follows theme tokens correctly
- SettingsPanel title color corrected for dark mode
- ThemeToggle dispatches CustomEvent for Docs canvas sync

### Changed
- README simplified for clarity

## [0.6.0] - 2026-06-25

### Added
- NumberInput component with decimal, currency, percent and unit masks
- FileUpload component with drag-and-drop and image previews
- ColorPicker component with HSV spectrum, hue slider and hex input
- axe-core accessibility checks integrated into all component tests
- Chromatic visual regression testing via GitHub Actions
- Composition stories: ContactForm, SettingsPanel, UserDashboard
- View Transitions API animation for theme switching
- Bundle size badges and Performance section in README

## [0.5.0] - 2026-06-25

### Added
- Dark mode support via CSS Variables tokens
- ThemeToggle component with light/dark/system cycling
- Storybook theme toolbar with native dark/light switching

### Fixed
- Badge, Toast and Progress variant colors now adapt to dark mode
- Tooltip text color corrected for dark backgrounds

## [0.4.0] - 2026-06-25

### Added
- Spinner component with size and color variants
- Progress component with linear and circular variants
- Drawer component with all four placement directions
- Popover component with floating positioning and focus trap support

## [0.3.0] - 2026-06-25

### Added
- Tabs component with fade animation and line/pill variants
- Accordion component with slide animation and multiple/single mode
- Breadcrumb component with collapse support
- Pagination component with page window and ellipsis

### Fixed
- Resolved lint errors in Tabs and Accordion story files

## [0.2.2] - 2026-06-24

### Fixed
- Storybook controls now correctly reflect arg changes across all
  component stories

## [0.2.1] - 2026-06-24

### Fixed

- Tooltip: added `forwardRef` to Button so it forwards its ref to the underlying
  `<button>`, letting Floating UI anchor the bubble — tooltips now show on every
  trigger type (e.g. the AllPlacements and LongContent stories), not just on a
  raw `<button>`
- RadioGroup: gave each Storybook story instance a unique `name` (via `useId()`),
  fixing the shared-`name` collision on the autodocs "Docs" page that grouped
  separate radio sets into one native group and caused the "needs two clicks"
  selection behaviour

## [0.2.0] - 2026-06-24

### Added

- Checkbox component with indeterminate state support
- Radio and RadioGroup components with keyboard navigation
- Switch component with animated toggle
- Textarea component with auto-resize and character counter
- DateRangePicker component with range selection and keyboard navigation

## [0.1.0] - 2026-06-24

### Added

- Button, Badge, Skeleton (base components)
- Input, Select, Tooltip, Toast (intermediate components)
- Modal, Combobox, DataTable with sort and pagination (advanced components)
- CSS Variable design tokens system
- Storybook 8 documentation
- GitHub Actions CI/CD pipeline
