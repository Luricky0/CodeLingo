import * as SQLite from 'expo-sqlite';
import { createChapter, getChapter } from './chapter';
import { chapter, unit1 } from 'assets/java/chapter1';
import { createUnit } from './unit';

let db: SQLite.SQLiteDatabase;

export const initDB = async () => {
  if (!db) {
    console.log('creating');
    db = await SQLite.openDatabaseAsync('codelingo.db');
    await db.runAsync('DROP TABLE IF EXISTS chapters;');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS chapters (
        id TEXT PRIMARY KEY,
        lang TEXT,
        no TEXT,
        title TEXT,
        units TEXT
      );
    `);
    await db.runAsync('DROP TABLE IF EXISTS units;');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS units (
        id TEXT PRIMARY KEY,
        title TEXT,
        questions TEXT,
        chapterId TEXT,
        \`order\` NUMBER
      );
    `);
    await createUnit(db, unit1);
    await createChapter(db, chapter);
  }
};

export const getDB = async () => {
  if (!db) {
    await initDB();
  }
  return db;
};
