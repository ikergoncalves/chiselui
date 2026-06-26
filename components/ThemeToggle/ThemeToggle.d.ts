export type ThemeValue = 'light' | 'dark' | 'system';
export type ThemeToggleSize = 'sm' | 'md' | 'lg';
export interface ThemeToggleProps {
    /** Theme to use when nothing is persisted yet. @default 'system' */
    defaultTheme?: ThemeValue;
    /** localStorage key the preference is stored under. @default 'chiselui-theme' */
    storageKey?: string;
    /** Button (and icon) size. @default 'md' */
    size?: ThemeToggleSize;
}
/**
 * ThemeToggle — a sun / moon / monitor button that cycles the colour theme.
 *
 * It owns its state: the choice is persisted to `localStorage` and applied to
 * the <html> element as `data-theme`, which the design tokens read. Cycling
 * goes light → dark → system → light; `system` clears the attribute so the
 * tokens follow the OS `prefers-color-scheme`.
 */
export declare function ThemeToggle({ defaultTheme, storageKey, size, }: ThemeToggleProps): import("react").JSX.Element;
export declare namespace ThemeToggle {
    var displayName: string;
}
