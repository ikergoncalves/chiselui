export interface RadioProps {
    /** Text shown next to the dot; the whole label is clickable. */
    label: string;
    /** Value reported to the group's onChange when this option is picked. */
    value: string;
    /** Block interaction and dim this single option. @default false */
    disabled?: boolean;
    /** Shared group name that ties the native radios together. */
    name?: string;
    /** Whether this option is the selected one. */
    checked?: boolean;
    /** Fired with this option's `value` when the user selects it. */
    onChange?: (value: string) => void;
    /** Caller-supplied id for the input. */
    id?: string;
}
/**
 * Radio — a single labelled radio built on a visually-hidden native input.
 *
 * Designed to be rendered by {@link RadioGroup}, which supplies `name`,
 * `checked` and `onChange`. The native input stays in the DOM so arrow-key
 * navigation between same-named radios works without any custom JS.
 */
export declare function Radio({ label, value, disabled, name, checked, onChange, id, }: RadioProps): import("react").JSX.Element;
export declare namespace Radio {
    var displayName: string;
}
