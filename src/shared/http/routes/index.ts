import { Router } from 'express';
import usersRouter from '@modules/users/http/routes/UsersRoutes';

const routes = Router();

routes.use('/users', usersRouter);

export default routes;
