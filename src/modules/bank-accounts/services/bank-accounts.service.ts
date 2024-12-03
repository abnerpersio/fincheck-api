import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountPrismaRepository } from '~database/repositories/bank-account.prisma.repository';
import { CreateBankAccountDTO } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDTO } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly repo: BankAccountPrismaRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  findAllByUserId(userId: string) {
    return this.repo.findAll({ userId });
  }

  create(userId: string, data: CreateBankAccountDTO) {
    const { name, color, type, initialBalance } = data;

    return this.repo.create({
      name,
      color,
      type,
      initialBalance,
      userId,
    });
  }

  async update(userId: string, bankAccountId: string, data: UpdateBankAccountDTO) {
    const { name, color, type, initialBalance } = data;

    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    return this.repo.update(bankAccountId, {
      name,
      color,
      type,
      initialBalance,
    });
  }

  async delete(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    await this.repo.delete(bankAccountId);
  }
}
