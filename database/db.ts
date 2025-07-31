import * as SQLite from 'expo-sqlite';
import { createChapter, getChapter } from './chapter';
import { chapter, unit1, unit2, unit201 } from 'assets/java/chapter1';
import { createUnit } from './unit';
import { completeCurrentUnit } from './user';

let db: SQLite.SQLiteDatabase | null = null;
let initPromise: Promise<SQLite.SQLiteDatabase> | null = null;

const initDB = async (): Promise<SQLite.SQLiteDatabase> => {
  const dbInstance = await SQLite.openDatabaseAsync('codelingo.db');

  await dbInstance.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT
    );
  `);

  await dbInstance.runAsync('DROP TABLE IF EXISTS chapters;');
  await dbInstance.execAsync(`
    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      lang TEXT,
      no TEXT,
      title TEXT,
      units TEXT
    );
  `);

  await dbInstance.runAsync('DROP TABLE IF EXISTS units;');
  await dbInstance.execAsync(`
    CREATE TABLE IF NOT EXISTS units (
      id TEXT PRIMARY KEY,
      title TEXT,
      questions TEXT,
      chapterId TEXT,
      \`order\` NUMBER
    );
  `);
  await dbInstance.runAsync('DROP TABLE IF EXISTS user_unit_progress;');
  await dbInstance.execAsync(`
    CREATE TABLE IF NOT EXISTS user_unit_progress (
      user_id INTEGER,
      unit_id TEXT,
      is_unlocked BOOLEAN DEFAULT 0,
      is_completed BOOLEAN DEFAULT 0,
      completed_at DATETIME,
      PRIMARY KEY (user_id, unit_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (unit_id) REFERENCES units(id)
    );
  `);

  await createUnit(dbInstance, unit1);
  await createUnit(dbInstance, unit2);
  await createUnit(dbInstance, unit201);
  await createChapter(dbInstance, chapter);
  await completeCurrentUnit(dbInstance, 'java-1-1');

  console.log('DB initialized successfully');
  return dbInstance;
};

export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  console.log('run');
  if (db) return db;

  if (!initPromise) {
    initPromise = initDB().then((dbInstance) => {
      db = dbInstance;
      return dbInstance;
    });
  }

  return await initPromise;
};
