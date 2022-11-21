import { IAccounts } from '@modules/account/domain/models/IAccounts';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUserBalance } from '@modules/users/domain/models/IUserBalance';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async findByUsername(username: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({ username });

    return user;
  }

  public async create({
    username,
    password,
    accountId,
  }: ICreateUser): Promise<IUser> {
    const user = this.ormRepository.create({ username, password, accountId });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async findBalanceById({ id }: IUserBalance): Promise<IAccounts> {
    const [account] = await this.ormRepository.query(
      `
        SELECT users.account_id, users.username, accounts.balance AS balance
        FROM users
        INNER JOIN accounts ON accounts.id = users.account_id
        WHERE users.id = $1`,
      [id],
    );

    return account;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({ id });

    return user;
  }
}

export default UsersRepository;
