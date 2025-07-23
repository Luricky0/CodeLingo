import { ChapterType } from 'types/Chapter';
import { UnitType } from 'types/Unit';
import { SQLiteDatabase } from 'expo-sqlite';
import { getUnitByChapter } from './unit';

export const createChapter = async (db: SQLiteDatabase, ch: ChapterType) => {
  const { id, title, units, lang, no } = ch;
  const existing = await db.getFirstAsync(`SELECT id FROM chapters WHERE id = ?`, [id]);
  if (!existing) {
    await db.runAsync(
      'INSERT INTO chapters (id, title, lang, no, units) VALUES (?, ?, ?, ?, ?)',
      id,
      title,
      lang,
      no,
      JSON.stringify(units)
    );
  }
};

export async function getChapter(
  db: SQLiteDatabase,
  lang: string,
  no: number
): Promise<ChapterType | null> {
  const sql = `
    SELECT id, lang, no , title, units
    FROM chapters
    WHERE id = "${lang}-${no}"
    LIMIT 1
  `;
  const raw = await db.getFirstAsync<any>(sql);
  const units = await getUnitByChapter(db, lang, no);
  if (!raw) return null;
  if (!units) return null;

  const result: ChapterType = {
    id: raw.id,
    lang: raw.lang,
    no: Number(raw.no),
    title: raw.title,
    units,
    description: raw.description,
    nextChapterId: raw.nextChapterId ?? undefined,
  };

  return result;
}
