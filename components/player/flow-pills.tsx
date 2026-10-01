import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { usePrototype } from '@/lib/prototype/prototype-provider';
import * as Haptics from 'expo-haptics';
import { ScrollView } from 'react-native';

/** Horizontally scrolling carousel of the active project's flows. */
export function FlowPills() {
  const { project, flow, selectFlow } = usePrototype();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-5">
      {project.flows.map((f) => {
        const active = f.id === flow.id;
        return (
          <Button
            key={f.id}
            size="pill"
            variant={active ? 'default' : 'secondary'}
            accessibilityState={{ selected: active }}
            onPress={() => {
              Haptics.selectionAsync();
              selectFlow(f.id);
            }}>
            <Text>{f.name}</Text>
          </Button>
        );
      })}
    </ScrollView>
  );
}
