import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SiginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
