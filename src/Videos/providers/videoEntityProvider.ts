import { ProviderName } from '../../Common/enums/ProviderName';
import { DataSource } from 'typeorm';
import { VideoEntity } from '../entities/VideoEntity';

export const videoEntityProvider = {
  provide: ProviderName.VIDEO_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(VideoEntity),
  inject: [ProviderName.DATA_SOURCE],
}
