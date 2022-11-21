import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import UsersRepository from "@modules/users/typeorm/repositories/UsersRepository";
import { inject, injectable } from "tsyringe";
import { ITransactions } from "../domain/models/ITransactions";
import { ITransactionsRepository } from "../domain/repositories/ITransactionsRepository";
import TransactionsRepository from "../typeorm/repositories/TransactionsRepository";


@injectable()
class ListTransactionsService {
    constructor(
        @inject(UsersRepository)
        private usersRepository: IUsersRepository,

        @inject(TransactionsRepository)
        private transactionsRepository: ITransactionsRepository,
    ){}

    public async execute(id: string): Promise<ITransactions[]> {
        const user = await this.usersRepository.findById(id);
        return await this.transactionsRepository.findTransactions(user.accountId);
    }
}

export default ListTransactionsService;

