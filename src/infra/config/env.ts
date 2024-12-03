import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class EnvDTO {
  port: number;

  passwordSaltLength: string;

  @IsString()
  @IsNotEmpty()
  jwtSecret: string;
  jwtExpiresIn: string;
}

export const env: EnvDTO = plainToInstance(EnvDTO, {
  port: process.env.PORT ? parseInt(process.env.PORT) : 8000,

  passwordSaltLength: process.env.PASSWORD_SALT_LENGTH
    ? parseInt(process.env.PASSWORD_SALT_LENGTH)
    : 10,

  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtSecret: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length) {
  const message = JSON.stringify(errors, null, 2);
  throw new Error(message);
}
