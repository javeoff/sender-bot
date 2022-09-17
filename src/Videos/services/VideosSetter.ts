import { Inject, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { VideoEntity } from '@sendByBot/Videos/entities/VideoEntity';

@Injectable()
export class VideosSetter {
  public constructor(
    @Inject(ProviderName.VIDEO_REPOSITORY)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  public removeByVideoUniqueId(videoId: string): void {
    void this.videoRepository.delete({
      unique_video_id: videoId,
    });
  }

  public add(item: VideoEntity): void {
    void this.videoRepository.insert(item);
  }

  public change(
    where: Partial<VideoEntity>,
    updateValue: Partial<VideoEntity>,
  ): Promise<UpdateResult> {
    return this.videoRepository.update(where, updateValue);
  }
}
