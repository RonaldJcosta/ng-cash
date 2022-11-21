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

  public async findTransactions(id: string): Promise<ITransactions[]> {
    const transactions = await this.ormRepository.query(`
      select accounts.id, transactions.debited_account_id , transactions.credited_account_id, transactions.value, transactions.created_at 
      from accounts
      inner join transactions ON transactions.debited_account_id = accounts.id or transactions.credited_account_id = accounts.id
      where accounts.id = $1
    `, [id]); 
    return transactions;
  }
}

export default TransactionsRepository;
