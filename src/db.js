import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(new URL("./data/database.sqlite", import.meta.url));

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS capturedPokemons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      hp INTEGER NOT NULL,
      cp INTEGER NOT NULL,
      picture TEXT NOT NULL,
      types TEXT,
      created DATETIME NOT NULL DEFAULT (datetime('now'))
    );
  `);
} catch (err) {
  console.error("Error initializing database:", err.message);
  process.exit(1);
}

export default db;
