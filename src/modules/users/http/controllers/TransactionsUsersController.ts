import { Request, Response } from 'express';
import { container } from 'tsyringe';
import TransactionsUsersService from '../../services/TransactionsUsersService';
import ShowUserService from '../../services/ShowUserService';

class TransactionsUsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, balance } = request.body;
    const { id } = request.user;

    const transactionUser = container.resolve(TransactionsUsersService);
    const usersRepository = container.resolve(ShowUserService);

    const account = await transactionUser.execute({
      id,
      username,
      balance,
    });

    const user = await usersRepository.execute({ id });

    return response.status(200).json({
      username: user.username,
      balance: account.balance,
      message: `Transaction success.`,
    });
  }
}

export default new TransactionsUsersController();
