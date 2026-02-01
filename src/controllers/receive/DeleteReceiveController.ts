import { DeleteReceiveService } from '../../domain/services/receive/DeleteReceiveService';
import { DeleteReceiveRequest } from '../../domain/dto/receive/DeleteReceiveDTO';

export class DeleteReceiveController {
  async handle(data: DeleteReceiveRequest) {
    try {
      const deleteReceiveService = new DeleteReceiveService();
      const result = await deleteReceiveService.execute(data);
      return {
        success: true,
        data: result,
        message: result.message
      };
    } catch (err) {
      throw new Error("Erro ao deletar receita/despesa")
    }
  }
}