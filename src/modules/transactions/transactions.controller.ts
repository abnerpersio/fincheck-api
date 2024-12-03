import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ActiveUserId } from '~shared/decorators/active-user-id';
import { UUIDParam } from '~shared/decorators/uuid-param';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { ListTransactionsFiltersDTO } from './dto/list-transaction-filters.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(@ActiveUserId() userId: string, @Query() filters: ListTransactionsFiltersDTO) {
    return this.transactionsService.findAllByUserId(userId, filters);
  }

  @Post()
  create(@ActiveUserId() userId: string, @Body() data: CreateTransactionDTO) {
    return this.transactionsService.create(userId, data);
  }

  @Put(':id')
  update(
    @ActiveUserId() userId: string,
    @UUIDParam('id') transactionId: string,
    @Body() data: UpdateTransactionDTO,
  ) {
    return this.transactionsService.update(userId, transactionId, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@ActiveUserId() userId: string, @UUIDParam('id') transactionId: string) {
    return this.transactionsService.delete(userId, transactionId);
  }
}
