import { forwardRef, Module } from '@nestjs/common';

import { CacheModule } from '@sendByBot/Cache/CacheModule';
import { CallbackQueryModule } from '@sendByBot/CallbackQuery/CallbackQueryModule';
import { EditCommand } from '@sendByBot/Commands/controllers/EditCommand';
import { ListCommand } from '@sendByBot/Commands/controllers/ListCommand';
import { ImagesModule } from '@sendByBot/Images/ImagesModule';
import { InlineKeyboardModule } from '@sendByBot/InlineKeyboard/InlineKeyboardModule';
import { StickersModule } from '@sendByBot/Stickers/StickersModule';
import { VideosModule } from '@sendByBot/Videos/VideosModule';

@Module({
  providers: [ListCommand, EditCommand],
  imports: [
    StickersModule,
    ImagesModule,
    VideosModule,
    InlineKeyboardModule,
    CacheModule,
    forwardRef(() => CallbackQueryModule),
  ],
})
export class CommandsModule {}
