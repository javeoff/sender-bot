import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';
import { VideoEntity } from '@sendByBot/Videos/entities/VideoEntity';

@Injectable()
export class VideosSetter {
  public constructor(
    @Inject(ProviderName.VIDEO_REPOSITORY)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  removeByVideoId(videoId: string): void {
    void this.videoRepository.delete({
      video_id: videoId,
    })
  }

  removeByVideoUniqueId(videoId: string): void {
    void this.videoRepository.delete({
      unique_video_id: videoId,
    })
  }

  add(item: VideoEntity) {
    void this.videoRepository.insert(item);
  }

  change(where: Partial<VideoEntity>, updateValue: Partial<VideoEntity>) {
    return this.videoRepository.update(where, updateValue);
  }
}
