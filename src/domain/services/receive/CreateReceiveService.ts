import { IReceiveRepository } from "../../repositories/IReceiveRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { Receive } from "../../models/Receive";
import { CreateReceiveRequest } from "../../dto/receive/CreateReceiveDTO";
import * as Crypto from 'expo-crypto';

export class CreateReceiveService {
  constructor(
    private receiveRepository: IReceiveRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({ description, type, value, date, user_id }: CreateReceiveRequest): Promise<Receive> {

    if (!user_id) {
      throw new Error("O ID do usuário é obrigatório");
    }

    if (!description) {
      throw new Error("A descrição é obrigatória");
    }

    if (!value || value <= 0) {
      throw new Error("O valor deve ser maior que zero");
    }

    if (!type) {
      throw new Error("O tipo é obrigatório");
    }

    if (!date) {
      throw new Error("A data é obrigatória");
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    let newBalance: number;
    if (type === "receita") {
      newBalance = user.balance + Number(value);
    } else {
      newBalance = user.balance - Number(value);
    }

    await this.userRepository.updateBalance(user_id, newBalance);

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

    await this.receiveRepository.create(newReceive);

    return newReceive;
  }
}