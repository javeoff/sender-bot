import { Module } from '@nestjs/common';
import { userEntityProvider } from './providers/userEntityProvider';
import { UsersSetter } from './services/UsersSetter';
import { UsersGetter } from './services/UsersGetter';

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
