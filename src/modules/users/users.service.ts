import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Env } from '../../infra/config/env';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository.interface';

@Injectable()
export class UsersService {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository) {}

  async create(data: CreateUserDto) {
    const isAlreadyRegistered = await this.repo.findOneByEmail(data.email);

    if (!!isAlreadyRegistered) {
      throw new ConflictException('This email is already in use');
    }

    const hashedPassword = await hash(data.password, Env.get('PASSWORD_SALT'));

    const user = await this.repo.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return user;
  }
}
