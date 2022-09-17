import { Module } from '@nestjs/common';

import { CacheModule } from '@sendByBot/Cache/CacheModule';
import { ImagesModule } from '@sendByBot/Images/ImagesModule';
import { InlineKeyboardModule } from '@sendByBot/InlineKeyboard/InlineKeyboardModule';
import { RenameCodeScene } from '@sendByBot/Scenes/scenes/RenameCodeScene';
import { SendPhotoScene } from '@sendByBot/Scenes/scenes/SendPhotoScene';
import { SendStickerScene } from '@sendByBot/Scenes/scenes/SendStickerScene';
import { SendVideoScene } from '@sendByBot/Scenes/scenes/SendVideoScene';
import { SceneLocaleService } from '@sendByBot/Scenes/services/SceneLocaleService';
import { StickersModule } from '@sendByBot/Stickers/StickersModule';
import { VideosModule } from '@sendByBot/Videos/VideosModule';

@Module({
  providers: [
    SendPhotoScene,
    SendStickerScene,
    SendVideoScene,
    RenameCodeScene,
    SceneLocaleService,
  ],
  imports: [
    StickersModule,
    ImagesModule,
    VideosModule,
    CacheModule,
    InlineKeyboardModule,
  ],
})
export class SceneModule {}
