import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, Card, Divider, Menu, Text, TextInput } from 'react-native-paper';

import { AppPalette } from '@/constants/theme';
import { useAppStore, useRoutineBuilderStore } from '@/store';
import type { Routine } from '@/types';

const defaultRoutineForm = {
  sectionId: '',
  name: '',
  description: '',
  academicYear: new Date().getFullYear().toString(),
};

export default function RoutinesScreen() {
  const router = useRouter();
  const sections = useAppStore((state) => state.sections);
  const routines = useAppStore((state) => state.routines);
  const createRoutine = useAppStore((state) => state.createRoutine);
  const updateRoutine = useAppStore((state) => state.updateRoutine);
  const deleteRoutine = useAppStore((state) => state.deleteRoutine);
  const setCurrentRoutineId = useRoutineBuilderStore((state) => state.setCurrentRoutineId);

  const [form, setForm] = useState(defaultRoutineForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === form.sectionId) ?? sections[0],
    [sections, form.sectionId]
  );

  const resetForm = () => {
    setForm({
      ...defaultRoutineForm,
      sectionId: sections[0]?.id ?? '',
      academicYear: new Date().getFullYear().toString(),
    });
    setEditingId(null);
  };

  const handleSubmit = () => {
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      Alert.alert('Missing routine name', 'Please enter a routine name.');
      return;
    }

    const sectionId = form.sectionId || sections[0]?.id || '';
    const currentTime = new Date().toISOString();

    if (editingId) {
      updateRoutine(editingId, {
        sectionId,
        name: trimmedName,
        description: form.description.trim(),
        academicYear: form.academicYear.trim() || new Date().getFullYear().toString(),
      });
      Alert.alert('Routine updated', 'The routine has been updated successfully.');
    } else {
      const newRoutine: Routine = {
        id: `routine-${Date.now()}`,
        sectionId: sectionId,
        name: trimmedName,
        description: form.description.trim(),
        academicYear: form.academicYear.trim() || new Date().getFullYear().toString(),
        version: 1,
        assignments: [],
        status: 'DRAFT',
        isActive: true,
        createdAt: currentTime,
        updatedAt: currentTime,
        createdBy: 'admin',
        totalPeriods: 0,
        subjectsCount: 0,
        teachersCount: 0,
      };

      createRoutine(newRoutine);
      Alert.alert('Routine created', 'The new routine has been created.');
    }

    resetForm();
  };

  const handleEdit = (routine: Routine) => {
    setEditingId(routine.id);
    setForm({
      sectionId: routine.sectionId,
      name: routine.name,
      description: routine.description ?? '',
      academicYear: routine.academicYear,
    });
  };

  const handleDelete = (routineId: string) => {
    Alert.alert('Delete routine', 'Are you sure you want to delete this routine?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteRoutine(routineId);
          if (editingId === routineId) {
            resetForm();
          }
        },
      },
    ]);
  };

  const handleOpenBuilder = (routine: Routine) => {
    setCurrentRoutineId(routine.id);
    router.push('/(app)/builder');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: AppPalette.surface.bg }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text variant="headlineSmall">Routine Management</Text>
      <Text variant="bodyMedium" style={{ marginTop: 8, marginBottom: 18, color: AppPalette.content.secondary }}>
        Create, edit, and manage class routines.
      </Text>

      <View style={{ backgroundColor: AppPalette.surface.card, borderRadius: 12, padding: 16, marginBottom: 20, elevation: 2, borderWidth: 1, borderColor: AppPalette.surface.border }}>
        <Text variant="titleMedium" style={{ marginBottom: 12 }}>
          {editingId ? 'Edit Routine' : 'Add Routine'}
        </Text>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)}
              style={{ marginBottom: 12 }}
            >
              {selectedSection ? selectedSection.name : 'Select section'}
            </Button>
          }
        >
          {sections.map((section) => (
            <Menu.Item
              key={section.id}
              onPress={() => {
                setForm((current) => ({ ...current, sectionId: section.id }));
                setMenuVisible(false);
              }}
              title={section.name}
            />
          ))}
        </Menu>

        <TextInput
          label="Routine name"
          value={form.name}
          onChangeText={(value) => setForm((current) => ({ ...current, name: value }))}
          mode="outlined"
          style={{ marginBottom: 12, backgroundColor: AppPalette.surface.card }}
        />

        <TextInput
          label="Academic year"
          value={form.academicYear}
          onChangeText={(value) => setForm((current) => ({ ...current, academicYear: value }))}
          mode="outlined"
          style={{ marginBottom: 12, backgroundColor: AppPalette.surface.card }}
        />

        <TextInput
          label="Description"
          value={form.description}
          onChangeText={(value) => setForm((current) => ({ ...current, description: value }))}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={{ marginBottom: 12, backgroundColor: AppPalette.surface.card }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 10, marginTop: 6 }}>
          <Button mode="contained" onPress={handleSubmit}>
            {editingId ? 'Update Routine' : 'Create Routine'}
          </Button>
          {editingId && (
            <Button mode="text" onPress={resetForm}>
              Cancel
            </Button>
          )}
        </View>
      </View>
      <Divider style={{ marginVertical: 16 }} />

      <Text variant="titleMedium" style={{ marginBottom: 12 }}>
        Existing Routines
      </Text>

      {routines.length === 0 ? (
        <Card style={{ backgroundColor: AppPalette.surface.card, borderWidth: 1, borderColor: AppPalette.surface.border }}>
          <Card.Content>
            <Text variant="bodyMedium">No routines yet. Create your first timetable.</Text>
          </Card.Content>
        </Card>
      ) : (
        routines.map((routine) => (
          <Card key={routine.id} style={{ marginBottom: 12, backgroundColor: AppPalette.surface.card, borderWidth: 1, borderColor: AppPalette.surface.border }}>
            <Card.Content>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text variant="titleMedium">{routine.name}</Text>
                <Text variant="labelLarge" style={{ color: AppPalette.brand[700], backgroundColor: AppPalette.brand[50], paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, overflow: 'hidden' }}>
                  {routine.status}
                </Text>
              </View>

              <Text variant="bodyMedium" style={{ marginBottom: 4, color: AppPalette.content.secondary }}>
                {sections.find((section) => section.id === routine.sectionId)?.name ?? 'Unassigned'}
              </Text>
              <Text variant="bodySmall" style={{ marginBottom: 4, color: AppPalette.content.secondary }}>
                Academic year: {routine.academicYear}
              </Text>
              <Text variant="bodySmall" style={{ marginBottom: 4, color: AppPalette.content.secondary }}>
                {routine.description || 'No description provided'}
              </Text>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                <Button compact mode="contained-tonal" onPress={() => handleOpenBuilder(routine)}>
                  Open Builder
                </Button>
                <Button compact mode="outlined" onPress={() => handleEdit(routine)}>
                  Edit
                </Button>
                <Button
                  compact
                  mode="text"
                  textColor={AppPalette.status.conflictBadge}
                  onPress={() => handleDelete(routine.id)}
                >
                  Delete
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

 
