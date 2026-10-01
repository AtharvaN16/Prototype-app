import { FlowPills } from '@/components/player/flow-pills';
import { ProjectPicker } from '@/components/player/project-picker';
import { Text } from '@/components/ui/text';
import { BlurView } from 'expo-blur';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

const StyledBlurView = withUniwind(BlurView);

type ControlsOverlayProps = {
  onClose: () => void;
};

/**
 * Top half of the controls: frosted backdrop over the prototype, the project
 * picker and the flow carousel. The bottom half is the native sheet in `app/controls.tsx`.
 */
export function ControlsOverlay({ onClose }: ControlsOverlayProps) {
  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      className="absolute inset-0">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close controls"
        onPress={onClose}
        className="absolute inset-0">
        <StyledBlurView intensity={40} tint="systemThinMaterial" className="absolute inset-0" />
        <View className="bg-scrim absolute inset-0" />
      </Pressable>

      <Animated.View entering={FadeInUp.duration(260)} className="pt-safe-offset-3 gap-5">
        <View className="gap-1 px-5">
          <Text variant="overline">Project</Text>
          <ProjectPicker />
        </View>
        <View className="gap-2">
          <Text variant="overline" className="mx-5">
            Flows
          </Text>
          <FlowPills />
        </View>
      </Animated.View>
    </Animated.View>
  );
}
