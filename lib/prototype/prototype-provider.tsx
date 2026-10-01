import { PROJECTS } from '@/projects';
import type { PrototypeFlow, PrototypeNav, PrototypeProject } from '@/lib/prototype/types';
import * as React from 'react';

type PrototypeState = {
  projectId: string;
  flowId: string;
  /** Screen ids visited in the active flow. Last item is the current screen. */
  history: string[];
};

type PrototypeContextValue = {
  projects: PrototypeProject[];
  project: PrototypeProject;
  flow: PrototypeFlow;
  screenId: string;
  history: string[];
  /** Index of the current screen in `flow.steps`, or -1 when off the flow's path. */
  stepIndex: number;
  nav: PrototypeNav;
  selectProject: (projectId: string) => void;
  selectFlow: (flowId: string) => void;
  /** Jump to a step of the active flow, rebuilding history up to it. */
  jumpToStep: (index: number) => void;
  controlsOpen: boolean;
  setControlsOpen: (open: boolean) => void;
};

const PrototypeContext = React.createContext<PrototypeContextValue | null>(null);

function getProject(projectId: string) {
  return PROJECTS.find((p) => p.id === projectId) ?? PROJECTS[0];
}

function getFlow(project: PrototypeProject, flowId: string) {
  return project.flows.find((f) => f.id === flowId) ?? project.flows[0];
}

function initialState(projectId: string): PrototypeState {
  const project = getProject(projectId);
  const flow = project.flows[0];
  return { projectId: project.id, flowId: flow.id, history: [flow.steps[0]] };
}

export function PrototypeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<PrototypeState>(() => initialState(PROJECTS[0].id));
  const [controlsOpen, setControlsOpen] = React.useState(false);

  const project = getProject(state.projectId);
  const flow = getFlow(project, state.flowId);
  const screenId = state.history[state.history.length - 1];
  const stepIndex = flow.steps.indexOf(screenId);

  const nav = React.useMemo<PrototypeNav>(
    () => ({
      next: () =>
        setState((s) => {
          const f = getFlow(getProject(s.projectId), s.flowId);
          const current = f.steps.indexOf(s.history[s.history.length - 1]);
          const nextId = f.steps[current + 1];
          return nextId ? { ...s, history: [...s.history, nextId] } : s;
        }),
      back: () =>
        setState((s) => (s.history.length > 1 ? { ...s, history: s.history.slice(0, -1) } : s)),
      go: (id) =>
        setState((s) =>
          getProject(s.projectId).screens[id] ? { ...s, history: [...s.history, id] } : s
        ),
      restart: () =>
        setState((s) => ({
          ...s,
          history: [getFlow(getProject(s.projectId), s.flowId).steps[0]],
        })),
    }),
    []
  );

  const selectProject = React.useCallback((projectId: string) => {
    setState(initialState(projectId));
  }, []);

  const selectFlow = React.useCallback((flowId: string) => {
    setState((s) => {
      const f = getFlow(getProject(s.projectId), flowId);
      return { ...s, flowId: f.id, history: [f.steps[0]] };
    });
  }, []);

  const jumpToStep = React.useCallback((index: number) => {
    setState((s) => {
      const f = getFlow(getProject(s.projectId), s.flowId);
      return index >= 0 && index < f.steps.length
        ? { ...s, history: f.steps.slice(0, index + 1) }
        : s;
    });
  }, []);

  const value: PrototypeContextValue = {
    projects: PROJECTS,
    project,
    flow,
    screenId,
    history: state.history,
    stepIndex,
    nav,
    selectProject,
    selectFlow,
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
