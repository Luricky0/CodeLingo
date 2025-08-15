import { uploadProgress } from '../api/progressApi';
import { SQLiteDatabase } from 'expo-sqlite';
import { UnitProgressType, UnitType } from '../types/Unit';

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
    const user = await db.getFirstAsync(`SELECT * FROM users WHERE id = ?`, [id]);
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
      await unlockNextUnit(db, 'java-1-0', id + '');
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
  userId: string
): Promise<void> => {
  const userIdNum = Number.parseInt(userId);
  await db.runAsync(
    `
    INSERT OR REPLACE INTO user_unit_progress
    (user_id, unit_id, is_unlocked, is_completed, completed_at)
    VALUES (?, ?, 1, 1, CURRENT_TIMESTAMP)
  `,
    [userIdNum, currentUnitId]
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
  userId: string
): Promise<string | null> => {
  const userIdNum = Number.parseInt(userId);
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
    [userIdNum, nextUnitId]
  );

  return nextUnitId;
};

const formatUnitProgress = (progresses: any): UnitProgressType[] => {
  return progresses.map((p: any) => ({
    userId: p.user_id,
    unitId: p.unit_id,
    isUnlocked: !!p.is_unlocked,
    isCompleted: !!p.is_completed,
    completedAt: p.completed_at,
  }));
};

export const getUnitProgress = async (
  db: SQLiteDatabase,
  lang: string,
  chapterno: number,
  userId: string
): Promise<UnitProgressType[]> => {
  const userIdNum = Number.parseInt(userId);
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
    [userIdNum, chapterId]
  );
  return formatUnitProgress(rows);
};

export const getFirstUnitProgress = async (
  db: SQLiteDatabase,
  lang: string,
  chapterno: string,
  userId: string
): Promise<UnitProgressType | null> => {
  const userIdNum = Number.parseInt(userId);
  const chapterId = `${lang}-${chapterno}`;
  const rows = await db.getFirstAsync<UnitProgressType>(
    `
    SELECT u.id as unitId, u.title, p.user_id as userId, p.is_unlocked as isUnlocked,
    p.is_completed as isCompleted, p.completed_at as completedAt
    FROM units u
    LEFT JOIN user_unit_progress p
      ON u.id = p.unit_id AND p.user_id = ?
    WHERE u.chapterId = ? AND u."order" = 1
  `,
    [userIdNum, chapterId]
  );
  if (!rows) return null;
  return rows;
};

export const getAllProgressByUserId = async (db: SQLiteDatabase, userId: string) => {
  const userIdNum = Number.parseInt(userId);
  const rows = await db.getAllAsync(
    `SELECT * FROM user_unit_progress p
    WHERE p.user_id = ?
    `,
    [userIdNum]
  );
  if (!rows) return null;
  return formatUnitProgress(rows);
};

export const getChapterProgress = async (db: SQLiteDatabase, lang: string, userId: string) => {
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
