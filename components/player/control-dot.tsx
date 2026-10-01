import { Glass } from '@/components/player/glass';
import { Pressable, View } from 'react-native';

type ControlDotProps = {
  onPress: () => void;
  colorScheme: 'light' | 'dark';
};

/**
 * The small dot that opens the prototype controls. Visually tiny, but the
 * touch target is 64pt (+ hitSlop) so it's easy to hit without looking.
 * Render it inside the project's ScopedTheme so it contrasts with the prototype.
 */
export function ControlDot({ onPress, colorScheme }: ControlDotProps) {
  return (
    <View pointerEvents="box-none" className="bottom-safe absolute left-1">
      <Pressable
        onPress={onPress}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Open prototype controls"
        className="size-16 items-center justify-center active:opacity-60">
        <Glass
          colorScheme={colorScheme}
          isInteractive
          className="size-7 items-center justify-center overflow-hidden rounded-full">
          <View className="bg-foreground/50 size-2 rounded-full" />
        </Glass>
      </Pressable>
    </View>
  );
}
