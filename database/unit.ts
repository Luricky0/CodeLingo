import { ChapterType } from 'types/Chapter';
import { UnitType } from 'types/Unit';
import { SQLiteDatabase } from 'expo-sqlite';
import { Question } from 'types/Question';

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
