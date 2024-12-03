import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionCategoryPrismaRepository } from '~database/repositories/transaction-category.prisma.repository';

@Injectable()
export class ValidateTransactionCategoryOwnershipService {
  constructor(private readonly repo: TransactionCategoryPrismaRepository) {}

  async validate(userId: string, categoryId: string) {
    const exists = await this.repo.findById(userId, categoryId);

    if (!exists) {
      throw new NotFoundException('Category not found');
    }

    return true;
  }
}
