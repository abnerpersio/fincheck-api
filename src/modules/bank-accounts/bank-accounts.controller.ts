import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ActiveUserId } from '~shared/decorators/active-user-id';
import { UUIDParam } from '~shared/decorators/uuid-param';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

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

  @Put(':id')
  update(
    @ActiveUserId() userId: string,
    @UUIDParam('id') bankAccountId: string,
    @Body() data: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.update(userId, bankAccountId, data);
  }

  @Delete(':id')
  delete() {}
}
