import '@/global.css';

import { PrototypeProvider } from '@/lib/prototype/prototype-provider';
import { NAV_THEME } from '@/lib/theme';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { ThemeProvider } from 'expo-router/react-navigation';
import { useUniwind } from 'uniwind';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { theme } = useUniwind();

  return (
    <ThemeProvider value={NAV_THEME[theme === 'dark' ? 'dark' : 'light']}>
      <PrototypeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="controls"
            options={{
              presentation: 'formSheet',
              sheetAllowedDetents: [0.45, 0.92],
              sheetGrabberVisible: true,
              // Keep the prototype + top controls interactive while the sheet is at its small detent.
              sheetLargestUndimmedDetentIndex: 0,
            }}
          />
        </Stack>
        <PortalHost />
      </PrototypeProvider>
    </ThemeProvider>
  );
}
