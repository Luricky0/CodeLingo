import * as SQLite from 'expo-sqlite';
import { createChapter } from './chapter';
import { chapter } from 'assets/java/chapter1';

const db = await SQLite.openDatabaseAsync('codelingo.db');

export const initDB = async () => {
  
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      lang TEXT,
      no TEXT,
      title TEXT,
      units TEXT
    );
  `);
  await createChapter(chapter);
};

export default db;
