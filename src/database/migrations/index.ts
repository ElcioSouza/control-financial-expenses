import { SQLiteDatabase } from 'expo-sqlite';

export class DatabaseMigrations {
  static async run(db: SQLiteDatabase): Promise<void> {
    try {
      await this.createUsersTable(db);
      await this.createReceivesTable(db);
      await this.createIndexes(db);
    } catch (error) {
      console.error("Erro ao executar migrations:", error);
      throw new Error("Failed to run database migrations");
    }
  }

  private static async createUsersTable(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        balance REAL NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
  }

  private static async createReceivesTable(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS receives (
        id TEXT PRIMARY KEY,
        description TEXT NOT NULL,
        value REAL NOT NULL,
        type TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        user_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
  }

  private static async createIndexes(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_receives_user_id 
      ON receives(user_id);
    `);
  }
}
