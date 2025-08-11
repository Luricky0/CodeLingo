import { SQLiteDatabase } from 'expo-sqlite';
import { UnitType } from 'features/Unit';

export type UnitProgressType = {
  user_id: string;
  unit_id: string;
  is_unlocked: boolean;
  is_completed: boolean;
  completed_at: Date;
};

export type UserType = {
  id: number;
  username?: string;
  email: string;
  token: string;
};

export const createUser = async (
  db: SQLiteDatabase,
  id: number,
  email: string,
  token: string,
  username = ''
): Promise<void> => {
  try {
    const user = await db.getFirstAsync(`SELECT * FROM users WHERE id = ?`, [1]);
    if (user) {
      await db.runAsync(`UPDATE users SET email = ?, username = ?, token = ? WHERE id = ?`, [
        email,
        username,
        token,
        id,
      ]);
      console.log('User updated successfully');
    } else {
      await db.runAsync(`INSERT INTO users (id, email, username, token) VALUES (?, ?, ?, ?)`, [
        id,
        email,
        username,
        token,
      ]);
      console.log('User created successfully');
    }
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

export const getToken = async (db: SQLiteDatabase): Promise<string | null> => {
  try {
    const res = await db.getFirstAsync<UserType>(`SELECT token FROM users WHERE id = ? LIMIT 1`, [
      1,
    ]);
    if (res) return res.token;
    else return null;
  } catch (error) {
    console.error('Failed to get token:', error);
    return null;
  }
};

export const completeCurrentUnit = async (
  db: SQLiteDatabase,
  currentUnitId: string,
  userId: number = 1
): Promise<void> => {
  await db.runAsync(
    `
    INSERT OR REPLACE INTO user_unit_progress
    (user_id, unit_id, is_unlocked, is_completed, completed_at)
    VALUES (?, ?, 1, 1, CURRENT_TIMESTAMP)
  `,
    [userId, currentUnitId]
  );
};
export const getNextUnitId = async (
  db: SQLiteDatabase,
  currentUnitId: string
): Promise<string | null> => {
  const match = currentUnitId.match(/^([a-zA-Z]+)-(\d+)-(\d+)$/);
  if (!match) return null;

  const lang = match[1];
  const chapterNo = parseInt(match[2], 10);
  const unitNo = parseInt(match[3], 10);

  const nextUnitIdSameChapter = `${lang}-${chapterNo}-${unitNo + 1}`;

  const unit1 = await db.getFirstAsync<UnitType>(`SELECT id FROM units WHERE id = ?`, [
    nextUnitIdSameChapter,
  ]);
  if (unit1?.id) return unit1.id;

  const nextUnitIdNextChapter = `${lang}-${chapterNo + 1}-1`;
  const unit2 = await db.getFirstAsync<UnitType>(`SELECT id FROM units WHERE id = ?`, [
    nextUnitIdNextChapter,
  ]);
  if (unit2?.id) return unit2.id;

  return null;
};

export const unlockNextUnit = async (
  db: SQLiteDatabase,
  currentUnitId: string,
  userId: number = 1
): Promise<string | null> => {
  const nextUnitId = await getNextUnitId(db, currentUnitId);
  if (!nextUnitId) {
    console.log('No next unit to unlock.');
    return null;
  }

  await db.runAsync(
    `
    INSERT OR IGNORE INTO user_unit_progress
    (user_id, unit_id, is_unlocked, is_completed)
    VALUES (?, ?, 1, 0)
  `,
    [userId, nextUnitId]
  );

  console.log(`Unlocked next unit: ${nextUnitId}`);
  return nextUnitId;
};

export const getUnitProgress = async (
  db: SQLiteDatabase,
  lang: string,
  chapterno: number
): Promise<UnitProgressType[]> => {
  const chapterId = `${lang}-${chapterno}`;
  const rows = await db.getAllAsync(
    `
    SELECT u.id as unit_id, u.title, p.is_unlocked, p.is_completed, p.completed_at
    FROM units u
    LEFT JOIN user_unit_progress p
      ON u.id = p.unit_id AND p.user_id = ?
    WHERE u.chapterId = ?
    ORDER BY u.\`order\` ASC
  `,
    [1, chapterId]
  );
  return rows as UnitProgressType[];
};

export const getFirstUnitProgress = async (
  db: SQLiteDatabase,
  lang: string,
  chapterno: string,
  userId: number
): Promise<UnitProgressType | null> => {
  const chapterId = `${lang}-${chapterno}`;
  const rows = await db.getFirstAsync(
    `
    SELECT u.id as unit_id, u.title, p.is_unlocked, p.is_completed, p.completed_at
    FROM units u
    LEFT JOIN user_unit_progress p
      ON u.id = p.unit_id AND p.user_id = ?
    WHERE u.chapterId = ? AND u."order" = 1
  `,
    [userId, chapterId]
  );
  if (!rows) return null;
  return rows as UnitProgressType;
};

export const getChapterProgress = async (db: SQLiteDatabase, lang: string, userId: number) => {
  const res = [];
  let i = 1;
  const MAX_CHAPTERS = 1000;
  while (i <= MAX_CHAPTERS) {
    try {
      const p = await getFirstUnitProgress(db, lang, i + '', userId);
      if (!p) break;
      res.push(p);
      i++;
    } catch (e) {
      console.error(`Error in chapter ${i}:`, e);
      break;
    }
  }
  return res;
};
