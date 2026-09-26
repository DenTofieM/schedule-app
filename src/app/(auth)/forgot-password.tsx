import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { AppPalette } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: AppPalette.surface.bg }}>
      <Text variant="headlineSmall">Forgot Password</Text>
      <Text variant="bodyMedium" style={{ marginTop: 16, marginBottom: 16, color: AppPalette.content.secondary }}>
        Password reset form coming soon...
      </Text>
      <Button mode="text" onPress={() => router.back()}>
        Back to Login
      </Button>
    </View>
  );
}

