import { ProviderName } from '../../Common/enums/ProviderName';
import { DataSource } from 'typeorm';
import { ImageEntity } from '../entities/ImageEntity';

export const imageEntityProvider = {
  provide: ProviderName.IMAGE_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(ImageEntity),
  inject: [ProviderName.DATA_SOURCE],
}
