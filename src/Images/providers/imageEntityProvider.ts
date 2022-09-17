import { DataSource } from 'typeorm';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { ImageEntity } from '@sendByBot/Images/entities/ImageEntity';

export const imageEntityProvider = {
  provide: ProviderName.IMAGE_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(ImageEntity),
  inject: [ProviderName.DATA_SOURCE],
}
