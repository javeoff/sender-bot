import { Module } from '@nestjs/common';
import { StickersController } from '@sendByBot/Stickers/StickersController';
import { StickersSetter } from '@sendByBot/Stickers/services/StickersSetter';
import { StickersGetter } from '@sendByBot/Stickers/services/StickersGetter';
import { stickerEntityProvider } from '@sendByBot/Stickers/providers/stickerEntityProvider';
import { EncodingModule } from '@sendByBot/Encoding/EncodingModule';
import { CacheModule } from '@sendByBot/Cache/CacheModule';

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
