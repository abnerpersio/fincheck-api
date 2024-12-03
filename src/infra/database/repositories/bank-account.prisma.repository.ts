import { Injectable } from '@nestjs/common';
import { type Prisma, BankAccount } from '@prisma/client';
import { PrismaService } from '../prisma.service';

type CreateBankAccountData = Prisma.BankAccountCreateArgs['data'];
type UpdateBankAccountData = Prisma.BankAccountUpdateArgs['data'];

@Injectable()
export class BankAccountPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(where: Prisma.BankAccountFindManyArgs['where']): Promise<BankAccount[]> {
    return this.prisma.bankAccount.findMany({ where });
  }

  async findById(userId: string, id: string): Promise<BankAccount | null> {
    return this.prisma.bankAccount.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async create(data: CreateBankAccountData): Promise<BankAccount> {
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
}
