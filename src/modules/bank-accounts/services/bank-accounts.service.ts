import { Injectable } from '@nestjs/common';
import { TransactionType } from '~/modules/transactions/entities/transaction';
import { BankAccountPrismaRepository } from '~database/repositories/bank-account.prisma.repository';
import { CreateBankAccountDTO } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDTO } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly repo: BankAccountPrismaRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.repo.findAll(
      { userId },
      {
        include: {
          transactions: {
            select: {
              type: true,
              value: true,
            },
          },
        },
      },
    );

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce((acc, transaction) => {
        const value = transaction.value || 0;
        return acc + (transaction.type === TransactionType.INCOME ? value : -value);
      }, 0);

      return {
        id: bankAccount.id,
        name: bankAccount.name,
        color: bankAccount.color,
        type: bankAccount.type,
        initialBalance: bankAccount.initialBalance,
        currentBalance: bankAccount.initialBalance + totalTransactions,
      };
    });
  }

  async create(userId: string, data: CreateBankAccountDTO) {
    const { name, color, type, initialBalance } = data;

    return this.repo.create({
      name,
      color,
      type,
      initialBalance,
      userId,
    });
  }

  async update(userId: string, bankAccountId: string, data: UpdateBankAccountDTO) {
    const { name, color, type, initialBalance } = data;

    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    return this.repo.update(bankAccountId, {
      name,
      color,
      type,
      initialBalance,
    });
  }

  async delete(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    await this.repo.delete(bankAccountId);
  }
}
