import { useAppStore } from './index';

describe('routine store', () => {
  it('creates, updates, and deletes routines', () => {
    useAppStore.getState().loadInitialData({
      sections: [],
      subjects: [],
      teachers: [],
      days: [],
      periods: [],
      routines: [],
    });

    const created = useAppStore.getState().createRoutine({
      id: 'routine-123',
      sectionId: 'section-1',
      name: 'Class 10A Routine',
      description: 'Weekly timetable',
      academicYear: '2026-2027',
      version: 1,
      assignments: [],
      status: 'DRAFT',
      isActive: true,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
      createdBy: 'tester',
      totalPeriods: 0,
      subjectsCount: 0,
      teachersCount: 0,
    });

    expect(created.name).toBe('Class 10A Routine');
    expect(useAppStore.getState().routines).toHaveLength(1);

    const updated = useAppStore.getState().updateRoutine(created.id, {
      name: 'Class 10A Routine Updated',
      academicYear: '2027-2028',
    });

    expect(updated?.name).toBe('Class 10A Routine Updated');
    expect(updated?.academicYear).toBe('2027-2028');

    useAppStore.getState().deleteRoutine(created.id);
    expect(useAppStore.getState().routines).toHaveLength(0);
  });
});
