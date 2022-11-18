import { Column, MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTransactions1668732105494 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'debited_account_id',
            type: 'uuid',
          },
          {
            name: 'credited_account_id',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'float',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'debitedAccountId',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['debited_account_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'creditedAccountId',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['credited_account_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
