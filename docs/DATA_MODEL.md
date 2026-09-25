# Schedule App - Data Model & Entity Design

## Entity Relationship Diagram

```
Teacher ──┐
          ├─→ Assignment
Subject ──┤
          ├─→ Routine
Section ──┤
          ├─→ Routine
Day ──────┤
          ├─→ Period
Period ───┘

User (Admin) ──→ School Config
```

## Core Entities

### 1. Section (Class/Grade)
Represents a class or group of students.

```
id: UUID (primary key)
name: string (required, unique) - e.g., "Class 10-A"
yearLevel: number - e.g., 10
section: string - e.g., "A", "B", "C"
description: string (optional)
isActive: boolean (default: true)
createdAt: timestamp
updatedAt: timestamp
createdBy: UUID (foreign key to User)
```

### 2. Subject
Academic subjects taught in the school.

```
id: UUID (primary key)
name: string (required, unique) - e.g., "Mathematics"
code: string (required, unique) - e.g., "MATH101"
description: string (optional)
credits: number (optional) - academic credits
isActive: boolean (default: true)
createdAt: timestamp
updatedAt: timestamp
createdBy: UUID (foreign key to User)
```

### 3. Teacher
Teacher information and qualifications.

```
id: UUID (primary key)
firstName: string (required)
lastName: string (required)
email: string (required, unique)
phone: string (optional)
employeeId: string (unique, required)
department: string (optional)
qualifications: string[] (array of qualifications)
subjectIds: UUID[] (array of Subject IDs - subjects they can teach)
maxPeriodsPerDay: number (default: 6)
maxPeriodsPerWeek: number (default: 30)
isActive: boolean (default: true)
createdAt: timestamp
updatedAt: timestamp
createdBy: UUID (foreign key to User)
```

### 4. Day
Days of the week when classes are held.

```
id: UUID (primary key)
name: string (required) - e.g., "Monday"
dayOfWeek: number (0-6, Monday=0, Sunday=6)
isWorkingDay: boolean (required, default: true)
sequenceNumber: number - order in the week (1-7)
description: string (optional)
createdAt: timestamp
updatedAt: timestamp
createdBy: UUID (foreign key to User)
```

### 5. Period
Time slots in a day.

```
id: UUID (primary key)
name: string (required) - e.g., "Period 1"
startTime: string (required, format: HH:mm) - e.g., "08:00"
endTime: string (required, format: HH:mm) - e.g., "08:45"
durationMinutes: number (calculated: endTime - startTime)
sequenceNumber: number (required) - order in the day (1, 2, 3...)
isBreak: boolean (default: false) - if this is a break/lunch period
description: string (optional)
createdAt: timestamp
updatedAt: timestamp
createdBy: UUID (foreign key to User)
```

### 6. Assignment
A specific subject-teacher allocation to a period/day in a routine.

```
id: UUID (primary key)
routineId: UUID (foreign key to Routine)
subjectId: UUID (foreign key to Subject)
teacherId: UUID (foreign key to Teacher)
dayId: UUID (foreign key to Day)
periodId: UUID (foreign key to Period)
assignmentOrder: number - for manual prioritization
notes: string (optional)
createdAt: timestamp
updatedAt: timestamp
```

### 7. Routine
The master timetable for a section.

```
id: UUID (primary key)
sectionId: UUID (foreign key to Section, required)
name: string (required) - e.g., "Class 10-A Routine 2024"
description: string (optional)
academicYear: string - e.g., "2024-2025"
version: number (default: 1)
assignments: Assignment[] (array of assignments)
status: enum [DRAFT, PUBLISHED, ARCHIVED]
isActive: boolean (default: true)

// Metadata
createdAt: timestamp
updatedAt: timestamp
publishedAt: timestamp (nullable)
createdBy: UUID (foreign key to User)
publishedBy: UUID (foreign key to User, nullable)

// Statistics
totalPeriods: number (calculated)
subjectsCount: number (calculated)
teachersCount: number (calculated)
```

### 8. ConflictLog
Tracks detected conflicts during routine building.

```
id: UUID (primary key)
routineId: UUID (foreign key to Routine)
conflictType: enum [TEACHER_DOUBLE_BOOKING, INVALID_SUBJECT_TEACHER, PERIOD_OVERLAP]
severity: enum [WARNING, ERROR]
description: string
affectedTeacherId: UUID (optional, foreign key to Teacher)
affectedAssignmentIds: UUID[] (affected assignment IDs)
isResolved: boolean (default: false)
resolution: string (optional - how it was resolved)
createdAt: timestamp
```

### 9. User (Admin/Viewer)
Users who can access the system.

```
id: UUID (primary key)
email: string (required, unique)
passwordHash: string (required)
firstName: string (required)
lastName: string (required)
role: enum [ADMIN, VIEWER]
isActive: boolean (default: true)
lastLogin: timestamp (nullable)
createdAt: timestamp
updatedAt: timestamp
createdBy: UUID (nullable, foreign key to User)

// Audit trail
passwordChangedAt: timestamp
passwordExpiresAt: timestamp (nullable)
accountLockedUntil: timestamp (nullable, for brute force protection)
failedLoginAttempts: number (default: 0)
```

### 10. SchoolConfig
Global configuration and settings.

```
id: UUID (primary key)
schoolName: string (required)
schoolCode: string (unique)
address: string
phone: string
email: string
website: string (optional)
logo: string (URL or base64)

// Timetable settings
workingDays: string[] - e.g., ["Monday", "Tuesday", ..., "Saturday"]
totalPeriods: number (default: 6)
periodDuration: number (default: 45 - in minutes)
breakPeriodIds: UUID[] (periods that are breaks)

// Rules
allowTeacherDoubleBooking: boolean (default: false)
maxTeacherPeriodsPerDay: number (default: 6)
maxTeacherPeriodsPerWeek: number (default: 30)

createdAt: timestamp
updatedAt: timestamp
createdBy: UUID (foreign key to User)
```

## Relationships

### One-to-Many
- User → Assignment (User creates many assignments)
- User → Routine (User creates many routines)
- Section → Routine (A section has many routines over time)
- Subject → Assignment (Subject appears in many assignments)
- Teacher → Assignment (Teacher has many assignments)
- Day → Period (A day has many periods) [Actually, Periods are global across all days]
- Routine → Assignment (A routine has many assignments)
- Routine → ConflictLog (A routine can have many conflicts)

### Many-to-Many
- Teacher ←→ Subject (Teacher can teach multiple subjects, Subject taught by multiple teachers)
  - Managed through Teacher.subjectIds array

## Indexes (for database optimization)

1. Section: name, isActive
2. Subject: name, code, isActive
3. Teacher: email, employeeId, isActive
4. Day: dayOfWeek
5. Period: sequenceNumber
6. Assignment: routineId, teacherId, dayId, periodId
7. Routine: sectionId, status, isActive
8. User: email, isActive
9. ConflictLog: routineId, isResolved

## Validation Rules

### Section
- name: required, 1-100 chars, unique
- yearLevel: 0-12
- section: single character A-Z

### Subject
- name: required, 1-100 chars, unique
- code: required, 3-20 chars, unique

### Teacher
- firstName, lastName: required, 1-50 chars
- email: valid email format, unique
- subjectIds: must reference existing subjects

### Day
- dayOfWeek: 0-6
- sequenceNumber: 1-7, unique within week

### Period
- startTime, endTime: valid HH:mm format
- endTime > startTime
- sequenceNumber: positive integer, unique per day

### Routine
- sectionId: must reference existing section
- assignments: valid before publishing

### User
- email: valid format, unique
- password: min 8 chars, requires uppercase, lowercase, number, special char
- role: ADMIN or VIEWER

## Data Integrity Constraints

1. **Foreign Key Constraints**: All references must point to existing records
2. **Unique Constraints**: Email, code fields must be unique
3. **Check Constraints**: Time values must be valid, sequences must be positive
4. **Cascade Delete**: Deleting a routine deletes all its assignments
5. **Soft Deletes**: Mark records as inactive instead of hard delete for audit trail

## API Response Entities

### RoutineDTO (Data Transfer Object)
Used when sending routine data to frontend:

```
{
  id,
  sectionId,
  sectionName,
  name,
  description,
  academicYear,
  status,
  version,
  grid: [
    [
      {
        assignmentId,
        subjectId,
        subjectName,
        teacherId,
        teacherName,
        dayId,
        periodId,
        notes
      }
    ]
  ],
  stats: {
    totalPeriods,
    subjectsCount,
    teachersCount
  },
  createdAt,
  updatedAt
}
```

This model provides flexibility for future enhancements while maintaining data integrity and supporting all required features.
