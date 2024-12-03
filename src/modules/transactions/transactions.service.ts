import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  create(data: CreateTransactionDto) {}

  findAll() {}

  update(id: number, data: UpdateTransactionDto) {}

  delete(id: number) {}
}
