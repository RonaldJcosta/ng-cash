import { inject, injectable } from 'tsyringe';
import { IUserBalance } from '@modules/users/domain/models/IUserBalance';
import { IUser } from '@modules/users/domain/models/IUser';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class ShowUserService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IUserBalance): Promise<IUser> {
    return await this.usersRepository.findById(id);
  }
}

export default ShowUserService;
