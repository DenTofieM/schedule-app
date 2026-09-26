import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
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
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.welcome}>
        Welcome, {currentUser?.firstName}!
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text variant="bodySmall" style={styles.statLabel}>
            Classes
          </Text>
          <Text variant="headlineMedium" style={styles.statValue}>
            {sections.length}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text variant="bodySmall" style={styles.statLabel}>
            Routines
          </Text>
          <Text variant="headlineMedium" style={styles.statValue}>
            {routines.length}
          </Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Button
          mode="contained"
          onPress={() => router.push('/(app)/routines')}
          style={styles.actionButton}
        >
          View Routines
        </Button>

        <Button
          mode="contained"
          onPress={() => router.push('/(app)/builder')}
          style={styles.actionButton}
        >
          Create Routine
        </Button>

        <Button
          mode="outlined"
          onPress={() => router.push('/(app)/master-data')}
          style={styles.actionButton}
        >
          Manage Master Data
        </Button>

        <Button
          mode="text"
          textColor={AppPalette.status.conflictBadge}
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: AppPalette.surface.bg,
  },
  welcome: {
    marginBottom: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: AppPalette.surface.card,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppPalette.surface.border,
  },
  statLabel: {
    color: AppPalette.content.secondary,
    marginBottom: 8,
  },
  statValue: {
    color: AppPalette.brand[500],
    fontWeight: 'bold',
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    paddingVertical: 6,
  },
  logoutButton: {
    marginTop: 12,
  },
});
