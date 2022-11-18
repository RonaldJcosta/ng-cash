import { IAccounts } from '../models/IAccounts';

export interface IAccountsRepository {
  save(accounts: IAccounts): Promise<IAccounts>;
}
