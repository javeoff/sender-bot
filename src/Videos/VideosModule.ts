import { Module } from '@nestjs/common';
import { VideosController } from '@sendByBot/Videos/VideosController';
import { VideosGetter } from '@sendByBot/Videos/services/VideosGetter';
import { VideosSetter } from '@sendByBot/Videos/services/VideosSetter';
import { videoEntityProvider } from '@sendByBot/Videos/providers/videoEntityProvider';
import { EncodingModule } from '@sendByBot/Encoding/EncodingModule';
import { CacheModule } from '@sendByBot/Cache/CacheModule';

@Module({
  providers: [
    videoEntityProvider,
    VideosController,
    VideosSetter,
    VideosGetter,
  ],
  exports: [
    VideosController,
    VideosSetter,
    VideosGetter,
  ],
  imports: [
    EncodingModule,
    CacheModule,
  ]
})
export class VideosModule {}
