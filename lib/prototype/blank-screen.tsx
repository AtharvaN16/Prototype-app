import type { PrototypeScreenProps } from '@/lib/prototype/types';
import { View } from 'react-native';

export function BlankScreen(_props: PrototypeScreenProps) {
  return <View className="bg-background flex-1" />;
}
