import { Injectable } from '@nestjs/common';
import { TransactionPrismaRepository } from '~database/repositories/transaction.prisma.repository';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateTransactionCategoryOwnershipService } from '../../transaction-categories/services/validate-transaction-category-ownership.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

type ValidateOwnershipData = {
  userId: string;
  bankAccountId?: string;
  categoryId?: string;
  transactionId?: string;
};

@Injectable()
export class TransactionsService {
  constructor(
    private readonly repo: TransactionPrismaRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateTransactionCategoryOwnershipService: ValidateTransactionCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  findAllByUserId(userId: string) {
    return this.repo.findAll({ userId });
  }

  async create(userId: string, data: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, description, type, value } = data;

    await this.validateOwernership({ userId, bankAccountId, categoryId });

    return this.repo.create({
      date,
      description,
      type,
      value,
      bankAccountId,
      categoryId,
      userId,
    });
  }

  async update(userId: string, transactionId: string, data: UpdateTransactionDto) {
    const { bankAccountId, categoryId, date, description, type, value } = data;

    await this.validateOwernership({ userId, bankAccountId, categoryId, transactionId });

    return this.repo.update(transactionId, {
      date,
      description,
      type,
      value,
    });
  }

  async delete(userId: string, transactionId: string) {
    await this.validateOwernership({ userId, transactionId });

    await this.repo.delete(transactionId);
  }

  private async validateOwernership(data: ValidateOwnershipData) {
    const { userId, bankAccountId, categoryId, transactionId } = data;

    await Promise.all([
      transactionId && this.validateTransactionOwnershipService.validate(userId, transactionId),
      bankAccountId && this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      categoryId && this.validateTransactionCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
