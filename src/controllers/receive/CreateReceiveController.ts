import { CreateReceiveService } from '../../domain/services/receive/CreateReceiveService';
import { CreateReceiveRequest } from '../../domain/dto/receive/CreateReceiveDTO';

export class CreateReceiveController {
  async handle(data: CreateReceiveRequest) {
    try {
      const createReceiveService = new CreateReceiveService();
      const receive = await createReceiveService.execute(data);
      return {
        success: true,
        data: receive,
        message: receive.description
      };
    } catch (err) {
        throw new Error("Error ao criar receita/despesa")
    }
  }
}