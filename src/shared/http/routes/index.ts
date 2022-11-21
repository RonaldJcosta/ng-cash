import { Router } from 'express';
import usersRouter from '@modules/users/http/routes/UsersRoutes';
import sessionsRouter from '@modules/users/http/routes/SessionsRoutes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/login', sessionsRouter);

export default routes;
