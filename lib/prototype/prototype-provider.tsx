import type {
  PrototypeExploration,
  PrototypeNav,
  PrototypeProduct,
  PrototypeProject,
  PrototypeVersion,
} from '@/lib/prototype/types';
import { PRODUCTS } from '@/products';
import * as React from 'react';

type Selection = {
  productId: string;
  projectId: string;
  explorationId: string;
  versionId: string;
};

type PrototypeState = Selection & {
  /** Screen ids visited in the active version. Last item is the current screen. */
  history: string[];
};

type PrototypeContextValue = {
  products: PrototypeProduct[];
  product: PrototypeProduct;
  project: PrototypeProject;
  exploration: PrototypeExploration;
  version: PrototypeVersion;
  screenId: string;
  history: string[];
  /** Index of the current screen in `version.steps`, or -1 when off the version's path. */
  stepIndex: number;
  nav: PrototypeNav;
  selectProject: (productId: string, projectId: string) => void;
  selectExploration: (explorationId: string) => void;
  selectVersion: (versionId: string) => void;
  /** Jump to a step of the active version, rebuilding history up to it. */
  jumpToStep: (index: number) => void;
  controlsOpen: boolean;
  setControlsOpen: (open: boolean) => void;
};

const PrototypeContext = React.createContext<PrototypeContextValue | null>(null);

/** Resolves a (possibly stale) selection to real objects, falling back to the first of each. */
function resolve(sel: Partial<Selection>) {
  const product = PRODUCTS.find((p) => p.id === sel.productId) ?? PRODUCTS[0];
  const project = product.projects.find((p) => p.id === sel.projectId) ?? product.projects[0];
  const exploration =
    project.explorations.find((e) => e.id === sel.explorationId) ?? project.explorations[0];
  const version =
    exploration.versions.find((v) => v.id === sel.versionId) ?? exploration.versions[0];
  return { product, project, exploration, version };
}

/** A fresh state for a selection, starting at the version's first step. */
function startState(sel: Partial<Selection>): PrototypeState {
  const { product, project, exploration, version } = resolve(sel);
  return {
    productId: product.id,
    projectId: project.id,
    explorationId: exploration.id,
    versionId: version.id,
    history: [version.steps[0]],
  };
}

export function PrototypeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<PrototypeState>(() => startState({}));
  const [controlsOpen, setControlsOpen] = React.useState(false);

  const { product, project, exploration, version } = resolve(state);
  const screenId = state.history[state.history.length - 1];
  const stepIndex = version.steps.indexOf(screenId);

  const nav = React.useMemo<PrototypeNav>(
    () => ({
      next: () =>
        setState((s) => {
          const { version: v } = resolve(s);
          const nextId = v.steps[v.steps.indexOf(s.history[s.history.length - 1]) + 1];
          return nextId ? { ...s, history: [...s.history, nextId] } : s;
        }),
      back: () =>
        setState((s) => (s.history.length > 1 ? { ...s, history: s.history.slice(0, -1) } : s)),
      go: (id) =>
        setState((s) =>
          resolve(s).project.screens[id] ? { ...s, history: [...s.history, id] } : s
        ),
      restart: () => setState((s) => ({ ...s, history: [resolve(s).version.steps[0]] })),
    }),
    []
  );

  const selectProject = React.useCallback((productId: string, projectId: string) => {
    setState(startState({ productId, projectId }));
  }, []);

  const selectExploration = React.useCallback((explorationId: string) => {
    setState((s) => startState({ ...s, explorationId, versionId: undefined }));
  }, []);

  const selectVersion = React.useCallback((versionId: string) => {
    setState((s) => startState({ ...s, versionId }));
  }, []);

  const jumpToStep = React.useCallback((index: number) => {
    setState((s) => {
      const { version: v } = resolve(s);
      return index >= 0 && index < v.steps.length
        ? { ...s, history: v.steps.slice(0, index + 1) }
        : s;
    });
  }, []);

  const value: PrototypeContextValue = {
    products: PRODUCTS,
    product,
    project,
    exploration,
    version,
    screenId,
    history: state.history,
    stepIndex,
    nav,
    selectProject,
    selectExploration,
    selectVersion,
    jumpToStep,
    controlsOpen,
    setControlsOpen,
  };

  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototype() {
  const ctx = React.useContext(PrototypeContext);
  if (!ctx) throw new Error('usePrototype must be used inside <PrototypeProvider>');
  return ctx;
}
