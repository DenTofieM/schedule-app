import { create } from 'zustand';

import type { Assignment, Day, Period, Routine, Section, Subject, Teacher, User } from '@/types';

interface AppState {
  currentUser: User | null;
  sections: Section[];
  teachers: Teacher[];
  subjects: Subject[];
  days: Day[];
  periods: Period[];
  routines: Routine[];
  setCurrentUser: (user: User | null) => void;
  setSections: (sections: Section[]) => void;
  setTeachers: (teachers: Teacher[]) => void;
  setSubjects: (subjects: Subject[]) => void;
  setDays: (days: Day[]) => void;
  setPeriods: (periods: Period[]) => void;
  setRoutines: (routines: Routine[]) => void;
  createRoutine: (routine: Routine) => Routine;
  updateRoutine: (id: string, updates: Partial<Routine>) => Routine | undefined;
  deleteRoutine: (id: string) => void;
  loadInitialData: (data?: Partial<AppState>) => void;
}

const defaultState: Omit<
  AppState,
  'setCurrentUser' | 'setSections' | 'setTeachers' | 'setSubjects' | 'setDays' | 'setPeriods' | 'setRoutines' | 'createRoutine' | 'updateRoutine' | 'deleteRoutine' | 'loadInitialData'
> = {
  currentUser: null,
  sections: [],
  teachers: [],
  subjects: [],
  days: [],
  periods: [],
  routines: [],
};

export const useAppStore = create<AppState>((set) => ({
  ...defaultState,
  setCurrentUser: (user) => set({ currentUser: user }),
  setSections: (sections) => set({ sections }),
  setTeachers: (teachers) => set({ teachers }),
  setSubjects: (subjects) => set({ subjects }),
  setDays: (days) => set({ days }),
  setPeriods: (periods) => set({ periods }),
  setRoutines: (routines) => set({ routines }),
  createRoutine: (routine) => {
    set((state) => ({ routines: [...state.routines, routine] }));
    return routine;
  },
  updateRoutine: (id, updates) => {
    let nextRoutine: Routine | undefined;

    set((state) => {
      const routines = state.routines.map((routine) => {
        if (routine.id !== id) return routine;

        nextRoutine = {
          ...routine,
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        return nextRoutine;
      });

      return { routines };
    });

    return nextRoutine;
  },
  deleteRoutine: (id) =>
    set((state) => ({
      routines: state.routines.filter((routine) => routine.id !== id),
    })),
  loadInitialData: (data = {}) => set({ ...defaultState, ...data }),
}));

interface RoutineBuilderState {
  currentRoutineId: string | null;
  assignments: Map<string, Assignment>;
  conflicts: ConflictIssue[];
  unsavedChanges: boolean;
  setCurrentRoutineId: (id: string | null) => void;
  addAssignment: (assignment: Assignment) => void;
  clearConflicts: () => void;
  addConflict: (conflict: ConflictIssue) => void;
  reset: () => void;
}

export interface ConflictIssue {
  id: string;
  type: 'TEACHER_DOUBLE_BOOKING' | 'INVALID_SUBJECT_TEACHER' | 'PERIOD_OVERLAP';
  severity: 'WARNING' | 'ERROR';
  description: string;
  affectedTeacherId?: string;
  affectedAssignmentIds: string[];
}

export const useRoutineBuilderStore = create<RoutineBuilderState>((set) => ({
  currentRoutineId: null,
  assignments: new Map(),
  conflicts: [],
  unsavedChanges: false,
  setCurrentRoutineId: (id) =>
    set({
      currentRoutineId: id,
      assignments: new Map(),
      conflicts: [],
      unsavedChanges: false,
    }),
  addAssignment: (assignment) =>
    set((state) => {
      const nextAssignments = new Map(state.assignments);
      nextAssignments.set(assignment.id, assignment);
      return { assignments: nextAssignments, unsavedChanges: true };
    }),
  clearConflicts: () => set({ conflicts: [] }),
  addConflict: (conflict) =>
    set((state) => ({
      conflicts: [...state.conflicts, conflict],
      unsavedChanges: true,
    })),
  reset: () =>
    set({
      currentRoutineId: null,
      assignments: new Map(),
      conflicts: [],
      unsavedChanges: false,
    }),
}));
