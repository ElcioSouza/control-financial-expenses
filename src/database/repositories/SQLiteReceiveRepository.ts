import { SQLiteDatabase } from 'expo-sqlite';
import { Receive } from '../../domain/models/Receive';
import { IReceiveRepository } from '../../domain/repositories/IReceiveRepository';

export class SQLiteReceiveRepository implements IReceiveRepository {
    private static instance: SQLiteReceiveRepository;
    private db: SQLiteDatabase;

    private constructor(database: SQLiteDatabase) {
        this.db = database;
    }

    public static getInstance(database: SQLiteDatabase): SQLiteReceiveRepository {
        if (!SQLiteReceiveRepository.instance) {
            SQLiteReceiveRepository.instance = new SQLiteReceiveRepository(database);
        }
        return SQLiteReceiveRepository.instance;
    }

    async create(receive: Receive): Promise<void> {
        try {
            const query = `
                INSERT INTO receives (id, description, value, type, date, user_id, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
           
            await this.db.runAsync(query, [
                receive.id,
                receive.description,
                receive.value,
                receive.type,
                receive.date,
                receive.user_id,
                receive.created_at,
                receive.updated_at
            ]);
            console.log(`Receita/Despesa ${receive.description} criada com sucesso.`);
        } catch (error) {
            console.error("Erro ao criar receita/despesa:", error);
            throw new Error("Falha ao criar recebimento");
        }
    }

    async findById(id: string): Promise<Receive | null> {
        try {
            const result = await this.db.getFirstAsync<Receive>(
                'SELECT * FROM receives WHERE id = ?',
                [id]
            );
            return result || null;
        } catch (error) {
            console.error("Erro ao buscar receita/despesa por ID:", error);
            throw new Error("Falha ao encontrar o ID de recebimento");
        }
    }

    async findByUserId(userId: string): Promise<Receive[]> {
        try {
            const receives = await this.db.getAllAsync<Receive>(
                'SELECT * FROM receives WHERE user_id = ? ORDER BY created_at DESC',
                [userId]
            );
            return receives;
        } catch (error) {
            console.error("Erro ao buscar receitas/despesas por usuário:", error);
            throw new Error("Não foi possível encontrar os recebimentos do usuário");
        }
    }

    async listAll(): Promise<Receive[]> {
        try {
            const receives = await this.db.getAllAsync<Receive>(
                'SELECT * FROM receives ORDER BY created_at DESC'
            );
            return receives;
        } catch (error) {
            console.error("Erro ao listar receitas/despesas:", error);
            throw new Error("Falha ao listar os recebidos");
        }
    }

    async update(receive: Receive): Promise<void> {
        try {
            const query = `
                UPDATE receives 
                SET description = ?, value = ?, type = ?, date = ?, updated_at = ?
                WHERE id = ?
            `;
            await this.db.runAsync(query, [
                receive.description,
                receive.value,
                receive.type,
                receive.date,
                receive.updated_at,
                receive.id
            ]);
            console.log(`Receita/Despesa ${receive.id} atualizada com sucesso.`);
        } catch (error) {
            console.error("Erro ao atualizar receita/despesa:", error);
            throw new Error("Falha ao atualizar recebimento");
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.db.runAsync('DELETE FROM receives WHERE id = ?', [id]);
            console.log(`Receita/Despesa ${id} deletada com sucesso.`);
        } catch (error) {
            console.error("Erro ao deletar receita/despesa:", error);
            throw new Error("Falha ao deletar recebimento");
        }
    }

    async getTotalByUser(userId: string): Promise<number> {
        try {
            const result = await this.db.getFirstAsync<{ total: number }>(
                'SELECT SUM(value) as total FROM receives WHERE user_id = ?',
                [userId]
            );
            return result?.total || 0;
        } catch (error) {
            console.error("Erro ao calcular total por usuário:", error);
            throw new Error("Falha ao calcular total por usuário");
        }
    }

    async getByUserAndType(userId: string, type: string): Promise<Receive[]> {
        try {
            const receives = await this.db.getAllAsync<Receive>(
                'SELECT * FROM receives WHERE user_id = ? AND type = ? ORDER BY created_at DESC',
                [userId, type]
            );
            return receives;
        } catch (error) {
            console.error("Erro ao buscar por usuário e tipo:", error);
            throw new Error("Falha ao buscar recebimentos por usuário e tipo");
        }
    }

    async getByDateRange(userId: string, startDate: string, endDate: string): Promise<Receive[]> {
        try {
            const receives = await this.db.getAllAsync<Receive>(
                'SELECT * FROM receives WHERE user_id = ? AND date BETWEEN ? AND ? ORDER BY date DESC, created_at DESC',
                [userId, startDate, endDate]
            );
            return receives;
        } catch (error) {
            console.error("Erro ao buscar por período:", error);
            throw new Error("Falha ao buscar recebimentos por período");
        }
    }
}
