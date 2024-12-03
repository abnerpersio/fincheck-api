import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountPrismaRepository } from '~database/repositories/bank-account.prisma.repository';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(private readonly repo: BankAccountPrismaRepository) {}

  findAllByUserId(userId: string) {
    return this.repo.findAll({ userId });
  }

  create(userId: string, data: CreateBankAccountDto) {
    const { name, color, type, initialBalance } = data;

    return this.repo.create({
      name,
      color,
      type,
      initialBalance,
      userId,
    });
  }

  async update(userId: string, bankAccountId: string, data: UpdateBankAccountDto) {
    const { name, color, type, initialBalance } = data;

    await this.validateBankAccountOwnership(userId, bankAccountId);

    return this.repo.update(bankAccountId, {
      name,
      color,
      type,
      initialBalance,
    });
  }

  async delete(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    await this.repo.delete(bankAccountId);
  }

  private async validateBankAccountOwnership(userId: string, bankAccountId: string) {
    const exists = await this.repo.findById(userId, bankAccountId);

    if (!exists) {
      throw new NotFoundException('Bank account not found');
    }

    return true;
  }
}
