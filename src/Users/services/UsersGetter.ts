import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { UserEntity } from '@sendByBot/Users/entities/UserEntity';

@Injectable()
export class UsersGetter {
  public constructor(
    @Inject(ProviderName.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async has(userId: string): Promise<boolean> {
    return !!(await this.userRepository.findOneBy({
      user_id: userId,
    }));
  }
}
