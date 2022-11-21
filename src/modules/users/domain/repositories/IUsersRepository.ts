import { IUser } from '../models/IUser';
import { ICreateUser } from '../models/ICreateUser';
import { IUserBalance } from '../models/IUserBalance';
import { IAccounts } from '@modules/account/domain/models/IAccounts';

export interface IUsersRepository {
  save(user: IUser): Promise<IUser>;
  findByUsername(username: string): Promise<IUser | null>;
  create(data: ICreateUser): Promise<IUser>;
  findBalanceById(data: IUserBalance): Promise<IAccounts | null>;
  findById(id: string): Promise<IUser | null>;
}
