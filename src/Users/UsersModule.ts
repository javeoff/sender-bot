import { Module } from '@nestjs/common';
import { UsersSetter } from '@sendByBot/Users/services/UsersSetter';
import { userEntityProvider } from '@sendByBot/Users/providers/userEntityProvider';
import { UsersGetter } from '@sendByBot/Users/services/UsersGetter';

@Module({
  providers: [
    userEntityProvider,
    UsersSetter,
    UsersGetter,
  ],
  exports: [
    UsersSetter,
    UsersGetter,
  ]
})
export class UsersModule {}
