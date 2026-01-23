import { ListDetailUserService } from '../../domain/services/User/ListDetailUserService';
import { DatabaseConnection } from '../../database/DatabaseConnection';
import { SQLiteUserRepository } from '../../database/repositories/SQLiteUserRepository';

export class ListDetailUserController {

  async handle(user_id: string) {
    try {
      const db = await DatabaseConnection.getInstance();
      const userRepository = SQLiteUserRepository.getInstance(db);
    
      const listDetailUserService = new ListDetailUserService(userRepository);
      const user = await listDetailUserService.execute(user_id);

      return {
        success: true,
        data: user,
        message: 'User details retrieved successfully'
      };

    } catch (err) {
      console.error("Erro ao buscar detalhes do usuário:", err);
      return {
        success: false,
        error: err.message || 'Failed to get user details'
      };
    }
  }
}