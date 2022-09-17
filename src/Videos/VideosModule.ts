import { Module } from '@nestjs/common';

import { CacheModule } from '@sendByBot/Cache/CacheModule';
import { EncodingModule } from '@sendByBot/Encoding/EncodingModule';
import { videoEntityProvider } from '@sendByBot/Videos/providers/videoEntityProvider';
import { VideosGetter } from '@sendByBot/Videos/services/VideosGetter';
import { VideosSetter } from '@sendByBot/Videos/services/VideosSetter';
import { VideosController } from '@sendByBot/Videos/VideosController';

@Module({
  providers: [
    videoEntityProvider,
    VideosController,
    VideosSetter,
    VideosGetter,
  ],
  exports: [VideosController, VideosSetter, VideosGetter],
  imports: [EncodingModule, CacheModule],
})
export class VideosModule {}
