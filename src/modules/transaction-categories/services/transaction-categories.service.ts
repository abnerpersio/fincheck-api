import { Injectable } from '@nestjs/common';
import { TransactionCategoryPrismaRepository } from '~database/repositories/transaction-category.prisma.repository';

@Injectable()
export class TransactionCategoriesService {
  constructor(private readonly repo: TransactionCategoryPrismaRepository) {}

  findAllByUserId(userId: string) {
    return this.repo.findAll(userId);
  }
}
