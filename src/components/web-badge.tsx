import { Image } from 'expo-image';
import { version } from 'expo/package.json';
import { useColorScheme } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

export function WebBadge() {
  const scheme = useColorScheme();

  return (
    <ThemedView style={{ padding: Spacing.five, alignItems: 'center', gap: Spacing.two }}>
      <ThemedText type="code" themeColor="textSecondary" style={{ textAlign: 'center' }}>
        v{version}
      </ThemedText>
      <Image
        source={
          scheme === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={{ width: 123, aspectRatio: 123 / 24 }}
      />
    </ThemedView>
  );
}
