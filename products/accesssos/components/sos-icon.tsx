import { cn } from '@/lib/utils';
import { sosIcons, type SosIconName } from '@/products/accesssos/icons';
import type { SvgProps } from 'react-native-svg';
import { withUniwind } from 'uniwind';

type SosIconProps = Omit<SvgProps, 'width' | 'height' | 'color'> & {
  name: SosIconName;
  className?: string;
};

function SosIconImpl({
  name,
  size,
  ...props
}: Omit<SosIconProps, 'className'> & { size?: number; color?: string }) {
  const Svg = sosIcons[name];
  // Without a size class the icon keeps its Figma size (32pt navigation, 48pt emergency / location).
  return <Svg {...props} {...(size !== undefined && { width: size, height: size })} />;
}

const StyledSosIcon = withUniwind(SosIconImpl, {
  size: { fromClassName: 'className', styleProperty: 'width' },
  color: { fromClassName: 'className', styleProperty: 'color' },
});

/**
 * An icon from the AccessSOS UI Kit (products/accesssos/icons). Size with `size-*`, tint with `text-*`
 * (single-colour icons only — Medical, Police, Fire, Mental and the GPS dots keep their kit colours).
 * Pair icons with a text label, per the kit's iconography guidelines.
 *
 * @example <SosIcon name="phone" className="text-primary size-8" />
 */
function SosIcon({ className, ...props }: SosIconProps) {
  return <StyledSosIcon className={cn('text-sos-gray-900', className)} {...props} />;
}

export { SosIcon };
export type { SosIconName };
