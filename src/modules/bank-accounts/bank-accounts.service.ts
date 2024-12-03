import { Injectable } from '@nestjs/common';
import { BankAccountPrismaRepository } from '~database/repositories/bank-account.prisma.repository';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(private readonly repo: BankAccountPrismaRepository) {}

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

  findAllByUserId(userId: string) {
    return this.repo.findAll({ userId });
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }
}
