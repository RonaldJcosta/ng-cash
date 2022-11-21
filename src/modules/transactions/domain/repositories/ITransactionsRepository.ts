import {ITransactions} from '../models/ITransactions';
import {ICreateTransactions} from '../models/ICreateTransactions';

export interface ITransactionsRepository {
    save(transactions: ITransactions): Promise<ITransactions>;
    create(data: ICreateTransactions): Promise<ITransactions>;
}