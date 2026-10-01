import type { PrototypeProduct } from '@/lib/prototype/types';
import { assistiveCall } from '@/products/accesssos/projects/assistive-call';

export const accesssos: PrototypeProduct = {
  id: 'accesssos',
  name: 'AccessSOS',
  theme: 'accesssos',
  appearance: 'light',
  projects: [assistiveCall],
};
