import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { TransactionType } from '../entities/transaction';

export class ListTransactionsFiltersDTO {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsNotEmpty()
  month: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsUUID()
  @IsOptional()
  bankAccountId?: string;

  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;
}
