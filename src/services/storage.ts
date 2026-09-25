import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Routine } from '@/types';

import { buildDefaultMasterData } from './master-data';

const STORAGE_KEY = 'schedule-app:data';

const defaultRoutines: Routine[] = [
  {
    id: 'routine-1',
    sectionId: 'section-1',
    name: 'Class A Weekly Plan',
    academicYear: '2026-2027',
    version: 1,
    assignments: [],
    status: 'DRAFT',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'system',
    totalPeriods: 0,
    subjectsCount: 2,
    teachersCount: 2,
  },
];

export const defaultAppData = {
  ...buildDefaultMasterData(),
  routines: defaultRoutines,
};

export const storageService = {
  async getAllData() {
    const storedValue = await AsyncStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return defaultAppData;
    }

    try {
      const parsed = JSON.parse(storedValue) as Partial<typeof defaultAppData>;
      return {
        sections: parsed.sections ?? defaultAppData.sections,
        subjects: parsed.subjects ?? defaultAppData.subjects,
        teachers: parsed.teachers ?? defaultAppData.teachers,
        days: parsed.days ?? defaultAppData.days,
        periods: parsed.periods ?? defaultAppData.periods,
        routines: parsed.routines ?? defaultAppData.routines,
      };
    } catch {
      return defaultAppData;
    }
  },

  async saveAllData(data: Partial<typeof defaultAppData>) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
};
