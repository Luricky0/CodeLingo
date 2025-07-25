import * as SQLite from 'expo-sqlite';
import { createChapter, getChapter } from './chapter';
import { chapter, unit1, unit2 } from 'assets/java/chapter1';
import { createUnit } from './unit';

let db: SQLite.SQLiteDatabase;

export const initDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('codelingo.db');
    await db.execAsync(`
      CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT
    );`);
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
    await db.execAsync(`
      CREATE TABLE user_unit_progress (
      user_id INTEGER,
      unit_id TEXT,
      is_unlocked BOOLEAN DEFAULT 0,
      is_completed BOOLEAN DEFAULT 0,
      completed_at DATETIME,
      PRIMARY KEY (user_id, unit_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (unit_id) REFERENCES units(id)
    );`);
    await createUnit(db, unit1);
    await createUnit(db, unit2);
    await createChapter(db, chapter);
    console.log('DB created successfully');
  }
};

export const getDB = async () => {
  if (!db) {
    await initDB();
  }
  return db;
};
