import { SQLiteUserRepository } from '../../../database/repositories/SQLiteUserRepository';
import { SQLiteReceiveRepository } from '../../../database//repositories/SQLiteReceiveRepository';
import { ListUserBalanceRequest } from '../../dto/user/ListUserBalanceDTO';
import { DatabaseConnection } from '../../../database/DatabaseConnection';

export class ListUserBalanceService {

  async execute({ user_id, date }: ListUserBalanceRequest) {
    const dataBase = await DatabaseConnection.getInstance()
    const userRepository =  SQLiteUserRepository.getInstance(dataBase) 
    const user = await userRepository.findById(user_id);
  
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const receiveRepository = SQLiteReceiveRepository.getInstance(dataBase)
    const receives = await receiveRepository.getByDateRange(user_id, date, date);

    const receitas = receives
      .filter(r => r.type === 'receita')
      .reduce((acc, r) => acc + r.value, 0);
    
    const despesas = receives
      .filter(r => r.type === 'despesa')
      .reduce((acc, r) => acc + r.value, 0);

    return {
      balance: user.balance,
      receitas,
      despesas,
      total: receitas - despesas,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }
}
