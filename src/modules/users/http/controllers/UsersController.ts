import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../services/CreateUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password, accountId } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      username,
      password,
      accountId,
    });

    return response.json(user);
  }
}

export default new UserController();
