import { Injectable } from '@nestjs/common';
import { type Prisma, TransactionType, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

type CreateUserData = Prisma.UserCreateArgs['data'];

type CreateCategoryData = {
  name: string;
  icon: string;
  type: TransactionType;
};

@Injectable()
export class UserPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
      },
    });
  }

  async create(data: CreateUserData): Promise<User> {
    return this.prisma.user.create({
      data: data,
    });
  }

  async createCategories(userId: string, categories: CreateCategoryData[]): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        transactionCategories: {
          createMany: {
            data: categories,
          },
        },
      },
    });
  }
}
