import { Module } from '@nestjs/common';
import { SendPhotoScene } from './scenes/SendPhotoScene';
import { SceneLocaleService } from './services/SceneLocaleService';
import { SendStickerScene } from './scenes/SendStickerScene';
import { StickersModule } from '../Stickers/StickersModule';
import { ImagesModule } from '../Images/ImagesModule';
import { VideosModule } from '../Videos/VideosModule';
import { SendVideoScene } from './scenes/SendVideoScene';
import { CacheModule } from '../Cache/CacheModule';
import { InlineKeyboardModule } from '../InlineKeyboard/InlineKeyboardModule';
import { RenameCodeScene } from './scenes/RenameCodeScene';

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
    CacheModule,
  ],
})
export class SceneModule {}
