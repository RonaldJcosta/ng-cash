import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import UsersRepository from '../typeorm/repositories/UsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    username,
    password,
    accountId,
  }: ICreateUser): Promise<IUser> {
    if (username.length < 3) {
      throw new AppError('Username must have at least 3 characters');
    }
    const usernameExists = await this.usersRepository.findByUsername(username);

    if (usernameExists) {
      throw new AppError('Username address already used.');
    }

    const user = await this.usersRepository.create({
      username,
      password,
      accountId,
    });

    return user;
  }
}

export default CreateUserService;
