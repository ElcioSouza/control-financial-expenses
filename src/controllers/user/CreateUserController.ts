import { CreateUserService } from '../../domain/services/User/CreateUserService';
import { CreateUserRequest } from '../../domain/dto/user/CreateUserDTO';
import { DatabaseConnection } from '../../database/DatabaseConnection';
import { SQLiteUserRepository } from '../../database/repositories/SQLiteUserRepository';

export class CreateUserController {

  async handle(data: CreateUserRequest) {
    try {

      const db = await DatabaseConnection.getInstance();
      const userRepository = SQLiteUserRepository.getInstance(db);

      const createUserService = new CreateUserService(userRepository);
      const user = await createUserService.execute(data);

      return {
        success: true,
        data: user,
        message: 'User created successfully'
      };

    } catch (err) {
      console.log("Erro ao criar usuário:", err);
      return {
        success: false,
        error: err.message || 'Failed to create user'
      };
    }
  }
}