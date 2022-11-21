import { Repository } from 'typeorm';
import { ICreateTransactions } from '../../domain/models/ICreateTransactions';
import { ITransactions } from '../../domain/models/ITransactions';
import { ITransactionsRepository } from '../../domain/repositories/ITransactionsRepository';
import Transactions from '../entities/Transactions';
import { dataSource } from '@shared/infra/typeorm';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transactions>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Transactions);
  }

  public async save(transactions: ITransactions): Promise<ITransactions> {
    await this.ormRepository.save(transactions);

    return transactions;
  }

  public async create({
    debitedAccountId,
    creditedAccountId,
    value
  }: ICreateTransactions): Promise<ITransactions> {
    const transactions = this.ormRepository.create({
      debitedAccountId,
      creditedAccountId,
      value
    });

    await this.ormRepository.save(transactions);

    return transactions;
  }
}

export default TransactionsRepository;
