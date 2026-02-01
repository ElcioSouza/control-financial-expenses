import { CreateUserService } from '../../domain/services/User/CreateUserService';
import { CreateUserRequest } from '../../domain/dto/user/CreateUserDTO';

export class CreateUserController {

  async handle(data: CreateUserRequest) {
    try {
      const createUserService = new CreateUserService(); 
      const user = await createUserService.execute(data);
      return {
        success: true,
        data: user,
        message: 'User created successfully'
      };
    } catch (err) {
       throw new Error("Error ao criar usuário")
    }
  }
}