import { Receive } from "../../models/Receive";
import { ListReceivesRequest } from "../../dto/receive/ListReceivesDTO";
import { DatabaseConnection } from "../../../database/DatabaseConnection";
import { SQLiteReceiveRepository } from "../../../database/repositories/SQLiteReceiveRepository";

export class ListReceivesService {

  async execute({ date, user_id }: ListReceivesRequest): Promise<Receive[]> {

    if (!user_id) {
      throw new Error("ID do usuário é obrigatório");
    }

    if (!date) {
      throw new Error("Data é obrigatória");
    }
    const dataBase = await DatabaseConnection.getInstance()
    const receiveRepository = SQLiteReceiveRepository.getInstance(dataBase)
    const receives =  receiveRepository.getByDateRange(user_id, date, date);

    return receives;
  }
}