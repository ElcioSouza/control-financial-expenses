import { IUserRepository } from '../../repositories/IUserRepository';
import { IReceiveRepository } from '../../repositories/IReceiveRepository';
import { ListUserBalanceRequest } from '../../dto/user/ListUserBalanceDTO';

export class ListUserBalanceService {
  constructor(
    private userRepository: IUserRepository,
    private receiveRepository: IReceiveRepository
  ) {}

  async execute({ user_id, date }: ListUserBalanceRequest) {
    const user = await this.userRepository.findById(user_id);
    
    
    if (!user) {
      throw new Error("User not found");
    }

    const receives = await this.receiveRepository.getByDateRange(user_id, date, date);

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
