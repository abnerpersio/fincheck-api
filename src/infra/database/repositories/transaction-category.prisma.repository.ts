import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionCategoryPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.transactionCategory.findMany({
      where: {
        userId,
      },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.transactionCategory.findFirst({
      where: {
        id,
        userId,
      },
    });
  }
}
