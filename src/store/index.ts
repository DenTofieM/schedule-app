import { create } from 'zustand';

import type { Assignment, Routine, Section, Subject, Teacher, User } from '@/types';

interface AppState {
  currentUser: User | null;
  sections: Section[];
  teachers: Teacher[];
  subjects: Subject[];
  routines: Routine[];
  setCurrentUser: (user: User | null) => void;
  loadInitialData: (data?: Partial<AppState>) => void;
}

const defaultState: Omit<AppState, 'setCurrentUser' | 'loadInitialData'> = {
  currentUser: null,
  sections: [],
  teachers: [],
  subjects: [],
  routines: [],
};

export const useAppStore = create<AppState>((set) => ({
  ...defaultState,
  setCurrentUser: (user) => set({ currentUser: user }),
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
