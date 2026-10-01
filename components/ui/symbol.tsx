import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import * as React from 'react';
import { withUniwind } from 'uniwind';

const StyledSymbol = withUniwind(SymbolView, {
  size: {
    fromClassName: 'className',
    styleProperty: 'width',
  },
  tintColor: {
    fromClassName: 'className',
    styleProperty: 'color',
  },
});

type SymbolProps = SymbolViewProps & { className?: string };

/**
 * Native SF Symbol with Uniwind `className` support. Color comes from `text-*`, size from `size-*`.
 * Inherits the text color of a parent Button / Badge, like `Icon`.
 *
 * @example <Symbol name="play.fill" className="text-primary size-4" />
 */
function Symbol({ className, ...props }: SymbolProps) {
  const textClass = React.useContext(TextClassContext);
  return <StyledSymbol className={cn('text-foreground size-5', textClass, className)} {...props} />;
}

export { Symbol };
