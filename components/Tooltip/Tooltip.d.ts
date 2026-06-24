import { ReactElement, ReactNode } from '../../../node_modules/react';
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';
export interface TooltipProps {
    /** The bubble contents. */
    content: ReactNode;
    /** Side of the trigger to anchor on; flips automatically near a viewport edge.
     * @default 'top' */
    placement?: TooltipPlacement;
    /** Delay in ms before opening on hover. @default 300 */
    delay?: number;
    /** The single trigger element. Must accept a ref and DOM props. */
    children: ReactElement;
}
/**
 * Tooltip — an accessible, edge-aware hover/focus bubble.
 *
 * Positioning is delegated to Floating UI: `offset` + `flip` + `shift` keep the
 * bubble on-screen even at the viewport edges, which is the whole reason this is
 * the one component allowed an external dependency. Opens on pointer hover (after
 * `delay`) and on keyboard focus, so it's reachable without a mouse.
 */
export declare function Tooltip({ content, placement, delay, children, }: TooltipProps): import("react").JSX.Element;
export declare namespace Tooltip {
    var displayName: string;
}
