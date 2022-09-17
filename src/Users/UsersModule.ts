import { Module } from '@nestjs/common';

import { userEntityProvider } from '@sendByBot/Users/providers/userEntityProvider';
import { UsersGetter } from '@sendByBot/Users/services/UsersGetter';
import { UsersSetter } from '@sendByBot/Users/services/UsersSetter';

@Module({
  providers: [userEntityProvider, UsersSetter, UsersGetter],
  exports: [UsersSetter, UsersGetter],
})
export class UsersModule {}
