import { Module } from '@nestjs/common';
import { ImagesController } from './ImagesController';
import { imageEntityProvider } from './providers/imageEntityProvider';
import { ImagesGetter } from './services/ImagesGetter';
import { ImagesSetter } from './services/ImagesSetter';
import { EncodingModule } from '../Encoding/EncodingModule';
import { CacheModule } from '../Cache/CacheModule';

@Module({
  providers: [
    imageEntityProvider,
    ImagesController,
    ImagesGetter,
    ImagesSetter,
  ],
  exports: [
    ImagesController,
    ImagesGetter,
    ImagesSetter,
  ],
  imports: [
    EncodingModule,
    CacheModule,
  ]
})
export class ImagesModule {}
