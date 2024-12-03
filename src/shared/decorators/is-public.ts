import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '~infra/config/constants';

export function IsPublic() {
  return SetMetadata(IS_PUBLIC_KEY, true);
}
