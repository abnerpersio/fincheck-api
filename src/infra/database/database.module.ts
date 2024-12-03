import { Global, Module } from '@nestjs/common';
import { UserPrismaRepository } from '~repositories/user.prisma.repository';
import { PrismaService } from './prisma.service';
import { BankAccountPrismaRepository } from './repositories/bank-account.prisma.repository';
import { TransactionCategoryPrismaRepository } from './repositories/transaction-category.prisma.repository';
import { TransactionPrismaRepository } from './repositories/transaction.prisma.repository';

@Module({
  providers: [
    PrismaService,
    UserPrismaRepository,
    BankAccountPrismaRepository,
    TransactionCategoryPrismaRepository,
    TransactionPrismaRepository,
  ],
  exports: [
    UserPrismaRepository,
    BankAccountPrismaRepository,
    TransactionCategoryPrismaRepository,
    TransactionPrismaRepository,
  ],
})
@Global()
export class DatabaseModule {}
