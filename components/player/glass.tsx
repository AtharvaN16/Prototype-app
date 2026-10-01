import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable, type GlassViewProps } from 'expo-glass-effect';
import { withUniwind } from 'uniwind';

const StyledGlassView = withUniwind(GlassView);
const StyledBlurView = withUniwind(BlurView);

type GlassProps = Omit<GlassViewProps, 'colorScheme' | 'ref'> & {
  className?: string;
  colorScheme: 'light' | 'dark';
};

/** iOS 26 Liquid Glass, falling back to a system material blur on older iOS. */
export function Glass({ colorScheme, isInteractive, glassEffectStyle, ...props }: GlassProps) {
  if (isLiquidGlassAvailable()) {
    return (
      <StyledGlassView
        colorScheme={colorScheme}
        isInteractive={isInteractive}
        glassEffectStyle={glassEffectStyle}
        {...props}
      />
    );
  }
  return (
    <StyledBlurView
      intensity={80}
      tint={colorScheme === 'dark' ? 'systemChromeMaterialDark' : 'systemChromeMaterialLight'}
      {...props}
    />
  );
}
