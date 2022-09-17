import { Inject, Injectable } from '@nestjs/common';
import { Equal, ILike, Repository } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { VideoEntity } from '@sendByBot/Videos/entities/VideoEntity';

@Injectable()
export class VideosGetter {
  public constructor(
    @Inject(ProviderName.VIDEO_REPOSITORY)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  public getById(userId: string, id: string): Promise<VideoEntity[]> {
    return this.videoRepository.findBy({
      user_id: Equal(userId),
      id: Equal(Number(id)),
    });
  }

  public getByCode(userId: string, code: string): Promise<VideoEntity[]> {
    return this.videoRepository.findBy({
      user_id: Equal(userId),
      code: ILike(`${code}%`),
    });
  }

  public getByUniqueId(
    userId: string,
    uniqueVideoId: string,
  ): Promise<VideoEntity[]> {
    return this.videoRepository.findBy({
      user_id: Equal(userId),
      unique_video_id: Equal(uniqueVideoId),
    });
  }

  public async hasByUniqueId(
    userId: string,
    uniqueVideoId: string,
  ): Promise<boolean> {
    const result = await this.getByUniqueId(userId, uniqueVideoId);

    return result?.length > 0;
  }
}
