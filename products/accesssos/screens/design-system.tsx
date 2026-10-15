import { SosIcon, type SosIconName } from '@/products/accesssos/components/sos-icon';
import { SosText, type SosTextVariant } from '@/products/accesssos/components/sos-text';
import { emergencyIcons, locationIcons, navigationIcons } from '@/products/accesssos/icons';
import type { PrototypeScreenProps } from '@/lib/prototype/types';
import { ScrollView, View } from 'react-native';

const TYPE_SCALE: { variant: SosTextVariant; sample: string; spec: string }[] = [
  { variant: 'h1', sample: 'Emergency?', spec: 'Header 1 · bold · 32' },
  { variant: 'h2', sample: 'No Internet', spec: 'Header 2 · bold · 32' },
  { variant: 'h3', sample: 'Who needs help?', spec: 'Header 3 · bold · 24' },
  { variant: 'button', sample: 'Go to Settings', spec: 'Button · bold · 20' },
  { variant: 'picker', sample: 'Picker', spec: 'Picker · medium · 20' },
  { variant: 'body-lg', sample: 'Fire / Pain / Traffic accident', spec: 'Body Large · 20' },
  {
    variant: 'body-lg-bold',
    sample: 'Fire / Pain / Traffic accident',
    spec: 'Body Large Bold · 20',
  },
  { variant: 'label', sample: 'Full Name', spec: 'Body bold (labels) · 18' },
  { variant: 'body', sample: 'We’re launching near you soon', spec: 'Body · 18' },
  { variant: 'helper', sample: 'I am at Starbucks', spec: 'Body italic (helper) · 18' },
  { variant: 'placeholder', sample: 'Please type in English', spec: 'Placeholder · medium · 18' },
  { variant: 'subtext', sample: '0/200', spec: 'Subtext · 16' },
  { variant: 'link', sample: 'Sign up for updates', spec: 'Link · bold · 16' },
];

const ICON_SETS: { title: string; icons: Record<string, unknown> }[] = [
  { title: 'Navigation icons', icons: navigationIcons },
  { title: 'Emergency icons', icons: emergencyIcons },
  { title: 'Location icons', icons: locationIcons },
];

/** Reference sheet for the AccessSOS type scale and icons — check the design system on device. */
export function DesignSystemScreen(_props: PrototypeScreenProps) {
  return (
    <ScrollView
      className="bg-background flex-1"
      contentContainerClassName="pt-safe-offset-16 pb-safe-offset-8 gap-10 px-5">
      <View className="gap-6">
        <SosText variant="h1">Typography</SosText>
        {TYPE_SCALE.map(({ variant, sample, spec }) => (
          <View key={variant} className="border-border gap-1 border-b pb-3">
            <SosText variant={variant}>{sample}</SosText>
            <SosText variant="subtext">{spec}</SosText>
          </View>
        ))}
      </View>

      {ICON_SETS.map(({ title, icons }) => (
        <View key={title} className="gap-4">
          <SosText variant="h3">{title}</SosText>
          <View className="flex-row flex-wrap gap-y-5">
            {Object.keys(icons).map((name) => (
              <View key={name} className="w-1/4 items-center gap-1">
                <SosIcon name={name as SosIconName} />
                <SosText variant="subtext" numberOfLines={1}>
                  {name}
                </SosText>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
