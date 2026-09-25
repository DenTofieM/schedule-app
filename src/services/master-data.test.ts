import { addEntity, buildDefaultMasterData, removeEntity, updateEntity } from './master-data';

describe('master data helpers', () => {
  it('provides default catalog data with working day and period entries', () => {
    const data = buildDefaultMasterData();

    expect(data.sections.length).toBeGreaterThan(0);
    expect(data.subjects.length).toBeGreaterThan(0);
    expect(data.teachers.length).toBeGreaterThan(0);
    expect(data.days.some((day) => day.name === 'Monday')).toBe(true);
    expect(data.periods.some((period) => period.name === 'Period 1')).toBe(true);
  });

  it('adds, updates, and removes items from a collection', () => {
    const initial = buildDefaultMasterData().sections;
    const created = addEntity(initial, {
      id: 'section-new',
      name: 'Class D',
      yearLevel: 11,
      section: 'D',
      description: 'Grade 11 section D',
      isActive: true,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
      createdBy: 'test',
    });

    expect(created).toHaveLength(initial.length + 1);

    const updated = updateEntity(created, 'section-new', {
      name: 'Class D Updated',
      updatedAt: '2026-01-02T00:00:00.000Z',
    });
    expect(updated.find((item) => item.id === 'section-new')?.name).toBe('Class D Updated');

    const removed = removeEntity(updated, 'section-new');
    expect(removed.some((item) => item.id === 'section-new')).toBe(false);
  });
});
