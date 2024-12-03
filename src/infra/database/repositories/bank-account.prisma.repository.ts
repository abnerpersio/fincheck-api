import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

type CreateBankAccountData = Prisma.BankAccountCreateArgs['data'];
type UpdateBankAccountData = Prisma.BankAccountUpdateArgs['data'];

type FindOptions = {
  include?: Prisma.BankAccountFindManyArgs['include'];
};

@Injectable()
export class BankAccountPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(where: Prisma.BankAccountFindManyArgs['where'], options?: FindOptions) {
    return this.prisma.bankAccount.findMany({ where, include: options?.include });
  }

  async findById(userId: string, id: string) {
    return this.prisma.bankAccount.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async create(data: CreateBankAccountData) {
    return this.prisma.bankAccount.create({
      data: data,
    });
  }

  async update(id: string, data: UpdateBankAccountData) {
    return this.prisma.bankAccount.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.bankAccount.delete({
      where: { id },
    });
  }
}
