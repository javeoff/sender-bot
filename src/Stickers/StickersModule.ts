import { Module } from '@nestjs/common';
import { StickersController } from './StickersController';
import { stickerEntityProvider } from './providers/stickerEntityProvider';
import { StickersGetter } from './services/StickersGetter';
import { StickersSetter } from './services/StickersSetter';
import { EncodingModule } from '../Encoding/EncodingModule';
import { CacheModule } from '../Cache/CacheModule';

@Module({
  providers: [
    stickerEntityProvider,
    StickersController,
    StickersGetter,
    StickersSetter,
  ],
  exports: [
    StickersController,
    StickersGetter,
    StickersSetter,
  ],
  imports: [
    EncodingModule,
    CacheModule,
  ]
})
export class StickersModule {}
