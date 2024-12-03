import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BankAccountType } from '../entities/bank-account';

export class CreateBankAccountDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(BankAccountType)
  @IsNotEmpty()
  type: BankAccountType;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;
}
