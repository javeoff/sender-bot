import { DataSource } from 'typeorm';
import { StickerEntity } from '../entities/StickerEntity';
import { ProviderName } from '../../Common/enums/ProviderName';

export const stickerEntityProvider = {
  provide: ProviderName.STICKER_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(StickerEntity),
  inject: [ProviderName.DATA_SOURCE],
}
