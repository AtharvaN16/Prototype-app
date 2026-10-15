import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import type { Role } from 'react-native';

/**
 * The AccessSOS mobile type scale — "Type Scale (Mobile: Native App)" and "Fonts - Mulish (Mobile)"
 * on the UI Kit's Typography page. Sizes live in products/accesssos/theme.css (`--text-sos-*`).
 */
const sosTextVariants = cva('', {
  variants: {
    variant: {
      /** Titles — "Emergency?" · black · bold · 32 */
      h1: 'text-sos-h1 text-foreground font-bold',
      /** Warnings — "No Internet" · bold · 32 (often in `text-primary`) */
      h2: 'text-sos-h2 text-foreground font-bold',
      /** Flow questions — "Who needs help?" · black · bold · 24 */
      h3: 'text-sos-h3 text-foreground font-bold',
      /** Button names · bold · 20 — red for text buttons; use `text-primary-foreground` on filled buttons */
      button: 'text-sos-button text-primary font-bold',
      /** Pickers · medium · 20 */
      picker: 'text-sos-picker text-foreground font-medium',
      /** Large body / icon text · primary gray · regular · 20 */
      'body-lg': 'text-sos-body-lg text-body',
      /** Icon text, selected state · primary gray · bold · 20 */
      'body-lg-bold': 'text-sos-body-lg-bold text-body font-bold',
      /** Body text, page names, text field content · primary gray · regular · 18 */
      body: 'text-sos-body text-body',
      /** Text field labels — "Full Name" · black · bold · 18 */
      label: 'text-sos-body text-foreground font-bold',
      /** Helper text — "I am at Starbucks" · primary gray · italic · 18 */
      helper: 'text-sos-body text-body italic',
      /** Placeholder text · secondary gray · medium · 18 */
      placeholder: 'text-sos-body text-muted-foreground font-medium',
      /** Subtexts · light gray · regular · 16 */
      subtext: 'text-sos-subtext text-sos-gray-500',
      /** Links · brand red · bold & underlined · 16 */
      link: 'text-sos-link text-primary font-bold underline',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

type SosTextVariant = NonNullable<VariantProps<typeof sosTextVariants>['variant']>;

const ROLE: Partial<Record<SosTextVariant, Role>> = {
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  link: 'link',
};

/** Text in the AccessSOS type scale. Override the colour with a `text-*` class when the kit does (white, red, blue). */
function SosText({
  className,
  variant = 'body',
  ...props
}: Omit<React.ComponentProps<typeof Text>, 'variant'> & { variant?: SosTextVariant }) {
  return (
    <Text
      role={ROLE[variant]}
      {...props}
      variant="default"
      className={cn(sosTextVariants({ variant }), className)}
    />
  );
}

export { SosText, sosTextVariants };
export type { SosTextVariant };
