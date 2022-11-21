import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import ListTransactionsController from '../controllers/ListTransactionsController';

const transactionsRouter = Router();

transactionsRouter.get('/transactions', isAuthenticated, ListTransactionsController.index);

export default transactionsRouter;
