import { inject, injectable } from 'tsyringe';
import { IAccounts } from '@modules/account/domain/models/IAccounts';
import { IUserBalance } from '@modules/users/domain/models/IUserBalance';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class ShowUserBalanceService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IUserBalance): Promise<IAccounts> {
    return await this.usersRepository.findBalanceById({ id });
  }
}

export default ShowUserBalanceService;
