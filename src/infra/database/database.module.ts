import { Global, Module } from '@nestjs/common';
import { UserPrismaRepository } from '~repositories/user.prisma.repository';
import { PrismaService } from './prisma.service';
import { BankAccountPrismaRepository } from './repositories/bank-account.prisma.repository';
import { TransactionCategoriesPrismaRepository } from './repositories/transaction-categories.prisma.repository';

@Module({
  providers: [
    PrismaService,
    UserPrismaRepository,
    TransactionCategoriesPrismaRepository,
    BankAccountPrismaRepository,
  ],
  exports: [
    UserPrismaRepository,
    TransactionCategoriesPrismaRepository,
    BankAccountPrismaRepository,
  ],
})
@Global()
export class DatabaseModule {}
