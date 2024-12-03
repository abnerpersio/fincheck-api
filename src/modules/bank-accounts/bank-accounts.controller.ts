import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActiveUserId } from '~shared/decorators/active-user-id';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(@ActiveUserId() userId: string, @Body() data: CreateBankAccountDto) {
    return this.bankAccountsService.create(userId, data);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }
}
