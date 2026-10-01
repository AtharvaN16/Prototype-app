import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Symbol } from '@/components/ui/symbol';
import { Text } from '@/components/ui/text';
import { usePrototype } from '@/lib/prototype/prototype-provider';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

/** Native iOS bottom sheet with the playback controls for the active flow. */
export default function ControlsSheet() {
  const router = useRouter();
  const { project, flow, history, stepIndex, nav, jumpToStep, setControlsOpen } = usePrototype();

  React.useEffect(() => {
    setControlsOpen(true);
    return () => setControlsOpen(false);
  }, [setControlsOpen]);

  const started = history.length > 1;
  const isFirst = history.length <= 1;
  const isLast = stepIndex < 0 || stepIndex >= flow.steps.length - 1;

  function begin() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    nav.restart();
    router.back();
  }

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-6 px-6 pt-8 pb-safe-offset-6">
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1 gap-1">
          <Text variant="muted">{project.name}</Text>
          <Text variant="h3">{flow.name}</Text>
        </View>
        <Badge variant="secondary">
          <Text>
            {stepIndex >= 0 ? `Step ${stepIndex + 1} of ${flow.steps.length}` : 'Off flow'}
          </Text>
        </Badge>
      </View>

      <View className="gap-3">
        <Button size="lg" onPress={begin}>
          <Symbol name={started ? 'arrow.counterclockwise' : 'play.fill'} className="size-4" />
          <Text>{started ? 'Play again' : 'Begin flow'}</Text>
        </Button>
        <View className="flex-row gap-3">
          <Button variant="outline" className="flex-1" disabled={isFirst} onPress={nav.back}>
            <Symbol name="chevron.left" className="size-4" />
            <Text>Back</Text>
          </Button>
          <Button variant="outline" className="flex-1" disabled={isLast} onPress={nav.next}>
            <Text>Next</Text>
            <Symbol name="chevron.right" className="size-4" />
          </Button>
        </View>
      </View>

      <Separator />

      <View className="gap-1">
        <Text variant="overline" className="mb-2">
          Screens in this flow
        </Text>
        {flow.steps.map((id, i) => {
          const current = i === stepIndex;
          return (
            <Pressable
              key={`${id}-${i}`}
              accessibilityRole="button"
              accessibilityState={{ selected: current }}
              onPress={() => {
                Haptics.selectionAsync();
                jumpToStep(i);
              }}
              className="active:bg-accent flex-row items-center gap-3 rounded-lg px-3 py-3">
              <Text variant="muted" className="w-6">
                {i + 1}
              </Text>
              <Text className="flex-1">{project.screens[id]?.name ?? id}</Text>
              {current && <Symbol name="checkmark" weight="semibold" className="size-4" />}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
