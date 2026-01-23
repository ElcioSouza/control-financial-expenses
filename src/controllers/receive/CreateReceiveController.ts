import { CreateReceiveService } from '../../domain/services/receive/CreateReceiveService';
import { CreateReceiveRequest } from '../../domain/dto/receive/CreateReceiveDTO';
import { DatabaseConnection } from '../../database/DatabaseConnection';
import { SQLiteUserRepository } from '../../database/repositories/SQLiteUserRepository';
import { SQLiteReceiveRepository } from '../../database/repositories/SQLiteReceiveRepository';

export class CreateReceiveController {
  async handle(data: CreateReceiveRequest) {
    try {
      const db = await DatabaseConnection.getInstance();
      const userRepository = SQLiteUserRepository.getInstance(db);
      const receiveRepository = SQLiteReceiveRepository.getInstance(db);

        const createReceiveService = new CreateReceiveService(receiveRepository, userRepository);
      
      const receive = await createReceiveService.execute(data);

      return {
        success: true,
        data: receive,
        message: 'Receive created successfully'
      };

    } catch (error: any) {
      console.error("Erro ao criar receita/despesa:", error);
      return {
        success: false,
        error: error.message || 'Failed to create receive'
      };
    }
  }
}