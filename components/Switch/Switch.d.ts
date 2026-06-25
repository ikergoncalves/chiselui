export type SwitchSize = 'sm' | 'md';
export type SwitchLabelPosition = 'left' | 'right';
export interface SwitchProps {
    /** Text shown beside the track; the whole label is clickable. */
    label?: string;
    /** Controlled on/off state. @default false */
    checked?: boolean;
    /** Fired with the next checked value whenever the user toggles the switch. */
    onChange?: (checked: boolean) => void;
    /** Block interaction and dim the control. @default false */
    disabled?: boolean;
    /** Track and thumb size. @default 'md' */
    size?: SwitchSize;
    /** Which side of the track the label sits on. @default 'right' */
    labelPosition?: SwitchLabelPosition;
    /** Caller-supplied id; falls back to a generated, stable one. */
    id?: string;
}
/**
 * Switch — an on/off toggle built on a visually-hidden native checkbox.
 *
 * The input carries `role="switch"` so assistive tech announces it as a switch
 * rather than a checkbox; the visible track + thumb are decorative and the thumb
 * slides via a CSS `transform` transition. `aria-checked` is set explicitly so
 * the state is reported the same way across browsers and tests.
 */
export declare function Switch({ label, checked, onChange, disabled, size, labelPosition, id: idProp, }: SwitchProps): import("react").JSX.Element;
export declare namespace Switch {
    var displayName: string;
}
