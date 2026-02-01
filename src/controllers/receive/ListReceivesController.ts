import { ListReceivesService } from '../../domain/services/receive/ListReceivesService';
import { ListReceivesRequest } from '../../domain/dto/receive/ListReceivesDTO';

export class ListReceivesController {
  async handle(data: ListReceivesRequest) {
    try {
      const listReceivesService = new ListReceivesService();
      const receives = await listReceivesService.execute(data);
      return {
        success: true,
        data: receives,
        message: 'receita listado com sucesso'
      };
    } catch (err) {
      throw new Error("Erro ao listar receitas/despesas")
    }
  }
}