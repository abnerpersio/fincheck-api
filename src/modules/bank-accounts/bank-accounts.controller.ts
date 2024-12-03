import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { ActiveUserId } from '~shared/decorators/active-user-id';
import { UUIDParam } from '~shared/decorators/uuid-param';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsService } from './services/bank-accounts.service';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @Post()
  create(@ActiveUserId() userId: string, @Body() data: CreateBankAccountDto) {
    return this.bankAccountsService.create(userId, data);
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
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@ActiveUserId() userId: string, @UUIDParam('id') bankAccountId: string) {
    return this.bankAccountsService.delete(userId, bankAccountId);
  }
}
