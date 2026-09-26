import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { AppPalette } from '@/constants/theme';

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Register Screen</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>
        Registration form coming soon...
      </Text>
      <Button mode="text" onPress={() => router.back()}>
        Back to Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: AppPalette.surface.bg,
  },
  placeholder: {
    marginTop: 16,
    marginBottom: 16,
    color: AppPalette.content.secondary,
  },
});
