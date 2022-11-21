import { Router } from 'express';
import usersRouter from '@modules/users/http/routes/UsersRoutes';
import sessionsRouter from '@modules/users/http/routes/SessionsRoutes';
import transactionsRouter from '@modules/transactions/http/routes/TransactionsRoutes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/login', sessionsRouter);
routes.use('/users', transactionsRouter);

export default routes;
