import { BlankScreen } from '@/lib/prototype/blank-screen';
import type { PrototypeProject } from '@/lib/prototype/types';

export const assistiveCall: PrototypeProject = {
  id: 'assistive-call',
  name: 'Assistive Call',
  screens: {
    blank: { name: 'Blank', component: BlankScreen },
  },
  // Placeholder explorations — replace with the real ones.
  explorations: [
    {
      id: 'exploration-a',
      name: 'Exploration A',
      versions: [
        { id: 'v1', name: 'v1', steps: ['blank'] },
        { id: 'v2', name: 'v2', steps: ['blank'] },
        { id: 'v3', name: 'v3', steps: ['blank'] },
      ],
    },
    {
      id: 'exploration-b',
      name: 'Exploration B',
      versions: [{ id: 'v1', name: 'v1', steps: ['blank'] }],
    },
  ],
};
