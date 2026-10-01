import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { usePrototype } from '@/lib/prototype/prototype-provider';
import * as Haptics from 'expo-haptics';
import { ScrollView } from 'react-native';

/** Horizontally scrolling tabs for the active project's explorations. */
export function ExplorationTabs() {
  const { project, exploration, selectExploration } = usePrototype();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-5">
      {project.explorations.map((e) => {
        const active = e.id === exploration.id;
        return (
          <Button
            key={e.id}
            size="pill"
            variant={active ? 'default' : 'secondary'}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => {
              Haptics.selectionAsync();
              selectExploration(e.id);
            }}>
            <Text>{e.name}</Text>
          </Button>
        );
      })}
    </ScrollView>
  );
}
