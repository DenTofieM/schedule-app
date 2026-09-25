// Core type definitions for the Schedule App

export type Role = 'ADMIN' | 'VIEWER';
export type RoutineStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type ConflictType = 'TEACHER_DOUBLE_BOOKING' | 'INVALID_SUBJECT_TEACHER' | 'PERIOD_OVERLAP';
export type ConflictSeverity = 'WARNING' | 'ERROR';

// ============ SECTION ============
export interface Section {
  id: string;
  name: string;
  yearLevel: number;
  section: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ============ SUBJECT ============
export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  credits?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ============ TEACHER ============
export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  employeeId: string;
  department?: string;
  qualifications: string[];
  subjectIds: string[];
  maxPeriodsPerDay: number;
  maxPeriodsPerWeek: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ============ DAY ============
export interface Day {
  id: string;
  name: string;
  dayOfWeek: number;
  isWorkingDay: boolean;
  sequenceNumber: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ============ PERIOD ============
export interface Period {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  sequenceNumber: number;
  isBreak: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ============ ASSIGNMENT ============
export interface Assignment {
  id: string;
  routineId: string;
  subjectId: string;
  teacherId: string;
  dayId: string;
  periodId: string;
  assignmentOrder: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ============ ROUTINE ============
export interface Routine {
  id: string;
  sectionId: string;
  name: string;
  description?: string;
  academicYear: string;
  version: number;
  assignments: Assignment[];
  status: RoutineStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  createdBy: string;
  publishedBy?: string;
  totalPeriods: number;
  subjectsCount: number;
  teachersCount: number;
}

// ============ CONFLICT LOG ============
export interface ConflictLog {
  id: string;
  routineId: string;
  conflictType: ConflictType;
  severity: ConflictSeverity;
  description: string;
  affectedTeacherId?: string;
  affectedAssignmentIds: string[];
  isResolved: boolean;
  resolution?: string;
  createdAt: string;
}

// ============ USER ============
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: Role;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  passwordChangedAt?: string;
  passwordExpiresAt?: string;
  accountLockedUntil?: string;
  failedLoginAttempts: number;
}

// ============ SCHOOL CONFIG ============
export interface SchoolConfig {
  id: string;
  schoolName: string;
  schoolCode: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  workingDays: string[];
  totalPeriods: number;
  periodDuration: number;
  breakPeriodIds: string[];
  allowTeacherDoubleBooking: boolean;
  maxTeacherPeriodsPerDay: number;
  maxTeacherPeriodsPerWeek: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ============ DATA TRANSFER OBJECTS (DTOs) ============

export interface RoutineDTO {
  id: string;
  sectionId: string;
  sectionName: string;
  name: string;
  description?: string;
  academicYear: string;
  status: RoutineStatus;
  version: number;
  grid: AssignmentCell[][];
  stats: {
    totalPeriods: number;
    subjectsCount: number;
    teachersCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentCell {
  assignmentId: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  dayId: string;
  periodId: string;
  notes?: string;
}

export interface TeacherScheduleDTO {
  teacherId: string;
  teacherName: string;
  email: string;
  schedules: {
    dayName: string;
    periodName: string;
    subjectName: string;
    sectionName: string;
  }[];
}

// ============ REQUEST/RESPONSE TYPES ============

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  error?: string;
  timestamp: string;
}

// ============ FORM SUBMISSION TYPES ============

export interface CreateSectionInput {
  name: string;
  yearLevel: number;
  section: string;
  description?: string;
}

export interface CreateSubjectInput {
  name: string;
  code: string;
  description?: string;
  credits?: number;
}

export interface CreateTeacherInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  employeeId: string;
  department?: string;
  qualifications: string[];
  subjectIds: string[];
}

export interface CreateRoutineInput {
  sectionId: string;
  name: string;
  description?: string;
  academicYear: string;
}

export interface AddAssignmentInput {
  routineId: string;
  subjectId: string;
  teacherId: string;
  dayId: string;
  periodId: string;
  notes?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'passwordHash'>;
  token: string;
  expiresIn: number;
}

// ============ STATE MANAGEMENT TYPES ============

export interface AppState {
  sections: Section[];
  subjects: Subject[];
  teachers: Teacher[];
  days: Day[];
  periods: Period[];
  routines: Routine[];
  schoolConfig: SchoolConfig | null;
  currentUser: Omit<User, 'passwordHash'> | null;
  isLoading: boolean;
  error: string | null;
}

export interface RoutineBuilderState {
  currentRoutineId: string | null;
  assignments: Map<string, Assignment>;
  conflicts: ConflictLog[];
  selectedDay?: string;
  selectedPeriod?: string;
  isDragging: boolean;
  unsavedChanges: boolean;
}
