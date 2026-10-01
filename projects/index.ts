import type { PrototypeProject } from '@/lib/prototype/types';
import { midnight } from '@/projects/midnight';
import { starter } from '@/projects/starter';

/** Every project that shows up in the project picker. */
export const PROJECTS: PrototypeProject[] = [starter, midnight];
