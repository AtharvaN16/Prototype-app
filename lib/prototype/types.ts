import type * as React from 'react';
import type { ThemeName } from 'uniwind';

/** Navigation API handed to every prototype screen. Wire it to hotspots / buttons. */
export type PrototypeNav = {
  /** Go to the next step of the active version. */
  next: () => void;
  /** Go back to the previous screen in history. */
  back: () => void;
  /** Jump to any screen in the project (for branches). */
  go: (screenId: string) => void;
  /** Restart the active version from its first step. */
  restart: () => void;
};

export type PrototypeScreenProps = {
  nav: PrototypeNav;
};

export type PrototypeScreen = {
  name: string;
  component: React.ComponentType<PrototypeScreenProps>;
};

/** One iteration of an exploration (v1, v2, …): an ordered path through screens. */
export type PrototypeVersion = {
  id: string;
  name: string;
  /** Ordered screen ids. The first one is where the version begins. */
  steps: string[];
};

/** A design direction within a project. Shown as the exploration tabs. */
export type PrototypeExploration = {
  id: string;
  name: string;
  versions: PrototypeVersion[];
};

export type PrototypeProject = {
  id: string;
  name: string;
  /** Every screen used by this project's explorations, keyed by screen id. */
  screens: Record<string, PrototypeScreen>;
  explorations: PrototypeExploration[];
};

/** A product owns the design system shared by all of its projects. */
export type PrototypeProduct = {
  id: string;
  name: string;
  /** Uniwind theme defined in `products/<id>/theme.css` — the product's design system. */
  theme: ThemeName;
  /** Whether the design system is light or dark — drives the status bar and native chrome. */
  appearance: 'light' | 'dark';
  projects: PrototypeProject[];
};
