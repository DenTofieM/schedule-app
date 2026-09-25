import { useRouter } from 'expo-router';
import { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Snackbar, Text } from 'react-native-paper';

import { conflictDetectionService } from '@/services/conflict-detection';
import { useAppStore, useRoutineBuilderStore } from '@/store';

export default function BuilderScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  // App store
  const sections = useAppStore((state) => state.sections);
  const teachers = useAppStore((state) => state.teachers);
  const subjects = useAppStore((state) => state.subjects);
  const routines = useAppStore((state) => state.routines);

  // Routine builder store
  const currentRoutineId = useRoutineBuilderStore((state) => state.currentRoutineId);
  const assignments = useRoutineBuilderStore((state) => state.assignments);
  const conflicts = useRoutineBuilderStore((state) => state.conflicts);
  const unsavedChanges = useRoutineBuilderStore((state) => state.unsavedChanges);

  const clearConflicts = useRoutineBuilderStore((state) => state.clearConflicts);
  const addConflict = useRoutineBuilderStore((state) => state.addConflict);

  const currentRoutine = currentRoutineId
    ? routines.find((r) => r.id === currentRoutineId)
    : null;

  const handleCheckConflicts = () => {
    clearConflicts();
    const detectedConflicts = conflictDetectionService.checkRoutineConflicts(
      Array.from(assignments.values()),
      teachers,
      subjects
    );

    detectedConflicts.forEach((conflict) => {
      addConflict(conflict);
    });

    const summary = conflictDetectionService.getConflictSummary(detectedConflicts);
    showSnackbar(
      `Found ${summary.totalConflicts} issues: ${summary.errors} errors, ${summary.warnings} warnings`
    );
  };

  const showSnackbar = (message: string) => {
    setSnackbar({ visible: true, message });
  };

  if (!currentRoutine) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyMedium">Select or create a routine to start building</Text>
        <Button mode="contained" onPress={() => router.push('/(app)/routines')}>
          Go to Routines
        </Button>
      </View>
    );
  }

  const conflictSummary = conflictDetectionService.getConflictSummary(conflicts);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {}} />}
    >
      <View style={styles.header}>
        <Text variant="headlineSmall">{currentRoutine.name}</Text>
        <Text variant="bodySmall">
          {sections.find((s) => s.id === currentRoutine.sectionId)?.name}
        </Text>
      </View>

      <View style={styles.actionBar}>
        <Button mode="outlined" onPress={handleCheckConflicts} icon="check-circle-outline">
          Check Conflicts
        </Button>
        <Button mode="outlined">Save</Button>
      </View>

      {conflicts.length > 0 && (
        <View style={styles.conflictAlert}>
          <Chip
            icon={conflictSummary.errors > 0 ? 'alert-circle' : 'alert'}
            style={{
              backgroundColor: conflictSummary.errors > 0 ? '#ffebee' : '#fff3e0',
            }}
          >
            {conflictSummary.totalConflicts} issue(s)
          </Chip>
        </View>
      )}

      <View style={styles.gridPlaceholder}>
        <Text variant="bodyMedium">Routine Grid Builder (Coming Soon)</Text>
      </View>

      <View style={styles.bottomActions}>
        <Button mode="text" onPress={() => router.back()}>
          Cancel
        </Button>
        <Button mode="contained" disabled={!conflictSummary.canPublish}>
          Publish
        </Button>
      </View>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={3000}
      >
        {snackbar.message}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionBar: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  conflictAlert: {
    padding: 12,
  },
  gridPlaceholder: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    justifyContent: 'flex-end',
  },
});
