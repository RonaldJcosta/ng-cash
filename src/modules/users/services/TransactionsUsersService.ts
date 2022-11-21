import { inject, injectable } from 'tsyringe';
import { IUserBalance } from '@modules/users/domain/models/IUserBalance';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import AccountsRepository from '@modules/account/typeorm/repositories/AccountsRepository';
import { IAccountsRepository } from '@modules/account/domain/repositories/IAccountsRepository';
import { IAccounts } from '@modules/account/domain/models/IAccounts';

@injectable()
class TransactionsUsersService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,

    @inject(AccountsRepository)
    private accountsRepository: IAccountsRepository,
  ) {}

  public async execute({
    id,
    username,
    balance,
  }: IUserBalance): Promise<IAccounts> {
    const userCashout = await this.usersRepository.findById(id);

    if (userCashout.username === username) {
      throw new AppError(`you cannot transfer to yourself`);
    }

    const accountsOut = await this.accountsRepository.findById(
      userCashout.accountId,
    );

    if (balance > accountsOut.balance) {
      throw new AppError(`Insufficient funds`);
    }

    const userCashInId = await this.usersRepository.findByUsername(username);

    const { accountId } = userCashInId;

    const accountsIn = await this.accountsRepository.findById(accountId);

    const balanceCashOut = accountsOut.balance - balance;
    const balanceCashIn = accountsIn.balance + balance;

    await this.accountsRepository.update(accountsIn.id, balanceCashIn);
    const account = await this.accountsRepository.update(
      accountsOut.id,
      balanceCashOut,
    );
    return account;
  }
}

export default TransactionsUsersService;
