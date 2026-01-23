import { AuthUserService } from '../../domain/services/User/AuthUserService';
import { AuthRequest } from '../../domain/dto/user/AuthUserDTO';
import { DatabaseConnection } from '../../database/DatabaseConnection';
import { SQLiteUserRepository } from '../../database/repositories/SQLiteUserRepository';

export class AuthUserController {
  async handle(data: AuthRequest) {
    try {
      const db = await DatabaseConnection.getInstance();
      const userRepository = SQLiteUserRepository.getInstance(db);

      const authUserService = new AuthUserService(userRepository);
      const auth = await authUserService.execute(data);
  

      if (!auth || !auth.id || !auth.email) {
        return {
          success: false,
          error: 'Dados de autenticação inválidos'
        };
      }

      return {
        success: true,
        data: auth,
        message: 'User authenticated successfully'
      };

    } catch (err) {
      return {
        success: false,
        error: err.message || 'Email ou senha incorretos'
      };
    }
  }
}