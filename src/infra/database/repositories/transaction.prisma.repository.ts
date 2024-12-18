import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

type CreateTransactionData = Prisma.TransactionCreateArgs['data'];
type UpdateTransactionData = Prisma.TransactionUpdateArgs['data'];

type FindOptions = {
  include?: Prisma.TransactionFindManyArgs['include'];
};

@Injectable()
export class TransactionPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(where: Prisma.TransactionFindManyArgs['where'], options?: FindOptions) {
    return this.prisma.transaction.findMany({ where, include: options?.include });
  }

  async findById(userId: string, id: string) {
    return this.prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async create(data: CreateTransactionData) {
    return this.prisma.transaction.create({
      data,
    });
  }

  async update(id: string, data: UpdateTransactionData) {
    return this.prisma.transaction.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
