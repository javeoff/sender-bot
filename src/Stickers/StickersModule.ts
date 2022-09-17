import { Module } from '@nestjs/common';

import { CacheModule } from '@sendByBot/Cache/CacheModule';
import { EncodingModule } from '@sendByBot/Encoding/EncodingModule';
import { stickerEntityProvider } from '@sendByBot/Stickers/providers/stickerEntityProvider';
import { StickersGetter } from '@sendByBot/Stickers/services/StickersGetter';
import { StickersSetter } from '@sendByBot/Stickers/services/StickersSetter';
import { StickersController } from '@sendByBot/Stickers/StickersController';

@Module({
  providers: [
    stickerEntityProvider,
    StickersController,
    StickersGetter,
    StickersSetter,
  ],
  exports: [StickersController, StickersGetter, StickersSetter],
  imports: [EncodingModule, CacheModule],
})
export class StickersModule {}
