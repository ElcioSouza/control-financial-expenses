import { AuthUserService } from '../../domain/services/User/AuthUserService';
import { AuthRequest } from '../../domain/dto/user/AuthUserDTO';

interface AuthControllerResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    id: string;
    name: string;
    email: string;
    balance: number;
  };
}

export class AuthUserController {
  
  async handle(data: AuthRequest): Promise<AuthControllerResponse> {
    try {
      const authUserService = new AuthUserService();
      const user = await authUserService.execute(data);
      return {
        success: true,
        message: 'Usuário autentificado com sucesso',
        data: user
      };
    } catch (err) {
      throw new Error("Email ou senha incorretos")
    }
  }
}