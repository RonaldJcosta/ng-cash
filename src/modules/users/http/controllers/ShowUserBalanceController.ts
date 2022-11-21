import ShowUserBalanceService from '@modules/users/services/ShowUserBalanceService';
import ShowUserService from '@modules/users/services/ShowUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowUserBalanceController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showBalance = container.resolve(ShowUserBalanceService);
    const showUser = container.resolve(ShowUserService);

    const account = await showBalance.execute({ id });
    const user = await showUser.execute({ id });
    const { balance } = account;
    return response.status(200).json({ username: user.username, balance });
  }
}

export default new ShowUserBalanceController();
