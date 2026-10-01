import { Text } from '@/components/ui/text';
import { View } from 'react-native';

/** Shown when a flow references a screen id that isn't registered on the project. */
export function MissingScreen() {
  return (
    <View className="bg-background flex-1 items-center justify-center p-8">
      <Text variant="muted" className="text-center">
        This screen isn’t registered in the project’s `screens`.
      </Text>
    </View>
  );
}
