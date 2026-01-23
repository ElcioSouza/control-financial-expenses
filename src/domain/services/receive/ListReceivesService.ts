import { IReceiveRepository } from "../../repositories/IReceiveRepository";
import { Receive } from "../../models/Receive";
import { ListReceivesRequest } from "../../dto/receive/ListReceivesDTO";

export class ListReceivesService {
  constructor(private receiveRepository: IReceiveRepository) {}

  async execute({ date, user_id }: ListReceivesRequest): Promise<Receive[]> {

    if (!user_id) {
      throw new Error("O ID do usuário é obrigatório");
    }

    if (!date) {
      throw new Error("A data é obrigatória");
    }
    
    const receives = await this.receiveRepository.getByDateRange(user_id, date, date);

    return receives;
  }
}