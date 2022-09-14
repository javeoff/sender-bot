import { Inject, Injectable } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';
import { UserEntity } from '../entities/UserEntity';
import { ProviderName } from '../../Common/enums/ProviderName';

@Injectable()
export class UsersSetter {
  constructor(
    @Inject(ProviderName.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  add(item: UserEntity): Promise<InsertResult> {
    return this.userRepository.insert(item);
  }
}
