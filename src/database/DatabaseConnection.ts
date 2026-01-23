import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';
import { DatabaseMigrations } from './migrations';

export class DatabaseConnection {
  private static instance: SQLiteDatabase | null = null;
  private static readonly DATABASE_NAME = 'financial_expenses.db';

  private constructor() {}

  public static async getInstance(): Promise<SQLiteDatabase> {
    if (!DatabaseConnection.instance) {
      try {
        DatabaseConnection.instance = await SQLite.openDatabaseAsync(
          DatabaseConnection.DATABASE_NAME
        );
        await DatabaseMigrations.run(DatabaseConnection.instance);
      } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        throw new Error("Failed to connect to database");
      }
    }
    return DatabaseConnection.instance;
  }

  public static isConnected(): boolean {
    return DatabaseConnection.instance !== null;
  }

  public static async closeConnection(): Promise<void> {
    if (DatabaseConnection.instance) {
      try {
        await DatabaseConnection.instance.closeAsync();
        DatabaseConnection.instance = null;
      } catch (error) {
        console.error("Erro ao fechar conexão:", error);
        throw new Error("Failed to close database connection");
      }
    }
  }
}