import Accounts from '@modules/account/typeorm/entities/Accounts';
import Transactions from '@modules/transactions/typeorm/entities/Transactions';
import User from '@modules/users/typeorm/entities/User';
import { DataSource } from 'typeorm';
import { CreateUsers1669149364433 } from './migrations/1669149364433-CreateUsers';
import { CreateAccounts1668728080450 } from './migrations/1668728080450-CreateAccounts';
import { CreateTransactions1668732105494 } from './migrations/1668732105494-CreateTransactions';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ngcash',
  entities: [User, Accounts, Transactions],
  migrations: [
    CreateAccounts1668728080450,
    CreateUsers1669149364433,
    CreateTransactions1668732105494,
  ],
});
