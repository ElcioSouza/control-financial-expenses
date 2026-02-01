import { ListUserBalanceService } from '../../domain/services/User/ListUserBalanceService';
import { ListUserBalanceRequest } from '../../domain/dto/user/ListUserBalanceDTO';

export class ListUserBalanceController {
  async handle(data: ListUserBalanceRequest) {
   
    try {
      const listUserBalanceService = new ListUserBalanceService();
      const balance = await listUserBalanceService.execute(data);
      return {
        success: true,
        data: balance,
        message: 'Detalhes do saldo recuperados com sucesso'
      };
    } catch (err) {
       throw new Error("Erro ao buscar saldo do usuário")
    }
  }
}