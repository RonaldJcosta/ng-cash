import { IUser } from '../models/IUser';
import { ICreateUser } from '../models/ICreateUser';

export interface IUsersRepository {
  save(user: IUser): Promise<IUser>;
  findByUsername(username: string): Promise<IUser | null>;
  create(data: ICreateUser): Promise<IUser>;
}
