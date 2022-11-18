import { IAccountsRepository } from '@modules/account/domain/repositories/IAccountsRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import Accounts from '../entities/Accounts';

class AccountsRepository implements IAccountsRepository {
  private ormRepository: Repository<Accounts>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Accounts);
  }

  public async save(accounts: Accounts): Promise<Accounts> {
    await this.ormRepository.save(accounts);

    return accounts;
  }
}
