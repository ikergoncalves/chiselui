import { ReactNode } from '../../../node_modules/react';
export interface AccordionItem {
    /** Stable identifier; ties a header to its region and appears in `onChange`. */
    id: string;
    /** Header label rendered inside the toggle button. */
    title: ReactNode;
    /** Body revealed when the item is open. */
    content: ReactNode;
    /** Block toggling and dim the header. @default false */
    disabled?: boolean;
}
export interface AccordionProps {
    /** The expandable items, in display order. */
    items: AccordionItem[];
    /** Ids open initially when uncontrolled. @default [] */
    defaultOpenIds?: string[];
    /** Open ids (controlled). Pair with `onChange`. */
    openIds?: string[];
    /** Fired with the full set of open ids after every toggle. */
    onChange?: (openIds: string[]) => void;
    /** Allow several items open at once. When false, opening one closes the rest. @default false */
    allowMultiple?: boolean;
    /** Visual treatment. @default 'default' */
    variant?: 'default' | 'bordered';
}
/**
 * Accordion — a set of expandable sections following the WAI-ARIA accordion
 * pattern. State works controlled (`openIds` + `onChange`) or uncontrolled
 * (`defaultOpenIds`). Each header is a real `<button>` carrying `aria-expanded`
 * and `aria-controls`; its region is `role="region"` linked back via
 * `aria-labelledby`. `allowMultiple` decides whether opening one item closes the
 * others. The slide/fade animation honours `prefers-reduced-motion`.
 */
export declare function Accordion({ items, defaultOpenIds, openIds, onChange, allowMultiple, variant, }: AccordionProps): import("react").JSX.Element;
export declare namespace Accordion {
    var displayName: string;
}
