import { Injectable } from '@nestjs/common';
import { TransactionPrismaRepository } from '~database/repositories/transaction.prisma.repository';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateTransactionCategoryOwnershipService } from '../transaction-categories/services/validate-transaction-category-ownership.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

type ValidateOwnershipData = {
  userId: string;
  bankAccountId: string;
  categoryId: string;
};

@Injectable()
export class TransactionsService {
  constructor(
    private readonly repo: TransactionPrismaRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateTransactionCategoryOwnershipService: ValidateTransactionCategoryOwnershipService,
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

  update(id: number, data: UpdateTransactionDto) {}

  delete(id: number) {}

  private async validateOwernership(data: ValidateOwnershipData) {
    const { userId, bankAccountId, categoryId } = data;

    await Promise.all([
      this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      this.validateTransactionCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
