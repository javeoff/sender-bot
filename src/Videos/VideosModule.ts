import { Module } from '@nestjs/common';
import { VideosController } from './VideosController';
import { videoEntityProvider } from './providers/videoEntityProvider';
import { VideosSetter } from './services/VideosSetter';
import { VideosGetter } from './services/VideosGetter';
import { EncodingModule } from '../Encoding/EncodingModule';
import { CacheModule } from '../Cache/CacheModule';

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
