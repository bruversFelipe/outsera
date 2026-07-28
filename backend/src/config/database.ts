import Database from "better-sqlite3";

export const db = new Database(":memory:");

db.exec(`
  CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    title TEXT NOT NULL,
    studios TEXT NOT NULL,
    producer TEXT NOT NULL,
    winner INTEGER NOT NULL
  )
`);

export default db;
