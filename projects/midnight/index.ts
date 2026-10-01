import type { PrototypeProject } from '@/lib/prototype/types';
import { BlankScreen } from '@/lib/prototype/blank-screen';

export const midnight: PrototypeProject = {
  id: 'midnight',
  name: 'Midnight',
  theme: 'midnight',
  appearance: 'dark',
  screens: {
    blank: { name: 'Blank', component: BlankScreen },
  },
  flows: [
    { id: 'home', name: 'Home', steps: ['blank'] },
    { id: 'discover', name: 'Discover', steps: ['blank'] },
  ],
};
