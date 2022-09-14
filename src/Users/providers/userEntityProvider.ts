import { ProviderName } from '../../Common/enums/ProviderName';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/UserEntity';

export const userEntityProvider = {
  provide: ProviderName.USER_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
  inject: [ProviderName.DATA_SOURCE],
}
