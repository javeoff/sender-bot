import { DataSource } from 'typeorm';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { UserEntity } from '@sendByBot/Users/entities/UserEntity';

export const userEntityProvider = {
  provide: ProviderName.USER_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
  inject: [ProviderName.DATA_SOURCE],
}
