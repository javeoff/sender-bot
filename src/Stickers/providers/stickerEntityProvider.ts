import { DataSource, Repository } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { StickerEntity } from '@sendByBot/Stickers/entities/StickerEntity';

export const stickerEntityProvider = {
  provide: ProviderName.STICKER_REPOSITORY,
  useFactory: (dataSource: DataSource): Repository<StickerEntity> =>
    dataSource.getRepository(StickerEntity),
  inject: [ProviderName.DATA_SOURCE],
};
