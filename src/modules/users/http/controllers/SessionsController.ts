import CreateSessionsService from '@modules/users/services/CreateSessionsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;
    const createSession = container.resolve(CreateSessionsService);

    const userToken = await createSession.execute({ username, password });
    const { user, token } = userToken;
    return response.status(200).json({
      id: user.id,
      username: user.username,
      token,
    });
  }
}

export default new SessionsController();
