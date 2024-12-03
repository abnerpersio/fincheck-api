import { BadRequestException, Param, ParseUUIDPipe } from '@nestjs/common';

export function UUIDParam(name: string) {
  return Param(
    name,
    new ParseUUIDPipe({
      exceptionFactory: () => new BadRequestException('Invalid UUID param'),
    }),
  );
}
