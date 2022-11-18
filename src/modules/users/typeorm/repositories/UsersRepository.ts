import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
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
}

export default UsersRepository;
