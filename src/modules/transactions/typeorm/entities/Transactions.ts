import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ITransactions } from "../../domain/models/ITransactions";

@Entity('transactions')
class Transactions implements ITransactions{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'debited_account_id'})
    debitedAccountId: string;

    @Column({name: 'credited_account_id'})
    creditedAccountId: string;

    @Column()
    value: number;
    
    @Column()
    createdAt: Date;
}

export default Transactions;