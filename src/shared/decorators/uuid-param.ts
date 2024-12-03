import { Param, ParseUUIDPipe } from '@nestjs/common';

export function UUIDParam(name: string) {
  return Param(name, new ParseUUIDPipe());
}
