import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../models/User";

export class ListDetailUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(user_id: string): Promise<User> {
    
    if (!user_id) {
      throw new Error("O ID do usuário é obrigatório");
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return {
      ...user,
      password: ''
    };
  }
}