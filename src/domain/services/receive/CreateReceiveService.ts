import { Receive } from "../../models/Receive";
import { CreateReceiveRequest } from "../../dto/receive/CreateReceiveDTO";
import * as Crypto from 'expo-crypto';
import { DatabaseConnection } from "../../../database/DatabaseConnection";
import { SQLiteUserRepository } from "../../../database/repositories/SQLiteUserRepository";
import { SQLiteReceiveRepository } from "../../../database/repositories/SQLiteReceiveRepository";

export class CreateReceiveService {


  async execute({ description, type, value, date, user_id }: CreateReceiveRequest): Promise<Receive> {

    if (!user_id) {
      throw new Error("ID do usuário é obrigatório");
    }

    if (!description) {
      throw new Error("Descrição é obrigatória");
    }

    if (!value || value <= 0) {
      throw new Error("Valor deve ser maior que zero");
    }

    if (!type) {
      throw new Error("Tipo é obrigatório");
    }

    if (!date) {
      throw new Error("Data é obrigatória");
    }
    const dataBase = await DatabaseConnection.getInstance();
    const userRepository = SQLiteUserRepository.getInstance(dataBase);
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    let newBalance: number;
    if (type === "receita") {
      newBalance = user.balance + Number(value);
    } else {
      newBalance = user.balance - Number(value);
    }

    await userRepository.updateBalance(user_id, newBalance);

    const newReceive: Receive = {
      id: Crypto.randomUUID(),
      description,
      type,
      value: Number(value),
      date,
      user_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const receiveRepository = SQLiteReceiveRepository.getInstance(dataBase)
    await receiveRepository.create(newReceive);

    return newReceive;
  }
}