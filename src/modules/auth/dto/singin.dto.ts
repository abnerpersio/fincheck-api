import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SiginDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
