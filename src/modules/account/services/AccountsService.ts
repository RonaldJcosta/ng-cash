import { inject, injectable } from 'tsyringe';
import { IAccounts } from '../domain/models/IAccounts';
import { ICreateAccounts } from '../domain/models/ICreateAccounts';
import { IAccountsRepository } from '../domain/repositories/IAccountsRepository';
import AccountsRepository from '../typeorm/repositories/AccountsRepository';

@injectable()
class AccountsService {
  constructor(
    @inject(AccountsRepository)
    private accountsRepository: IAccountsRepository,
  ) {}

  public async execute({ balance = 100 }: ICreateAccounts): Promise<IAccounts> {
    const account = await this.accountsRepository.create({ balance });
    return account;
  }
}

export default AccountsService;
