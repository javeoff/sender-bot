import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Query = (...queries: string[]): CustomDecorator =>
  SetMetadata('queries', queries);
