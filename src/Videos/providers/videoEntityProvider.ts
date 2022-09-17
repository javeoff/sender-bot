import { DataSource } from 'typeorm';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { VideoEntity } from '@sendByBot/Videos/entities/VideoEntity';

export const videoEntityProvider = {
  provide: ProviderName.VIDEO_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(VideoEntity),
  inject: [ProviderName.DATA_SOURCE],
}
