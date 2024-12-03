import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from '~shared/decorators/active-user-id';
import { UUIDParam } from '~shared/decorators/uuid-param';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.transactionsService.findAllByUserId(userId);
  }

  @Post()
  create(@ActiveUserId() userId: string, @Body() data: CreateTransactionDto) {
    return this.transactionsService.create(userId, data);
  }

  @Put(':id')
  update(
    @ActiveUserId() userId: string,
    @UUIDParam('id') transactionId: string,
    @Body() data: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(userId, transactionId, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@ActiveUserId() userId: string, @UUIDParam('id') transactionId: string) {
    return this.transactionsService.delete(userId, transactionId);
  }
}
