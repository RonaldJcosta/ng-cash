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
  public async findById(id: string) {
    const account = await this.ormRepository.findOneBy({ id });
    return account;
  }
  public async create({ balance }: ICreateAccounts): Promise<IAccounts> {
    const account =  this.ormRepository.create({ balance });

    await this.ormRepository.save(account);

    return account;
  }

  public async save(accounts: IAccounts): Promise<IAccounts> {
    await this.ormRepository.save(accounts);

    return accounts;
  }

  public async update(id: string, balance: number): Promise<IAccounts> {
    await this.ormRepository.update({ id }, { balance });

    return { id, balance };
  }
}

export default AccountsRepository;
