import { ControlDot } from '@/components/player/control-dot';
import { ControlsOverlay } from '@/components/player/controls-overlay';
import { MissingScreen } from '@/lib/prototype/missing-screen';
import { usePrototype } from '@/lib/prototype/prototype-provider';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import * as React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ScopedTheme, useUniwind } from 'uniwind';

/** The prototype player: the active screen (in the product's theme), the control dot, and the controls overlay. */
export default function PlayerScreen() {
  const router = useRouter();
  const { theme } = useUniwind();
  const { product, project, exploration, version, screenId, history, nav, controlsOpen } =
    usePrototype();
  const Screen = project.screens[screenId]?.component ?? MissingScreen;

  function openControls() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/controls');
  }

  function closeControls() {
    if (router.canGoBack()) router.back();
  }

  const statusBarScheme = controlsOpen ? theme : product.appearance;
  React.useEffect(() => {
    setStatusBarStyle(statusBarScheme === 'dark' ? 'light' : 'dark', true);
  }, [statusBarScheme]);

  return (
    <View className="flex-1">
      <ScopedTheme theme={product.theme}>
        <View className="bg-background flex-1">
          <Animated.View
            key={`${project.id}:${exploration.id}:${version.id}:${history.length}:${screenId}`}
            entering={FadeIn.duration(180)}
            className="flex-1">
            <Screen nav={nav} />
          </Animated.View>
          {!controlsOpen && <ControlDot onPress={openControls} colorScheme={product.appearance} />}
        </View>
      </ScopedTheme>

      {controlsOpen && <ControlsOverlay onClose={closeControls} />}
    </View>
  );
}
