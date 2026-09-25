import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Button, Card, Dialog, Portal, Text } from 'react-native-paper';

import { addEntity, removeEntity, updateEntity } from '@/services/master-data';
import { storageService } from '@/services/storage';
import { useAppStore } from '@/store';
import type { Day, Period, Section, Subject, Teacher } from '@/types';

const tabs = [
  { key: 'sections', label: 'Classes' },
  { key: 'subjects', label: 'Subjects' },
  { key: 'teachers', label: 'Teachers' },
  { key: 'days', label: 'Days' },
  { key: 'periods', label: 'Periods' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

type DraftState = {
  id?: string;
  name: string;
  yearLevel: string;
  section: string;
  description: string;
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  telephone: string;
  subjectIdsText: string;
  dayOfWeek: string;
  isWorkingDay: boolean;
  startTime: string;
  endTime: string;
  sequenceNumber: string;
  isBreak: boolean;
};

const createEmptyDraft = (): DraftState => ({
  name: '',
  yearLevel: '',
  section: '',
  description: '',
  code: '',
  firstName: '',
  lastName: '',
  email: '',
  employeeId: '',
  telephone: '',
  subjectIdsText: '',
  dayOfWeek: '',
  isWorkingDay: true,
  startTime: '08:00',
  endTime: '08:45',
  sequenceNumber: '1',
  isBreak: false,
});

const toNumericInput = (value: string) => Number(value || '0') || 1;

export default function MasterDataScreen() {
  const sections = useAppStore((state) => state.sections);
  const subjects = useAppStore((state) => state.subjects);
  const teachers = useAppStore((state) => state.teachers);
  const days = useAppStore((state) => state.days);
  const periods = useAppStore((state) => state.periods);
  const setSections = useAppStore((state) => state.setSections);
  const setSubjects = useAppStore((state) => state.setSubjects);
  const setTeachers = useAppStore((state) => state.setTeachers);
  const setDays = useAppStore((state) => state.setDays);
  const setPeriods = useAppStore((state) => state.setPeriods);

  const [activeTab, setActiveTab] = useState<TabKey>('sections');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftState>(createEmptyDraft());
  const [error, setError] = useState<string | null>(null);

  const currentItems = useMemo(() => {
    switch (activeTab) {
      case 'subjects':
        return subjects;
      case 'teachers':
        return teachers;
      case 'days':
        return days;
      case 'periods':
        return periods;
      case 'sections':
      default:
        return sections;
    }
  }, [activeTab, days, periods, sections, subjects, teachers]);

  const persistCatalog = async (catalog: TabKey, nextItems: Section[] | Subject[] | Teacher[] | Day[] | Period[]) => {
    switch (catalog) {
      case 'sections':
        setSections(nextItems as Section[]);
        break;
      case 'subjects':
        setSubjects(nextItems as Subject[]);
        break;
      case 'teachers':
        setTeachers(nextItems as Teacher[]);
        break;
      case 'days':
        setDays(nextItems as Day[]);
        break;
      case 'periods':
        setPeriods(nextItems as Period[]);
        break;
      default:
        break;
    }

    const nextState = useAppStore.getState();
    await storageService.saveAllData({
      sections: nextState.sections,
      subjects: nextState.subjects,
      teachers: nextState.teachers,
      days: nextState.days,
      periods: nextState.periods,
      routines: nextState.routines,
    });
  };

  const openCreateForm = () => {
    setEditingId(null);
    setDraft(createEmptyDraft());
    setError(null);
    setIsEditorOpen(true);
  };

  const openEditForm = (itemId: string) => {
    let item: Section | Subject | Teacher | Day | Period | undefined;

    switch (activeTab) {
      case 'sections':
        item = sections.find((entry) => entry.id === itemId);
        break;
      case 'subjects':
        item = subjects.find((entry) => entry.id === itemId);
        break;
      case 'teachers':
        item = teachers.find((entry) => entry.id === itemId);
        break;
      case 'days':
        item = days.find((entry) => entry.id === itemId);
        break;
      case 'periods':
        item = periods.find((entry) => entry.id === itemId);
        break;
      default:
        item = undefined;
    }

    if (!item) {
      return;
    }

    setEditingId(itemId);

    switch (activeTab) {
      case 'sections': {
        const section = item as Section;
        setDraft({
          id: section.id,
          name: section.name,
          yearLevel: String(section.yearLevel),
          section: section.section,
          description: section.description ?? '',
          code: '',
          firstName: '',
          lastName: '',
          email: '',
          employeeId: '',
          telephone: '',
          subjectIdsText: '',
          dayOfWeek: '',
          isWorkingDay: true,
          startTime: '08:00',
          endTime: '08:45',
          sequenceNumber: '1',
          isBreak: false,
        });
        break;
      }
      case 'subjects': {
        const subject = item as Subject;
        setDraft({
          id: subject.id,
          name: subject.name,
          yearLevel: '',
          section: '',
          description: subject.description ?? '',
          code: subject.code,
          firstName: '',
          lastName: '',
          email: '',
          employeeId: '',
          telephone: '',
          subjectIdsText: '',
          dayOfWeek: '',
          isWorkingDay: true,
          startTime: '08:00',
          endTime: '08:45',
          sequenceNumber: '1',
          isBreak: false,
        });
        break;
      }
      case 'teachers': {
        const teacher = item as Teacher;
        setDraft({
          id: teacher.id,
          name: `${teacher.firstName} ${teacher.lastName}`,
          yearLevel: '',
          section: '',
          description: '',
          code: '',
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          employeeId: teacher.employeeId,
          telephone: teacher.phone ?? '',
          subjectIdsText: teacher.subjectIds.join(', '),
          dayOfWeek: '',
          isWorkingDay: true,
          startTime: '08:00',
          endTime: '08:45',
          sequenceNumber: '1',
          isBreak: false,
        });
        break;
      }
      case 'days': {
        const day = item as Day;
        setDraft({
          id: day.id,
          name: day.name,
          yearLevel: '',
          section: '',
          description: day.description ?? '',
          code: '',
          firstName: '',
          lastName: '',
          email: '',
          employeeId: '',
          telephone: '',
          subjectIdsText: '',
          dayOfWeek: String(day.dayOfWeek),
          isWorkingDay: day.isWorkingDay,
          startTime: '08:00',
          endTime: '08:45',
          sequenceNumber: String(day.sequenceNumber),
          isBreak: false,
        });
        break;
      }
      case 'periods': {
        const period = item as Period;
        setDraft({
          id: period.id,
          name: period.name,
          yearLevel: '',
          section: '',
          description: period.description ?? '',
          code: '',
          firstName: '',
          lastName: '',
          email: '',
          employeeId: '',
          telephone: '',
          subjectIdsText: '',
          dayOfWeek: '',
          isWorkingDay: true,
          startTime: period.startTime,
          endTime: period.endTime,
          sequenceNumber: String(period.sequenceNumber),
          isBreak: period.isBreak,
        });
        break;
      }
      default:
        setDraft(createEmptyDraft());
    }

    setError(null);
    setIsEditorOpen(true);
  };

  const handleDelete = async (itemId: string) => {
    const nextItems = removeEntity(currentItems as Array<Section | Subject | Teacher | Day | Period>, itemId);
    await persistCatalog(activeTab, nextItems as Section[] | Subject[] | Teacher[] | Day[] | Period[]);
  };

  const handleSave = async () => {
    const now = new Date().toISOString();

    if (activeTab === 'sections' && (!draft.name.trim() || !draft.section.trim())) {
      setError('Please add a class name and section label.');
      return;
    }

    if (activeTab === 'subjects' && (!draft.name.trim() || !draft.code.trim())) {
      setError('Please add both the subject name and code.');
      return;
    }

    if (activeTab === 'teachers' && (!draft.firstName.trim() || !draft.lastName.trim() || !draft.email.trim())) {
      setError('Please complete the teacher name and email.');
      return;
    }

    if (activeTab === 'days' && (!draft.name.trim() || !draft.dayOfWeek.trim())) {
      setError('Please provide the day name and weekday number.');
      return;
    }

    if (activeTab === 'periods' && (!draft.name.trim() || !draft.startTime.trim() || !draft.endTime.trim())) {
      setError('Please provide the period name and time range.');
      return;
    }

    let nextItems: Section[] | Subject[] | Teacher[] | Day[] | Period[] = currentItems;

    if (activeTab === 'sections') {
      const payload: Section = {
        id: editingId ?? `section-${Date.now()}`,
        name: draft.name.trim(),
        yearLevel: toNumericInput(draft.yearLevel),
        section: draft.section.trim(),
        description: draft.description.trim() || undefined,
        isActive: true,
        createdAt: editingId ? currentItems.find((item) => item.id === editingId)?.createdAt ?? now : now,
        updatedAt: now,
        createdBy: 'local-user',
      };

      nextItems = editingId ? updateEntity(currentItems as Section[], editingId, payload) : addEntity(currentItems as Section[], payload);
    }

    if (activeTab === 'subjects') {
      const payload: Subject = {
        id: editingId ?? `subject-${Date.now()}`,
        name: draft.name.trim(),
        code: draft.code.trim().toUpperCase(),
        description: draft.description.trim() || undefined,
        credits: 3,
        isActive: true,
        createdAt: editingId ? currentItems.find((item) => item.id === editingId)?.createdAt ?? now : now,
        updatedAt: now,
        createdBy: 'local-user',
      };

      nextItems = editingId ? updateEntity(currentItems as Subject[], editingId, payload) : addEntity(currentItems as Subject[], payload);
    }

    if (activeTab === 'teachers') {
      const payload: Teacher = {
        id: editingId ?? `teacher-${Date.now()}`,
        firstName: draft.firstName.trim(),
        lastName: draft.lastName.trim(),
        email: draft.email.trim(),
        phone: draft.telephone.trim() || undefined,
        employeeId: draft.employeeId.trim() || `EMP-${Date.now()}`,
        department: 'General',
        qualifications: ['Qualified'],
        subjectIds: draft.subjectIdsText
          .split(',')
          .map((subject) => subject.trim())
          .filter(Boolean),
        maxPeriodsPerDay: 6,
        maxPeriodsPerWeek: 30,
        isActive: true,
        createdAt: editingId ? currentItems.find((item) => item.id === editingId)?.createdAt ?? now : now,
        updatedAt: now,
        createdBy: 'local-user',
      };

      nextItems = editingId ? updateEntity(currentItems as Teacher[], editingId, payload) : addEntity(currentItems as Teacher[], payload);
    }

    if (activeTab === 'days') {
      const payload: Day = {
        id: editingId ?? `day-${Date.now()}`,
        name: draft.name.trim(),
        dayOfWeek: Number(draft.dayOfWeek) || 1,
        isWorkingDay: draft.isWorkingDay,
        sequenceNumber: Number(draft.dayOfWeek) || 1,
        description: draft.description.trim() || undefined,
        createdAt: editingId ? currentItems.find((item) => item.id === editingId)?.createdAt ?? now : now,
        updatedAt: now,
        createdBy: 'local-user',
      };

      nextItems = editingId ? updateEntity(currentItems as Day[], editingId, payload) : addEntity(currentItems as Day[], payload);
    }

    if (activeTab === 'periods') {
      const payload: Period = {
        id: editingId ?? `period-${Date.now()}`,
        name: draft.name.trim(),
        startTime: draft.startTime.trim(),
        endTime: draft.endTime.trim(),
        durationMinutes: 45,
        sequenceNumber: Number(draft.sequenceNumber) || 1,
        isBreak: draft.isBreak,
        description: draft.description.trim() || undefined,
        createdAt: editingId ? currentItems.find((item) => item.id === editingId)?.createdAt ?? now : now,
        updatedAt: now,
        createdBy: 'local-user',
      };

      nextItems = editingId ? updateEntity(currentItems as Period[], editingId, payload) : addEntity(currentItems as Period[], payload);
    }

    await persistCatalog(activeTab, nextItems);
    setIsEditorOpen(false);
    setError(null);
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case 'sections':
        return (
          <View style={styles.formGrid}>
            <TextInput style={styles.input} placeholder="Class name" value={draft.name} onChangeText={(value) => setDraft((prev) => ({ ...prev, name: value }))} />
            <TextInput style={styles.input} placeholder="Year level" keyboardType="numeric" value={draft.yearLevel} onChangeText={(value) => setDraft((prev) => ({ ...prev, yearLevel: value }))} />
            <TextInput style={styles.input} placeholder="Section label" value={draft.section} onChangeText={(value) => setDraft((prev) => ({ ...prev, section: value }))} />
            <TextInput style={[styles.input, styles.textArea]} placeholder="Description" multiline value={draft.description} onChangeText={(value) => setDraft((prev) => ({ ...prev, description: value }))} />
          </View>
        );
      case 'subjects':
        return (
          <View style={styles.formGrid}>
            <TextInput style={styles.input} placeholder="Subject name" value={draft.name} onChangeText={(value) => setDraft((prev) => ({ ...prev, name: value }))} />
            <TextInput style={styles.input} placeholder="Code" value={draft.code} onChangeText={(value) => setDraft((prev) => ({ ...prev, code: value }))} />
            <TextInput style={[styles.input, styles.textArea]} placeholder="Description" multiline value={draft.description} onChangeText={(value) => setDraft((prev) => ({ ...prev, description: value }))} />
          </View>
        );
      case 'teachers':
        return (
          <View style={styles.formGrid}>
            <TextInput style={styles.input} placeholder="First name" value={draft.firstName} onChangeText={(value) => setDraft((prev) => ({ ...prev, firstName: value }))} />
            <TextInput style={styles.input} placeholder="Last name" value={draft.lastName} onChangeText={(value) => setDraft((prev) => ({ ...prev, lastName: value }))} />
            <TextInput style={styles.input} placeholder="Email" value={draft.email} onChangeText={(value) => setDraft((prev) => ({ ...prev, email: value }))} />
            <TextInput style={styles.input} placeholder="Employee ID" value={draft.employeeId} onChangeText={(value) => setDraft((prev) => ({ ...prev, employeeId: value }))} />
            <TextInput style={styles.input} placeholder="Phone" value={draft.telephone} onChangeText={(value) => setDraft((prev) => ({ ...prev, telephone: value }))} />
            <TextInput style={styles.input} placeholder="Subjects (comma separated)" value={draft.subjectIdsText} onChangeText={(value) => setDraft((prev) => ({ ...prev, subjectIdsText: value }))} />
          </View>
        );
      case 'days':
        return (
          <View style={styles.formGrid}>
            <TextInput style={styles.input} placeholder="Day name" value={draft.name} onChangeText={(value) => setDraft((prev) => ({ ...prev, name: value }))} />
            <TextInput style={styles.input} placeholder="Weekday number" keyboardType="numeric" value={draft.dayOfWeek} onChangeText={(value) => setDraft((prev) => ({ ...prev, dayOfWeek: value }))} />
            <TextInput style={[styles.input, styles.textArea]} placeholder="Description" multiline value={draft.description} onChangeText={(value) => setDraft((prev) => ({ ...prev, description: value }))} />
          </View>
        );
      case 'periods':
        return (
          <View style={styles.formGrid}>
            <TextInput style={styles.input} placeholder="Period name" value={draft.name} onChangeText={(value) => setDraft((prev) => ({ ...prev, name: value }))} />
            <TextInput style={styles.input} placeholder="Start time" value={draft.startTime} onChangeText={(value) => setDraft((prev) => ({ ...prev, startTime: value }))} />
            <TextInput style={styles.input} placeholder="End time" value={draft.endTime} onChangeText={(value) => setDraft((prev) => ({ ...prev, endTime: value }))} />
            <TextInput style={styles.input} placeholder="Sequence" keyboardType="numeric" value={draft.sequenceNumber} onChangeText={(value) => setDraft((prev) => ({ ...prev, sequenceNumber: value }))} />
            <TextInput style={[styles.input, styles.textArea]} placeholder="Description" multiline value={draft.description} onChangeText={(value) => setDraft((prev) => ({ ...prev, description: value }))} />
          </View>
        );
      default:
        return null;
    }
  };

  const renderItemSummary = (item: Section | Subject | Teacher | Day | Period) => {
    if ('yearLevel' in item && 'section' in item) {
      return `${item.name} • ${item.section ?? ''} • Year ${item.yearLevel ?? ''}`;
    }

    if ('code' in item) {
      return `${item.name} • ${item.code ?? ''}`;
    }

    if ('firstName' in item && 'lastName' in item) {
      return `${item.firstName} ${item.lastName} • ${item.email ?? ''}`;
    }

    if ('dayOfWeek' in item) {
      return `${item.name} • Weekday ${item.dayOfWeek ?? ''}`;
    }

    if ('startTime' in item && 'endTime' in item) {
      return `${item.name} • ${item.startTime ?? ''} - ${item.endTime ?? ''}`;
    }

    return '';
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>
        Master Data
      </Text>

      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            mode={tab.key === activeTab ? 'contained' : 'outlined'}
            onPress={() => setActiveTab(tab.key)}
            compact
          >
            {tab.label}
          </Button>
        ))}
      </View>

      <Button mode="contained" onPress={openCreateForm} style={styles.primaryButton}>
        Add {tabs.find((tab) => tab.key === activeTab)?.label ?? 'Item'}
      </Button>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {currentItems.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Text variant="titleMedium">No records yet</Text>
              <Text variant="bodyMedium" style={styles.metaText}>
                Add your first item to start building the timetable.
              </Text>
            </Card.Content>
          </Card>
        ) : null}

        {currentItems.map((item) => {
          const itemName = 'name' in item ? String(item.name ?? '') : '';

          return (
            <Card key={item.id} style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium">{itemName}</Text>
                <Text variant="bodyMedium" style={styles.metaText}>
                  {renderItemSummary(item)}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => openEditForm(item.id)}>Edit</Button>
                <Button textColor="#d32f2f" onPress={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </Card.Actions>
            </Card>
          );
        })}
      </ScrollView>

      <Portal>
        <Dialog visible={isEditorOpen} onDismiss={() => setIsEditorOpen(false)}>
          <Dialog.Title>{editingId ? 'Edit Record' : 'Add Record'}</Dialog.Title>
          <Dialog.Content>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {renderFormFields()}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsEditorOpen(false)}>Cancel</Button>
            <Button onPress={handleSave}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    marginBottom: 12,
    fontWeight: '700',
  },
  tabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  primaryButton: {
    marginBottom: 16,
  },
  listContainer: {
    gap: 12,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 12,
  },
  emptyCard: {
    borderRadius: 12,
  },
  metaText: {
    color: '#666',
    marginTop: 6,
  },
  formGrid: {
    gap: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textArea: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 12,
  },
});
