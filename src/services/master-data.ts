import type { Day, Period, Section, Subject, Teacher } from '@/types';

export interface MasterDataSet {
  sections: Section[];
  subjects: Subject[];
  teachers: Teacher[];
  days: Day[];
  periods: Period[];
}

const makeTimestamp = (offset = 0) => new Date(Date.now() + offset).toISOString();

export function buildDefaultMasterData(): MasterDataSet {
  const now = makeTimestamp();

  const sections: Section[] = [
    {
        id: 'sec-001',
        name: 'Class 10(G)',
        yearLevel: 10,
        section: 'A',
        description: 'Science Stream',
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'sec-002',
        name: 'Class 10(B)',
        yearLevel: 10,
        section: 'B',
        description: 'Commerce Stream',
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'sec-003',
        name: 'Class 9(G)',
        yearLevel: 9,
        section: 'A',
        description: 'Science Stream',
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'sec-004',
        name: 'Class 9(B)',
        yearLevel: 9,
        section: 'B',
        description: 'Commerce Stream',
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'sec-005',
        name: 'Class 8(G)',
        yearLevel: 8,
        section: 'A',
        description: 'Science Stream',
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'sec-006',
        name: 'Class 8(B)',
        yearLevel: 8,
        section: 'B',
        description: 'Commerce Stream',
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'sec-007',
        name: 'Class 7(G)',
        yearLevel: 7,
        section: 'A',
        description: 'Science Stream',
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'sec-008',
        name: 'Class 7(B)',
        yearLevel: 7,
        section: 'B',
        description: 'Commerce Stream',
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'sec-009',
        name: 'Class 6(G)',
        yearLevel: 6,
        section: 'A',
        description: 'Science Stream',
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'sec-010',
        name: 'Class 6(B)',
        yearLevel: 6,
        section: 'B',
        description: 'Commerce Stream',
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    ];

  const subjects: Subject[] = [
    {
        id: 'subj-001',
        name: 'Bangla 1st Paper',
        code: '101',
        description: 'Bangla 1st Paper',
        credits: 4,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-002',
        name: 'Bangla 2nd Paper',
        code: '102',
        description: 'Bangla 2nd Paper',
        credits: 4,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-003',
        name: 'English 1st Paper',
        code: '107',
        description: 'English 1st Paper',
        credits: 4,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-004',
        name: 'English 2nd Paper',
        code: '108',
        description: 'English Literature',
        credits: 3,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-005',
        name: 'Mathematics',
        code: '109',
        description: 'Mathematics',
        credits: 4,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-006',
        name: 'Physics',
        code: '136',
        description: 'Physics',
        credits: 4,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-007',
        name: 'Chemistry',
        code: '137',
        description: 'Chemistry',
        credits: 4,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-008',
        name: 'Biology',
        code: '138',
        description: 'Biology',
        credits: 4,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-009',
        name: 'Civics & Citizenship',
        code: '140',
        description: 'Civics & Citizenship',
        credits: 3,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-010',
        name: 'Economics',
        code: '141',
        description: 'Economics',
        credits: 3,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-011',
        name: 'Bangladesh & Global Studies',
        code: '150',
        description: 'Bangladesh & Global Studies',
        credits: 3,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-012',
        name: 'Information & Communication Technology',
        code: '154',
        description: 'Information & Communication Technology',
        credits: 3,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-013',
        name: 'Physical Education & Sports',
        code: '133',
        description: 'Physical Education & Sports',
        credits: 2,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
    {
        id: 'subj-014',
        name: 'Agriculture Studies',
        code: '134',
        description: 'Agriculture Studies',
        credits: 3,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
    },
  ];

  const teachers: Teacher[] = [
    {
      id: 'teacher-1',
      firstName: 'Aarti',
      lastName: 'Sharma',
      email: 'aarti.sharma@example.com',
      phone: '+91 98765 43210',
      employeeId: 'EMP-1001',
      department: 'Mathematics',
      qualifications: ['B.Sc.', 'M.Sc.'],
      subjectIds: ['subject-1', 'subject-2'],
      maxPeriodsPerDay: 6,
      maxPeriodsPerWeek: 30,
      isActive: true,
      createdAt: now,
      updatedAt: now,
      createdBy: 'system',
    },
    {
      id: 'teacher-2',
      firstName: 'Rahul',
      lastName: 'Patel',
      email: 'rahul.patel@example.com',
      phone: '+91 98980 11223',
      employeeId: 'EMP-1002',
      department: 'Science',
      qualifications: ['B.A.', 'B.Ed.'],
      subjectIds: ['subject-2', 'subject-3'],
      maxPeriodsPerDay: 5,
      maxPeriodsPerWeek: 24,
      isActive: true,
      createdAt: now,
      updatedAt: now,
      createdBy: 'system',
    },
  ];

  const days: Day[] = [
    { id: 'day-1', name: 'Sunday', dayOfWeek: 0, isWorkingDay: true, sequenceNumber: 1, description: 'Start of the week', createdAt: now, updatedAt: now, createdBy: 'system' },
    { id: 'day-2', name: 'Monday', dayOfWeek: 1, isWorkingDay: true, sequenceNumber: 2, description: 'Start of the week', createdAt: now, updatedAt: now, createdBy: 'system' },
    { id: 'day-3', name: 'Tuesday', dayOfWeek: 2, isWorkingDay: true, sequenceNumber: 3, description: 'Second day', createdAt: now, updatedAt: now, createdBy: 'system' },
    { id: 'day-4', name: 'Wednesday', dayOfWeek: 3, isWorkingDay: true, sequenceNumber: 4, description: 'Mid-week', createdAt: now, updatedAt: now, createdBy: 'system' },
    { id: 'day-5', name: 'Thursday', dayOfWeek: 4, isWorkingDay: true, sequenceNumber: 5, description: 'Academic day', createdAt: now, updatedAt: now, createdBy: 'system' },
    { id: 'day-6', name: 'Friday', dayOfWeek: 5, isWorkingDay: true, sequenceNumber: 6, description: 'Friday classes', createdAt: now, updatedAt: now, createdBy: 'system' },
    { id: 'day-7', name: 'Saturday', dayOfWeek: 6, isWorkingDay: true, sequenceNumber: 7, description: 'Saturday classes', createdAt: now, updatedAt: now, createdBy: 'system' },
  ];

  const periods: Period[] = [
    { id: 'period-1', name: 'Period 1', startTime: '08:00', endTime: '08:45', durationMinutes: 45, sequenceNumber: 1, isBreak: false, description: 'First lesson', createdAt: now, updatedAt: now, createdBy: 'system' },
    { id: 'period-2', name: 'Period 2', startTime: '08:45', endTime: '09:30', durationMinutes: 45, sequenceNumber: 2, isBreak: false, description: 'Second lesson', createdAt: now, updatedAt: now, createdBy: 'system' },
    { id: 'period-3', name: 'Period 3', startTime: '09:45', endTime: '10:30', durationMinutes: 45, sequenceNumber: 3, isBreak: false, description: 'Third lesson', createdAt: now, updatedAt: now, createdBy: 'system' },
    { id: 'period-4', name: 'Period 4', startTime: '10:30', endTime: '11:15', durationMinutes: 45, sequenceNumber: 4, isBreak: false, description: 'Fourth lesson', createdAt: now, updatedAt: now, createdBy: 'system' },
  ];

  return { sections, subjects, teachers, days, periods };
}

export function addEntity<T extends { id: string }>(items: T[], item: T): T[] {
  return [...items, item];
}

export function updateEntity<T extends { id: string }>(items: T[], id: string, updates: Partial<T>): T[] {
  return items.map((item) => {
    if (item.id !== id) {
      return item;
    }

    return {
      ...item,
      ...updates,
      updatedAt: new Date().toISOString(),
    } as T;
  });
}

export function removeEntity<T extends { id: string }>(items: T[], id: string): T[] {
  return items.filter((item) => item.id !== id);
}
