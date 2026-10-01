import type * as React from 'react';
import type { ThemeName } from 'uniwind';

/** Navigation API handed to every prototype screen. Wire it to hotspots / buttons. */
export type PrototypeNav = {
  /** Go to the next step of the active flow. */
  next: () => void;
  /** Go back to the previous screen in history. */
  back: () => void;
  /** Jump to any screen in the project (for branches). */
  go: (screenId: string) => void;
  /** Restart the active flow from its first step. */
  restart: () => void;
};

export type PrototypeScreenProps = {
  nav: PrototypeNav;
};

export type PrototypeScreen = {
  name: string;
  component: React.ComponentType<PrototypeScreenProps>;
};

export type PrototypeFlow = {
  id: string;
  name: string;
  /** Ordered screen ids. The first one is where the flow begins. */
  steps: string[];
};

export type PrototypeProject = {
  id: string;
  name: string;
  /** Uniwind theme defined in `projects/<id>/theme.css` — the project's design system. */
  theme: ThemeName;
  /** Whether the design system is light or dark — drives the status bar and native chrome. */
  appearance: 'light' | 'dark';
  screens: Record<string, PrototypeScreen>;
  flows: PrototypeFlow[];
};
