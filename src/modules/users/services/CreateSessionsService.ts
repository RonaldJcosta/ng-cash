import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';

@injectable()
class CreateSessionsService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    username,
    password,
  }: ICreateUser): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError('Username/password invalid.', 401);
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new AppError('Username/password invalid.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return { user, token };
  }
}

export default CreateSessionsService;
