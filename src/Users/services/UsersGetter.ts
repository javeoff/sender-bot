import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/UserEntity';
import { ProviderName } from '../../Common/enums/ProviderName';

@Injectable()
export class UsersGetter {
  constructor(
    @Inject(ProviderName.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async has(userId: string): Promise<boolean> {
    return !!await this.userRepository.findOneBy({
      user_id: userId,
    })
  }
}
