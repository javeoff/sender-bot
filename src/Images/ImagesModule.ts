import { Module } from '@nestjs/common';
import { imageEntityProvider } from '@sendByBot/Images/providers/imageEntityProvider';
import { ImagesGetter } from '@sendByBot/Images/services/ImagesGetter';
import { ImagesSetter } from '@sendByBot/Images/services/ImagesSetter';
import { EncodingModule } from '@sendByBot/Encoding/EncodingModule';
import { ImagesController } from '@sendByBot/Images/ImagesController';
import { CacheModule } from '@sendByBot/Cache/CacheModule';

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
