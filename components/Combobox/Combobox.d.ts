export interface ComboboxOption {
    /** Value reported to `onChange` when the option is picked. */
    value: string;
    /** Human-readable text shown in the input and the list. */
    label: string;
}
export interface ComboboxProps {
    /** The selectable options. */
    options: ComboboxOption[];
    /** Currently selected value (controlled). */
    value?: string;
    /** Fired with the chosen option's value. */
    onChange: (value: string) => void;
    /** Placeholder shown while the input is empty. */
    placeholder?: string;
    /** Field label, linked to the input via htmlFor/id. */
    label?: string;
    /** Error message; turns the border danger and flips aria-invalid when set. */
    error?: string;
    /** Disable the whole control. @default false */
    disabled?: boolean;
    /** Custom matcher. @default case-insensitive substring on the label. */
    filterFn?: (option: ComboboxOption, query: string) => boolean;
}
/**
 * Combobox — a filterable, keyboard-navigable single-select.
 *
 * A text input narrows a `role="listbox"` dropdown positioned with plain CSS
 * (no Floating UI here). Arrow keys move the active option, Enter selects,
 * Escape closes, and a click outside dismisses it (via `useOnClickOutside`).
 * ARIA is wired the WAI-ARIA way: `role="combobox"` + `aria-autocomplete="list"`
 * on the input, `aria-activedescendant` tracking the highlighted option, and
 * `role="option"` rows carrying `aria-selected`.
 */
export declare function Combobox({ options, value, onChange, placeholder, label, error, disabled, filterFn, }: ComboboxProps): import("react").JSX.Element;
export declare namespace Combobox {
    var displayName: string;
}
