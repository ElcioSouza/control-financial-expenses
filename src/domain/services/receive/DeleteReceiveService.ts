import { DeleteReceiveRequest, DeleteReceiveResponse } from "../../dto/receive/DeleteReceiveDTO";
import { DatabaseConnection } from "../../../database/DatabaseConnection";
import { SQLiteUserRepository } from "../../../database/repositories/SQLiteUserRepository";
import { SQLiteReceiveRepository } from "../../../database/repositories/SQLiteReceiveRepository";

export class DeleteReceiveService {

  async execute({ item_id, user_id }: DeleteReceiveRequest): Promise<DeleteReceiveResponse> {

    if (!item_id) {
      throw new Error("ID do item é obrigatório");
    }

    if (!user_id) {
      throw new Error("ID do usuário é obrigatório");
    }
   const dataBase = await DatabaseConnection.getInstance();
   const receiveRepository = SQLiteReceiveRepository.getInstance(dataBase)
    const receive = await receiveRepository.findById(item_id);

    if (!receive) {
      throw new Error("Receita não encontrada");
    }

    if (receive.user_id !== user_id) {
      throw new Error("Não autorizado: Este item não pertence ao usuário");
    }
    const userRepository = SQLiteUserRepository.getInstance(dataBase)
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }
   
    await receiveRepository.delete(item_id);

    let newBalance: number;
    if (receive.type === "despesa") {
      newBalance = user.balance + receive.value;
    } else {
      newBalance = user.balance - receive.value;
    }

    await userRepository.updateBalance(user_id, newBalance);

    return { 
      status: 'success',
      message: 'receita deletado com sucesso'
    };
  }
}