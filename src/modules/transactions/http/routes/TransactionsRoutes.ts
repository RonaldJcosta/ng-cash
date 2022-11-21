import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import ListTransactionsController from '../controllers/ListTransactionsController';

const transactionsRouter = Router();

transactionsRouter.get('/', isAuthenticated, ListTransactionsController.index);

export default transactionsRouter;
