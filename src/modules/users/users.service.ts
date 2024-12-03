import { Injectable } from '@nestjs/common';
import { UserPrismaRepository } from '~repositories/user.prisma.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UserPrismaRepository) {}

  getUserById(userId: string) {
    return this.repo.findById(userId);
  }
}
