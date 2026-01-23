import { IReceiveRepository } from "../../repositories/IReceiveRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { DeleteReceiveRequest, DeleteReceiveResponse } from "../../dto/receive/DeleteReceiveDTO";

export class DeleteReceiveService {
  constructor(
    private receiveRepository: IReceiveRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({ item_id, user_id }: DeleteReceiveRequest): Promise<DeleteReceiveResponse> {

    if (!item_id) {
      throw new Error("O ID do item é obrigatório");
    }

    if (!user_id) {
      throw new Error("O ID do usuário é obrigatório");
    }

    const receive = await this.receiveRepository.findById(item_id);

    if (!receive) {
      throw new Error("Receber não encontrado");
    }

    if (receive.user_id !== user_id) {
      throw new Error("Não autorizado: Este item não pertence ao usuário");
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await this.receiveRepository.delete(item_id);

    let newBalance: number;
    if (receive.type === "despesa") {
      newBalance = user.balance + receive.value;
    } else {
      newBalance = user.balance - receive.value;
    }

    await this.userRepository.updateBalance(user_id, newBalance);

    return { 
      status: 'success',
      message: 'Receber excluído com sucesso'
    };
  }
}