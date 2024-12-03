import { Injectable } from '@nestjs/common';
import { TransactionCategory } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionCategoriesPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string): Promise<TransactionCategory[]> {
    return this.prisma.transactionCategory.findMany({
      where: {
        userId,
      },
    });
  }
}
