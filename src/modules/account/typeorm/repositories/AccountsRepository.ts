import { IAccounts } from '@modules/account/domain/models/IAccounts';
import { ICreateAccounts } from '@modules/account/domain/models/ICreateAccounts';
import { IAccountsRepository } from '@modules/account/domain/repositories/IAccountsRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import Accounts from '../entities/Accounts';

class AccountsRepository implements IAccountsRepository {
  private ormRepository: Repository<Accounts>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Accounts);
  }
  public async create({balance}: ICreateAccounts): Promise<IAccounts> {
    const account = this.ormRepository.create({balance});

    await this.ormRepository.save(account);

    return account;
  }

  public async save(accounts: Accounts): Promise<Accounts> {
    await this.ormRepository.save(accounts);

    return accounts;
  }
}

export default AccountsRepository;
