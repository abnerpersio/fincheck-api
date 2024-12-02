import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

export interface UserRepository {
  findOneByEmail: (email: string) => Promise<User | null>;
  create: (data: CreateUserDto) => Promise<User>;
}
