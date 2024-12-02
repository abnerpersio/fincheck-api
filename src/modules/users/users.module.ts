import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserPrismaRepository } from './user.prisma.reposity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
  ],
})
export class UsersModule {}
