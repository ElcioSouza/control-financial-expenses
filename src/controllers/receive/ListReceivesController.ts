import { ListReceivesService } from '../../domain/services/receive/ListReceivesService';
import { ListReceivesRequest } from '../../domain/dto/receive/ListReceivesDTO';
import { DatabaseConnection } from '../../database/DatabaseConnection';
import { SQLiteReceiveRepository } from '../../database/repositories/SQLiteReceiveRepository';

export class ListReceivesController {
  async handle(data: ListReceivesRequest) {
    try {
      const db = await DatabaseConnection.getInstance();
      const receiveRepository = SQLiteReceiveRepository.getInstance(db);

      const listReceivesService = new ListReceivesService(receiveRepository);
      const receives = await listReceivesService.execute(data);
  
      return {
        success: true,
        data: receives,
        message: 'Receives listed successfully'
      };

    } catch (error: any) {
      console.error("Erro ao listar receitas/despesas:", error);
      return {
        success: false,
        error: error.message || 'Failed to list receives'
      };
    }
  }
}