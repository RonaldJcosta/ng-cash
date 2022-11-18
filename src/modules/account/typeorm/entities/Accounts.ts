import { IAccounts } from '@modules/account/domain/models/IAccounts';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
class Accounts implements IAccounts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  balance: number;
}

export default Accounts;
