import { IUser } from '@modules/users/domain/models/IUser';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: 'account_id' })
  accountId: string;
}

export default User;
