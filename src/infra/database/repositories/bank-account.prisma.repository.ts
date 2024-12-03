import { Injectable } from '@nestjs/common';
import { type Prisma, BankAccount } from '@prisma/client';
import { PrismaService } from '../prisma.service';

type CreateBankAccountData = Prisma.BankAccountCreateArgs['data'];

@Injectable()
export class BankAccountPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBankAccountData): Promise<BankAccount> {
    return this.prisma.bankAccount.create({
      data: data,
    });
  }

  async findAll(where: Prisma.BankAccountFindManyArgs['where']): Promise<BankAccount[]> {
    return this.prisma.bankAccount.findMany({ where });
  }
}
