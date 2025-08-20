import { ChapterType } from 'types/Chapter';
import { UnitType } from 'types/Unit';
import { SQLiteDatabase } from 'expo-sqlite';

export const createUnit = async (db: SQLiteDatabase, u: UnitType) => {
  const { id, title, questions, chapterId, order } = u;
  const existing = await db.getFirstAsync(`SELECT id FROM units WHERE id = ?`, [id]);
  if (!existing) {
    await db.runAsync(
      'INSERT INTO units (id, title, questions, chapterId, \`order\`) VALUES (?, ?, ?, ?, ?)',
      id,
      title,
      JSON.stringify(questions),
      chapterId,
      order
    );
  } else {
    await db.runAsync(
      `UPDATE units SET title = ?, questions = ?, chapterId = ?, \`order\` = ? WHERE id = ?`,
      [title, JSON.stringify(questions), chapterId, order, id]
    );
  }
};

export async function getUnitByChapter(
  db: SQLiteDatabase,
  lang: string,
  chapter: number
): Promise<UnitType[] | null> {
  const chapterId = `${lang}-${chapter}`;

  const sql = `
    SELECT id, title, questions, chapterId, \`order\`
    FROM units
    WHERE chapterId = ?
    ORDER BY \`order\` ASC
  `;

  const rawUnits = await db.getAllAsync<any>(sql, chapterId);
  if (!rawUnits || rawUnits.length === 0) return null;
  const units: UnitType[] = rawUnits.map((unit) => ({
    ...unit,
    questions: JSON.parse(unit.questions),
  }));

  return units;
}

export const getAllUnits = async (db: SQLiteDatabase) => {
  try {
    const rows = await db.getAllAsync(`SELECT * FROM units`);
    return rows;
  } catch (error) {
    console.error('Failed to fetch units:', error);
    return [];
  }
};

const deleteUnit = async (db: SQLiteDatabase, id: string) => {
  await db.runAsync(`DELETE FROM units WHERE id = ?`, [id]);
};

export const syncUnits = async (db: SQLiteDatabase, latest: UnitType[]) => {
  const latestSet = new Set(latest.map((u) => (u as UnitType).id));
  const cur = await getAllUnits(db);
  await Promise.all(
    cur.map(async (cu) => {
      const curUnitId = (cu as UnitType).id;
      if (!latestSet.has(curUnitId)) {
        await deleteUnit(db, curUnitId);
      }
    })
  );
  await Promise.all(
    latest.map(async (u) => {
      await createUnit(db, u);
    })
  );
};
