import { Module } from '@nestjs/common';
import { InlineKeyboardModule } from '@sendByBot/InlineKeyboard/InlineKeyboardModule';
import { RenameCodeScene } from '@sendByBot/Scenes/scenes/RenameCodeScene';
import { SendStickerScene } from '@sendByBot/Scenes/scenes/SendStickerScene';
import { SendPhotoScene } from '@sendByBot/Scenes/scenes/SendPhotoScene';
import { StickersModule } from '@sendByBot/Stickers/StickersModule';
import { SceneLocaleService } from '@sendByBot/Scenes/services/SceneLocaleService';
import { ImagesModule } from '@sendByBot/Images/ImagesModule';
import { SendVideoScene } from '@sendByBot/Scenes/scenes/SendVideoScene';
import { VideosModule } from '@sendByBot/Videos/VideosModule';
import { CacheModule } from '@sendByBot/Cache/CacheModule';

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
