import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Routine, Section, Subject, Teacher } from '@/types';

const STORAGE_KEY = 'schedule-app:data';

const defaultSections: Section[] = [
  {
    id: 'section-1',
    name: 'Class A',
    yearLevel: 10,
    section: 'A',
    description: 'Grade 10 section A',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'system',
  },
  {
    id: 'section-2',
    name: 'Class B',
    yearLevel: 10,
    section: 'B',
    description: 'Grade 10 section B',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'system',
  },
];

const defaultSubjects: Subject[] = [
  {
    id: 'subject-1',
    name: 'Mathematics',
    code: 'MATH',
    description: 'Core mathematics',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'system',
  },
  {
    id: 'subject-2',
    name: 'Science',
    code: 'SCI',
    description: 'General science',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'system',
  },
];

const defaultTeachers: Teacher[] = [
  {
    id: 'teacher-1',
    firstName: 'Aarti',
    lastName: 'Sharma',
    email: 'aarti.sharma@example.com',
    employeeId: 'EMP-1001',
    qualifications: ['B.Sc.', 'M.Sc.'],
    subjectIds: ['subject-1', 'subject-2'],
    maxPeriodsPerDay: 6,
    maxPeriodsPerWeek: 30,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'system',
  },
  {
    id: 'teacher-2',
    firstName: 'Rahul',
    lastName: 'Patel',
    email: 'rahul.patel@example.com',
    employeeId: 'EMP-1002',
    qualifications: ['B.A.', 'B.Ed.'],
    subjectIds: ['subject-2'],
    maxPeriodsPerDay: 5,
    maxPeriodsPerWeek: 24,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'system',
  },
];

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
  sections: defaultSections,
  subjects: defaultSubjects,
  teachers: defaultTeachers,
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
