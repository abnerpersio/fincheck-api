import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActiveUserId } from '~shared/decorators/active-user-id';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.transactionsService.findAllByUserId(userId);
  }

  @Post()
  create(@ActiveUserId() userId: string, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionsService.delete(+id);
  }
}
