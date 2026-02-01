import { ListUserBalanceRequest } from '../../domain/dto/user/ListUserBalanceDTO';
import { ListDetailUserService } from '../../domain/services/User/ListDetailUserService';

export class ListDetailUserController {

  async handle({user_id}: ListUserBalanceRequest) {
    try {
      const listDetailUserService = new ListDetailUserService();
      const user = await listDetailUserService.execute({user_id});
      return {
        success: true,
        data: user,
        message: 'Detalhes do usuário recuperados com sucesso'
      };
    } catch (err) {
      throw new Error("Erro ao buscar detalhes do usuário")
    }
  }
}