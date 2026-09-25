import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Menu, Snackbar, Text } from 'react-native-paper';

import { conflictDetectionService } from '@/services/conflict-detection';
import { useAppStore, useRoutineBuilderStore } from '@/store';
import type { Assignment } from '@/types';

type SlotDraft = {
  subjectId: string;
  teacherId: string;
};

export default function BuilderScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });
  const [drafts, setDrafts] = useState<Record<string, SlotDraft>>({});
  const [menuState, setMenuState] = useState<Record<string, { subject: boolean; teacher: boolean }>>({});

  const sections = useAppStore((state) => state.sections);
  const teachers = useAppStore((state) => state.teachers);
  const subjects = useAppStore((state) => state.subjects);
  const days = useAppStore((state) => state.days);
  const periods = useAppStore((state) => state.periods);
  const routines = useAppStore((state) => state.routines);
  const updateRoutine = useAppStore((state) => state.updateRoutine);

  const currentRoutineId = useRoutineBuilderStore((state) => state.currentRoutineId);
  const assignments = useRoutineBuilderStore((state) => state.assignments);
  const conflicts = useRoutineBuilderStore((state) => state.conflicts);
  const clearConflicts = useRoutineBuilderStore((state) => state.clearConflicts);
  const addConflict = useRoutineBuilderStore((state) => state.addConflict);
  const addAssignment = useRoutineBuilderStore((state) => state.addAssignment);

  const currentRoutine = currentRoutineId
    ? routines.find((routine) => routine.id === currentRoutineId)
    : null;

  const subjectMap = useMemo(
    () => new Map(subjects.map((subject) => [subject.id, subject])),
    [subjects]
  );

  const teacherMap = useMemo(
    () => new Map(teachers.map((teacher) => [teacher.id, teacher])),
    [teachers]
  );

  const sortedDays = [...days].sort((a, b) => a.sequenceNumber - b.sequenceNumber);
  const sortedPeriods = [...periods].sort((a, b) => a.sequenceNumber - b.sequenceNumber);

  useEffect(() => {
    if (!currentRoutine) {
      setDrafts({});
      return;
    }

    const nextDrafts: Record<string, SlotDraft> = {};
    currentRoutine.assignments.forEach((assignment) => {
      nextDrafts[`${assignment.dayId}:${assignment.periodId}`] = {
        subjectId: assignment.subjectId,
        teacherId: assignment.teacherId,
      };
    });

    setDrafts(nextDrafts);
  }, [currentRoutine]);

  const showSnackbar = (message: string) => {
    setSnackbar({ visible: true, message });
  };

  const setCellDraft = (dayId: string, periodId: string, patch: Partial<SlotDraft>) => {
    const key = `${dayId}:${periodId}`;
    setDrafts((current) => ({
      ...current,
      [key]: {
        subjectId: current[key]?.subjectId ?? '',
        teacherId: current[key]?.teacherId ?? '',
        ...patch,
      },
    }));
  };

  const clearCellDraft = (dayId: string, periodId: string) => {
    const key = `${dayId}:${periodId}`;
    setDrafts((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const buildAssignmentsFromDrafts = (draftMap: Record<string, SlotDraft>): Assignment[] => {
    if (!currentRoutine) {
      return [];
    }

    return Object.entries(draftMap)
      .filter(([, value]) => value.subjectId && value.teacherId)
      .map(([key, value]) => {
        const [dayId, periodId] = key.split(':');
        const existingAssignment = currentRoutine.assignments.find(
          (assignment) => assignment.dayId === dayId && assignment.periodId === periodId
        );

        return {
          id: existingAssignment?.id ?? `assignment-${currentRoutine.id}-${dayId}-${periodId}`,
          routineId: currentRoutine.id,
          subjectId: value.subjectId,
          teacherId: value.teacherId,
          dayId,
          periodId,
          assignmentOrder: 0,
          createdAt: existingAssignment?.createdAt ?? new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          notes: existingAssignment?.notes ?? '',
        };
      });
  };

  const handleCheckConflicts = () => {
    if (!currentRoutine) return;

    clearConflicts();
    const detectedConflicts = conflictDetectionService.checkRoutineConflicts(
      buildAssignmentsFromDrafts(drafts),
      teachers,
      subjects
    );

    detectedConflicts.forEach((conflict) => addConflict(conflict));
    const summary = conflictDetectionService.getConflictSummary(detectedConflicts);
    showSnackbar(
      `Found ${summary.totalConflicts} issues: ${summary.errors} errors, ${summary.warnings} warnings`
    );
  };

  const handleSaveRoutine = () => {
    if (!currentRoutine) return;

    const nextAssignments = buildAssignmentsFromDrafts(drafts);

    const uniqueSubjects = new Set(nextAssignments.map((assignment) => assignment.subjectId));
    const uniqueTeachers = new Set(nextAssignments.map((assignment) => assignment.teacherId));

    updateRoutine(currentRoutine.id, {
      assignments: nextAssignments,
      totalPeriods: nextAssignments.length,
      subjectsCount: uniqueSubjects.size,
      teachersCount: uniqueTeachers.size,
      updatedAt: new Date().toISOString(),
    });

    nextAssignments.forEach((assignment) => addAssignment(assignment));
    showSnackbar('Routine saved successfully');
  };

  const handlePublish = () => {
    if (!currentRoutine) return;

    const generatedAssignments = buildAssignmentsFromDrafts(drafts);
    const summary = conflictDetectionService.getConflictSummary(
      conflictDetectionService.checkRoutineConflicts(generatedAssignments, teachers, subjects)
    );

    if (!summary.canPublish) {
      showSnackbar('Fix conflicts before publishing this routine.');
      return;
    }

    updateRoutine(currentRoutine.id, {
      status: 'PUBLISHED',
      isActive: true,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    showSnackbar('Routine published');
  };

  const toggleMenu = (key: string, type: 'subject' | 'teacher', visible: boolean) => {
    setMenuState((current) => ({
      ...current,
      [key]: {
        ...(current[key] ?? { subject: false, teacher: false }),
        subject: false,
        teacher: false,
        [type]: visible,
      },
    }));
  };

  const getTeacherOptionsForSubject = (subjectId: string) =>
    teachers.filter(
      (teacher) => teacher.isActive && (!subjectId || teacher.subjectIds.includes(subjectId))
    );

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
          {sections.find((section) => section.id === currentRoutine.sectionId)?.name ?? 'No section'}
        </Text>
      </View>

      <View style={styles.actionBar}>
        <Button mode="outlined" onPress={handleCheckConflicts} icon="check-circle-outline">
          Check Conflicts
        </Button>
        <Button mode="outlined" onPress={handleSaveRoutine}>
          Save
        </Button>
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

      <View style={styles.gridWrapper}>
        <ScrollView horizontal>
          <View>
            <View style={styles.gridHeaderRow}>
              <Text style={styles.gridHeaderCell}>Period</Text>
              {sortedDays.map((day) => (
                <Text key={day.id} style={styles.gridHeaderCell}>
                  {day.name}
                </Text>
              ))}
            </View>

            {sortedPeriods.map((period) => (
              <View key={period.id} style={styles.gridRow}>
                <Text style={styles.periodCell}>{period.name}</Text>
                {sortedDays.map((day) => {
                  const key = `${day.id}:${period.id}`;
                  const selection = drafts[key] ?? { subjectId: '', teacherId: '' };
                  const menuKey = `${day.id}-${period.id}`;
                  const availableTeachers = getTeacherOptionsForSubject(selection.subjectId);

                  return (
                    <View key={`${day.id}-${period.id}`} style={styles.slotCell}>
                      <Menu
                        visible={menuState[menuKey]?.subject ?? false}
                        onDismiss={() => toggleMenu(menuKey, 'subject', false)}
                        anchor={
                          <Button
                            mode={selection.subjectId ? 'contained-tonal' : 'outlined'}
                            compact
                            onPress={() => toggleMenu(menuKey, 'subject', true)}
                          >
                            {selection.subjectId
                              ? subjectMap.get(selection.subjectId)?.name ?? 'Select subject'
                              : 'Subject'}
                          </Button>
                        }
                      >
                        {subjects.map((subject) => (
                          <Menu.Item
                            key={subject.id}
                            onPress={() => {
                              setCellDraft(day.id, period.id, {
                                subjectId: subject.id,
                                teacherId: '',
                              });
                              toggleMenu(menuKey, 'subject', false);
                            }}
                            title={subject.name}
                          />
                        ))}
                      </Menu>

                      <Menu
                        visible={menuState[menuKey]?.teacher ?? false}
                        onDismiss={() => toggleMenu(menuKey, 'teacher', false)}
                        anchor={
                          <Button
                            mode={selection.teacherId ? 'contained-tonal' : 'outlined'}
                            compact
                            disabled={!selection.subjectId}
                            onPress={() => toggleMenu(menuKey, 'teacher', true)}
                          >
                            {selection.teacherId
                              ? `${teacherMap.get(selection.teacherId)?.firstName ?? ''} ${teacherMap.get(selection.teacherId)?.lastName ?? ''}`.trim() || 'Teacher'
                              : 'Teacher'}
                          </Button>
                        }
                      >
                        {availableTeachers.length === 0 ? (
                          <Menu.Item
                            onPress={() => toggleMenu(menuKey, 'teacher', false)}
                            title="No teachers for this subject"
                          />
                        ) : (
                          availableTeachers.map((teacher) => (
                            <Menu.Item
                              key={teacher.id}
                              onPress={() => {
                                setCellDraft(day.id, period.id, {
                                  teacherId: teacher.id,
                                });
                                toggleMenu(menuKey, 'teacher', false);
                              }}
                              title={`${teacher.firstName} ${teacher.lastName}`}
                            />
                          ))
                        )}
                      </Menu>

                      <Button
                        mode="text"
                        compact
                        textColor="#d32f2f"
                        onPress={() => clearCellDraft(day.id, period.id)}
                      >
                        Clear
                      </Button>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomActions}>
        <Button mode="text" onPress={() => router.back()}>
          Cancel
        </Button>
        <Button mode="contained" disabled={conflictSummary.errors > 0} onPress={handlePublish}>
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
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  gridWrapper: {
    marginHorizontal: 12,
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
  },
  gridHeaderRow: {
    flexDirection: 'row',
    minWidth: 700,
  },
  gridHeaderCell: {
    width: 120,
    padding: 8,
    fontWeight: '700',
    textAlign: 'center',
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  gridRow: {
    flexDirection: 'row',
    minWidth: 700,
  },
  periodCell: {
    width: 80,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  slotCell: {
    width: 120,
    minHeight: 120,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 6,
    justifyContent: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    justifyContent: 'flex-end',
  },
});
