import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionPrismaRepository } from '~database/repositories/transaction.prisma.repository';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly repo: TransactionPrismaRepository) {}

  async validate(userId: string, transactionId: string) {
    const exists = await this.repo.findById(userId, transactionId);

    if (!exists) {
      throw new NotFoundException('Transaction not found');
    }

    return true;
  }
}
