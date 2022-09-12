import { Inject, Injectable } from '@nestjs/common';
import { ProviderName } from '../../Common/enums/ProviderName';
import { Equal, ILike, Repository } from 'typeorm';
import { VideoEntity } from '../entities/VideoEntity';

@Injectable()
export class VideosGetter {
  public constructor(
    @Inject(ProviderName.VIDEO_REPOSITORY)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  getById(userId: string, id: string): Promise<VideoEntity[]> {
    return this.videoRepository.findBy({
      user_id: Equal(userId),
      id: Equal(Number(id)),
    });
  }

  getByCode(userId: string, code: string): Promise<VideoEntity[]> {
    return this.videoRepository.findBy({
      user_id: Equal(userId),
      code: ILike(`${code}%`),
    });
  }

  getByUniqueId(userId: string, uniqueVideoId: string): Promise<VideoEntity[]> {
    return this.videoRepository.findBy({
      user_id: Equal(userId),
      unique_video_id: Equal(uniqueVideoId),
    });
  }

  async hasByUniqueId(userId: string, uniqueVideoId: string): Promise<boolean> {
    return (await this.getByUniqueId(userId, uniqueVideoId))?.length > 0;
  }

  getAll(userId: string): Promise<VideoEntity[]> {
    return this.videoRepository.findBy({
      user_id: Equal(userId),
    });
  }
}
