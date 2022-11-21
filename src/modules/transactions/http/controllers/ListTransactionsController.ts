import ListTransactionsService from '@modules/transactions/services/ListTransactionsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListTransactionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {id} = request.user;
    console.log(id)

    const listTransactions = container.resolve(ListTransactionsService);

    const transactions = await listTransactions.execute( id );
    return response.status(200).json({ transactions });
  }
}

export default new ListTransactionsController();