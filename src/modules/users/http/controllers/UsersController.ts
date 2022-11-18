import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../services/CreateUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const accountId = '';
    const user = await createUser.execute({
      username,
      password,
      accountId,
    });

    return response
      .status(200)
      .json({ message: `Registration done successfully` });
  }
}

export default new UserController();
