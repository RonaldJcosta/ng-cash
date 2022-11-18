import AccountsRepository from '@modules/account/typeorm/repositories/AccountsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IAccountsRepository } from '../../account/domain/repositories/IAccountsRepository';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';

@injectable()
class CreateUserService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,

    @inject(AccountsRepository)
    private accountsRepository: IAccountsRepository,
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

    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/)) {
      throw new AppError('Password must be at least 8 characters long and contain uppercase letters and numbers.');
    }

    const balance = 100;
    const account = await this.accountsRepository.create({ balance });

    const { id } = account;

    const hashedPassword = await hash(password, 3);

    const user = await this.usersRepository.create({
      username,
      password: hashedPassword,
      accountId: id,
    });

    return user;
  }
}

export default CreateUserService;
