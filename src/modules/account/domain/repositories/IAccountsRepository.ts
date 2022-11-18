import { IAccounts } from '../models/IAccounts';
import { ICreateAccounts } from '../models/ICreateAccounts';

export interface IAccountsRepository {
  save(accounts: IAccounts): Promise<IAccounts>;
  create(data: ICreateAccounts): Promise<IAccounts>;
}
