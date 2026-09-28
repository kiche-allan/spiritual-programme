// @types/react is pinned to v18 (see package.json), which predates React's
// ViewTransition API — even though the installed `react` package is v19.
// This augments the "react" module with a minimal type for that export
// until @types/react catches up. See node_modules/react/package.json version
// and node_modules/next/dist/docs/01-app/02-guides/view-transitions.md.
import type { ReactNode } from "react";

declare module "react" {
  type ViewTransitionClassPerType = Record<string, string> & { default?: string };

  interface ViewTransitionProps {
    children?: ReactNode;
    name?: string;
    default?: string | ViewTransitionClassPerType;
    enter?: string | ViewTransitionClassPerType;
    exit?: string | ViewTransitionClassPerType;
    share?: string | ViewTransitionClassPerType;
    update?: string | ViewTransitionClassPerType;
    onEnter?: (element: Element, types: string[]) => void;
    onExit?: (element: Element, types: string[]) => void;
    onShare?: (element: Element, types: string[]) => void;
    onUpdate?: (element: Element, types: string[]) => void;
  }

  export const ViewTransition: (props: ViewTransitionProps) => JSX.Element;
}
