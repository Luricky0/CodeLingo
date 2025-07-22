import * as SQLite from 'expo-sqlite';
import { createChapter, getChapter } from './chapter';
import { chapter } from 'assets/java/chapter1';

let db: SQLite.SQLiteDatabase;

export const initDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('codelingo.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS chapters (
        id TEXT PRIMARY KEY,
        lang TEXT,
        no TEXT,
        title TEXT,
        units TEXT
      );
    `);
    await createChapter(db, chapter);
    console.log('create successfully');
  }
};

export const getDB = async () => {
  if (!db) {
    await initDB();
  }
  return db;
};
