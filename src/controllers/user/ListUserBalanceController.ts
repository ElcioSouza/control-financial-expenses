import { ListUserBalanceService } from '../../domain/services/User/ListUserBalanceService';
import { ListUserBalanceRequest } from '../../domain/dto/user/ListUserBalanceDTO';
import { DatabaseConnection } from '../../database/DatabaseConnection';
import { SQLiteUserRepository } from '../../database/repositories/SQLiteUserRepository';
import { SQLiteReceiveRepository } from '../../database/repositories/SQLiteReceiveRepository';

export class ListUserBalanceController {
  async handle(data: ListUserBalanceRequest) {
   
    try {
      const db = await DatabaseConnection.getInstance();
      const userRepository = SQLiteUserRepository.getInstance(db);
      const receiveRepository = SQLiteReceiveRepository.getInstance(db);

      const listUserBalanceService = new ListUserBalanceService(userRepository, receiveRepository);
      const balance = await listUserBalanceService.execute(data);

      return {
        success: true,
        data: balance,
        message: 'Balance details retrieved successfully'
      };

    } catch (err) {
      console.error("Erro ao buscar saldo do usuário:", err);
      return {
        success: false,
        error: err.message || 'Failed to get user balance'
      };
    }
  }
}