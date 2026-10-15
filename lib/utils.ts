import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    // Product type scales (`--text-*` in products/<id>/theme.css) are font sizes, not colors —
    // without this, `cn('text-sos-body', 'text-body')` would drop the size.
    theme: {
      text: [
        'sos-h1',
        'sos-h2',
        'sos-h3',
        'sos-button',
        'sos-picker',
        'sos-body-lg',
        'sos-body-lg-bold',
        'sos-body',
        'sos-subtext',
        'sos-link',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
