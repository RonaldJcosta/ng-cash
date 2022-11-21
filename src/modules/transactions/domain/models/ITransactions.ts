export interface ITransactions {
  id: string;
  debitedAccountId: string;
  creditedAccountId: string;
  value: number;
  createdAt: Date;
}
