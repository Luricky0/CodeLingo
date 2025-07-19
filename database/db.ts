import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('codelingo.db');

await db.execAsync(`
    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      lang TEXT,
      no TEXT,
      title TEXT,
      units TEXT
    );
  `);

export default db;
