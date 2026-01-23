import { SQLiteDatabase } from 'expo-sqlite';
import { User } from '../../domain/models/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class SQLiteUserRepository implements IUserRepository {
    private static instance: SQLiteUserRepository;
    private db: SQLiteDatabase;

    private constructor(database: SQLiteDatabase) {
        this.db = database;
    }

    public static getInstance(database: SQLiteDatabase): SQLiteUserRepository {
        if (!SQLiteUserRepository.instance) {
            SQLiteUserRepository.instance = new SQLiteUserRepository(database);
        }
        return SQLiteUserRepository.instance;
    }

    async create(user: User): Promise<void> {
        try {
            
            const query = `
                INSERT INTO users (id, name, email, password, balance, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            await this.db.runAsync(query, [
                user.id,
                user.name,
                user.email,
                user.password,
                user.balance,
                user.created_at,
                user.updated_at
            ]);
            console.log(`Usuário ${user.name} criado com sucesso.`);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw new Error("Falha ao criar usuário");
        }
    }

    async findById(id: string): Promise<User | null> {
        try {
            const result = await this.db.getFirstAsync<User>(
                'SELECT * FROM users WHERE id = ?',
                [id]
            );
            return result || null;
        } catch (error) {
            console.error("Erro ao buscar usuário por ID:", error);
            throw new Error("Falha ao encontrar usuário por ID");
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const result = await this.db.getFirstAsync<User>(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            return result || null;
        } catch (error) {
            console.error("Erro ao buscar usuário por email:", error);
            throw new Error("Falha ao encontrar usuário por email");
        }
    }

    async listAll(): Promise<User[]> {
        try {
            const users = await this.db.getAllAsync<User>('SELECT * FROM users');
            return users;
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            throw new Error("Falha ao listar usuários");
        }
    }

    async update(user: User): Promise<void> {
        try {
            const query = `
                UPDATE users 
                SET name = ?, email = ?, password = ?, balance = ?, updated_at = ?
                WHERE id = ?
            `;
            await this.db.runAsync(query, [
                user.name,
                user.email,
                user.password,
                user.balance,
                user.updated_at,
                user.id
            ]);
            console.log(`Usuário ${user.id} atualizado com sucesso.`);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw new Error("Falha ao atualizar usuário");
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.db.runAsync('DELETE FROM users WHERE id = ?', [id]);
            console.log(`Usuário ${id} deletado com sucesso.`);
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            throw new Error("Falha ao deletar usuário");
        }
    }

    async updateBalance(userId: string, newBalance: number): Promise<void> {
        try {
            const query = `
                UPDATE users 
                SET balance = ?, updated_at = ?
                WHERE id = ?
            `;
            await this.db.runAsync(query, [
                newBalance,
                new Date().toISOString(),
                userId
            ]);
        } catch (error) {
            console.error("Erro ao atualizar saldo:", error);
            throw new Error("Falha ao atualizar saldo");
        }
    }
}