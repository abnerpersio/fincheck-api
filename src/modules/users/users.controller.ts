import { Controller, Get } from '@nestjs/common';
import { ActiveUserId } from '~shared/decorators/active-user-id';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async me(@ActiveUserId() userId: string) {
    const user = await this.usersService.getUserById(userId);

    return {
      name: user.name,
      email: user.email,
    };
  }
}
