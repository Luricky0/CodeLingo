import * as SQLite from 'expo-sqlite';
import { createChapter, getChapter } from './chapter';
import { chapter, chapter2, unit1, unit2, unit201 } from 'assets/java/chapter1';
import { createUnit } from './unit';
import { completeCurrentUnit } from './user';
import AsyncStorage from '@react-native-async-storage/async-storage';

let db: SQLite.SQLiteDatabase | null = null;
let initPromise: Promise<SQLite.SQLiteDatabase> | null = null;

const initDB = async (): Promise<SQLite.SQLiteDatabase> => {
  const dbInstance = await SQLite.openDatabaseAsync('codelingo.db');
  await dbInstance.runAsync('DROP TABLE IF EXISTS users');
  await dbInstance.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT,
      email TEXT NOT NULL UNIQUE,
      token TEXT NOT NULL
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
  await createChapter(dbInstance, chapter2);
  const currentUserId = await AsyncStorage.getItem('codelingo-user');
  if (currentUserId) await completeCurrentUnit(dbInstance, 'java-1-1', currentUserId);
  else console.log('No currentUser found!');

  console.log('DB initialized successfully');
  return dbInstance;
};

export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) return db;

  if (!initPromise) {
    initPromise = initDB().then((dbInstance) => {
      db = dbInstance;
      return dbInstance;
    });
  }

  return await initPromise;
};
