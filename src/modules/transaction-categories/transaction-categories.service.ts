import { Injectable } from '@nestjs/common';
import { TransactionCategoriesPrismaRepository } from '~database/repositories/transaction-categories.prisma.repository';

@Injectable()
export class TransactionCategoriesService {
  constructor(private readonly repo: TransactionCategoriesPrismaRepository) {}

  findAllByUserId(userId: string) {
    return this.repo.findAll(userId);
  }
}
