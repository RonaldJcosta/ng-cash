import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import ShowUserBalanceController from '../controllers/ShowUserBalanceController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import TransactionsUsersController from '../controllers/TransactionsUsersController';

const usersRouter = Router();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  UsersController.create,
);

usersRouter.get('/balance', isAuthenticated, ShowUserBalanceController.show);

usersRouter.post(
  '/balance',
  isAuthenticated,
  TransactionsUsersController.create,
);

export default usersRouter;
