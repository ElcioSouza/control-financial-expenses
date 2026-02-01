import { User } from "../../models/User";
import { DatabaseConnection } from "../../../database/DatabaseConnection";
import { SQLiteUserRepository } from "../../../database/repositories/SQLiteUserRepository";
import { ListUserBalanceRequest } from "../../dto/user/ListUserBalanceDTO";

export class ListDetailUserService {
  async execute({user_id}: ListUserBalanceRequest): Promise<User> {
    
    if (!user_id) {
      throw new Error("ID do usuário é obrigatório");
    }
    const dataBase = await DatabaseConnection.getInstance();
    const userRepository = SQLiteUserRepository.getInstance(dataBase);
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return {
      ...user,
      password: ''
    };
  }
}