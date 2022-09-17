import { Inject, Injectable } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { UserEntity } from '@sendByBot/Users/entities/UserEntity';

@Injectable()
export class UsersSetter {
  public constructor(
    @Inject(ProviderName.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public add(item: UserEntity): Promise<InsertResult> {
    return this.userRepository.insert(item);
  }
}
