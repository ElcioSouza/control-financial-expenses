import { DeleteReceiveService } from '../../domain/services/receive/DeleteReceiveService';
import { DeleteReceiveRequest } from '../../domain/dto/receive/DeleteReceiveDTO';
import { DatabaseConnection } from '../../database/DatabaseConnection';
import { SQLiteUserRepository } from '../../database/repositories/SQLiteUserRepository';
import { SQLiteReceiveRepository } from '../../database/repositories/SQLiteReceiveRepository';

export class DeleteReceiveController {
  async handle(data: DeleteReceiveRequest) {
    try {

      const db = await DatabaseConnection.getInstance();
      const userRepository = SQLiteUserRepository.getInstance(db);

      const receiveRepository = SQLiteReceiveRepository.getInstance(db);
      const deleteReceiveService = new DeleteReceiveService(receiveRepository, userRepository);

      const result = await deleteReceiveService.execute(data);

      return {
        success: true,
        data: result,
        message: result.message
      };

    } catch (error: any) {
      console.error("Erro ao deletar receita/despesa:", error);
      return {
        success: false,
        error: error.message || 'Failed to delete receive'
      };
    }
  }
}