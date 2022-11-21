import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ShowUserBalanceController from '../controllers/ShowUserBalanceController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const authUsersRouter = Router();

authUsersRouter.get(
  '/auth',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      username: Joi.string().required(),
    },
  }),
  ShowUserBalanceController.show,
);

export default authUsersRouter;
