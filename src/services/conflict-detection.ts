import type { Assignment, Subject, Teacher } from '@/types';

export type ConflictIssueType = 'TEACHER_DOUBLE_BOOKING' | 'INVALID_SUBJECT_TEACHER' | 'PERIOD_OVERLAP';
export type ConflictIssueSeverity = 'WARNING' | 'ERROR';

export interface ConflictIssue {
  id: string;
  type: ConflictIssueType;
  severity: ConflictIssueSeverity;
  description: string;
  affectedTeacherId?: string;
  affectedAssignmentIds: string[];
}

export const conflictDetectionService = {
  checkRoutineConflicts(assignments: Assignment[], teachers: Teacher[], subjects: Subject[]) {
    const teacherMap = new Map(teachers.map((teacher) => [teacher.id, teacher]));
    const subjectMap = new Map(subjects.map((subject) => [subject.id, subject]));
    const issues: ConflictIssue[] = [];
    const seen = new Set<string>();

    assignments.forEach((assignment) => {
      const teacher = teacherMap.get(assignment.teacherId);
      const subject = subjectMap.get(assignment.subjectId);

      if (!teacher || !subject) {
        return;
      }

      if (!teacher.subjectIds.includes(subject.id)) {
        const key = `${assignment.id}:invalid-subject`;
        if (!seen.has(key)) {
          seen.add(key);
          issues.push({
            id: key,
            type: 'INVALID_SUBJECT_TEACHER',
            severity: 'ERROR',
            description: `${teacher.firstName} ${teacher.lastName} is not assigned to ${subject.name}.`,
            affectedTeacherId: teacher.id,
            affectedAssignmentIds: [assignment.id],
          });
        }
      }

      const teacherConflicts = assignments.filter(
        (candidate) =>
          candidate.teacherId === assignment.teacherId &&
          candidate.dayId === assignment.dayId &&
          candidate.periodId === assignment.periodId &&
          candidate.id !== assignment.id
      );

      if (teacherConflicts.length > 0) {
        const key = `${assignment.teacherId}:${assignment.dayId}:${assignment.periodId}:teacher-double-booking`;
        if (!seen.has(key)) {
          seen.add(key);
          issues.push({
            id: key,
            type: 'TEACHER_DOUBLE_BOOKING',
            severity: 'ERROR',
            description: `${teacher.firstName} ${teacher.lastName} is already assigned to another class in this period.`,
            affectedTeacherId: teacher.id,
            affectedAssignmentIds: [assignment.id, ...teacherConflicts.map((item) => item.id)],
          });
        }
      }
    });

    return issues;
  },

  getConflictSummary(conflicts: ConflictIssue[]) {
    const errors = conflicts.filter((conflict) => conflict.severity === 'ERROR').length;
    const warnings = conflicts.filter((conflict) => conflict.severity === 'WARNING').length;

    return {
      totalConflicts: conflicts.length,
      errors,
      warnings,
      canPublish: errors === 0,
    };
  },
};
