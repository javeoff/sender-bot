import { Module } from '@nestjs/common';
import { ImagesController } from './ImagesController';
import { imageEntityProvider } from './providers/imageEntityProvider';
import { ImagesGetter } from './services/ImagesGetter';
import { ImagesSetter } from './services/ImagesSetter';
import { EncodingModule } from '../Encoding/EncodingModule';
import { ImagesSender } from './services/ImagesSender';
import { CacheModule } from '../Cache/CacheModule';

@Module({
  providers: [
    imageEntityProvider,
    ImagesController,
    ImagesGetter,
    ImagesSetter,
    ImagesSender,
  ],
  exports: [
    ImagesController,
    ImagesGetter,
    ImagesSetter,
    ImagesSender,
  ],
  imports: [
    EncodingModule,
    CacheModule,
  ]
})
export class ImagesModule {}
