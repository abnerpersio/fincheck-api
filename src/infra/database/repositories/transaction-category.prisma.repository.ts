import { Injectable } from '@nestjs/common';
import { TransactionCategory } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionCategoryPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string): Promise<TransactionCategory[]> {
    return this.prisma.transactionCategory.findMany({
      where: {
        userId,
      },
    });
  }

  async findById(userId: string, id: string): Promise<TransactionCategory | null> {
    return this.prisma.transactionCategory.findFirst({
      where: {
        id,
        userId,
      },
    });
  }
}
