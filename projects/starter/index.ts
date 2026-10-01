import type { PrototypeProject } from '@/lib/prototype/types';
import { BlankScreen } from '@/lib/prototype/blank-screen';

export const starter: PrototypeProject = {
  id: 'starter',
  name: 'Starter',
  theme: 'starter',
  appearance: 'light',
  screens: {
    blank: { name: 'Blank', component: BlankScreen },
  },
  flows: [
    { id: 'onboarding', name: 'Onboarding', steps: ['blank'] },
    { id: 'sign-in', name: 'Sign in', steps: ['blank'] },
    { id: 'checkout', name: 'Checkout', steps: ['blank'] },
    { id: 'settings', name: 'Settings', steps: ['blank'] },
  ],
};
