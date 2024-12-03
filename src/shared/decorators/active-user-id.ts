import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined, ExecutionContext, string>(
  (_, input) => {
    const request = input.switchToHttp().getRequest();
    const userId = request.userId;

    if (!userId) {
      throw new UnauthorizedException();
    }

    return userId;
  },
);
