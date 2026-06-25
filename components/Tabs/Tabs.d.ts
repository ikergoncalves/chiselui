import { ReactNode } from '../../../node_modules/react';
export interface TabItem {
    /** Stable identifier; ties a tab to its panel and is reported to `onChange`. */
    id: string;
    /** Clickable tab label (text, or text + icon). */
    label: ReactNode;
    /** Panel body shown when the tab is active. */
    content: ReactNode;
    /** Block selection and dim the tab. @default false */
    disabled?: boolean;
}
export interface TabsProps {
    /** The tabs to render, in display order. */
    items: TabItem[];
    /** Initially active tab when uncontrolled. Falls back to the first enabled tab. */
    defaultActiveId?: string;
    /** Active tab id (controlled). Pair with `onChange`. */
    activeId?: string;
    /** Fired with the id of the tab the user activates. */
    onChange?: (id: string) => void;
    /** Visual treatment for the tab row. @default 'line' */
    variant?: 'line' | 'pill';
    /** Tab padding and font scale. @default 'md' */
    size?: 'sm' | 'md' | 'lg';
    /** Stretch the tabs to fill the available width. @default false */
    fullWidth?: boolean;
}
/**
 * Tabs — an accessible tabbed interface following the WAI-ARIA tabs pattern.
 *
 * Selection works controlled (`activeId` + `onChange`) or uncontrolled
 * (`defaultActiveId`). Activation is *manual*: arrow keys roam focus across the
 * tab row (roving `tabindex`) without switching panels, and Enter/Space commits
 * the focused tab — exactly what the pattern prescribes. The `line` variant draws
 * an underline that slides to the active tab by measuring its box; panels fade in
 * on entry. Both effects fold away under `prefers-reduced-motion` (see Tabs.css).
 */
export declare function Tabs({ items, defaultActiveId, activeId, onChange, variant, size, fullWidth, }: TabsProps): import("react").JSX.Element;
export declare namespace Tabs {
    var displayName: string;
}
