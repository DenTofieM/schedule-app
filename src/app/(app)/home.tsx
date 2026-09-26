import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { authService } from '@/api/auth';
import { AppPalette } from '@/constants/theme';
import { useAppStore } from '@/store';

export default function HomeScreen() {
  const router = useRouter();
  const currentUser = useAppStore((state) => state.currentUser);
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);
  const sections = useAppStore((state) => state.sections);
  const routines = useAppStore((state) => state.routines);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View className="flex-1 p-5" style={{ backgroundColor: AppPalette.surface.bg }}>
      <Text variant="headlineSmall" style={{ marginBottom: 24, fontWeight: 'bold' }}>
        Welcome, {currentUser?.firstName}!
      </Text>

      <View className="flex-row" style={{ marginBottom: 30 }}>
        <View className="flex-1 p-4 rounded-2xl items-center" style={{ backgroundColor: AppPalette.surface.card, borderWidth: 1, borderColor: AppPalette.surface.border, elevation: 2 }}>
          <Text variant="bodySmall" style={{ color: AppPalette.content.secondary, marginBottom: 8 }}>
            Classes
          </Text>
          <Text variant="headlineMedium" style={{ color: AppPalette.brand[500], fontWeight: 'bold' }}>
            {sections.length}
          </Text>
        </View>

        <View className="flex-1 p-4 rounded-2xl items-center" style={{ marginLeft: 12, backgroundColor: AppPalette.surface.card, borderWidth: 1, borderColor: AppPalette.surface.border, elevation: 2 }}>
          <Text variant="bodySmall" style={{ color: AppPalette.content.secondary, marginBottom: 8 }}>
            Routines
          </Text>
          <Text variant="headlineMedium" style={{ color: AppPalette.brand[500], fontWeight: 'bold' }}>
            {routines.length}
          </Text>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Button mode="contained" onPress={() => router.push('/(app)/routines')} contentStyle={{ paddingVertical: 6 }}>
          View Routines
        </Button>

        <Button mode="contained" onPress={() => router.push('/(app)/builder')} contentStyle={{ paddingVertical: 6 }}>
          Create Routine
        </Button>

        <Button mode="outlined" onPress={() => router.push('/(app)/master-data')} contentStyle={{ paddingVertical: 6 }}>
          Manage Master Data
        </Button>

        <Button mode="text" textColor={AppPalette.status.conflictBadge} onPress={handleLogout} style={{ marginTop: 12 }}>
          Logout
        </Button>
      </View>
    </View>
  );
}

 
