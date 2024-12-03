import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountPrismaRepository } from '~database/repositories/bank-account.prisma.repository';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly repo: BankAccountPrismaRepository) {}

  async validate(userId: string, bankAccountId: string) {
    const exists = await this.repo.findById(userId, bankAccountId);

    if (!exists) {
      throw new NotFoundException('Bank account not found');
    }

    return true;
  }
}
