import { InlineKeyboardModule } from '@sendByBot/InlineKeyboard/InlineKeyboardModule';
import { ListCommand } from '@sendByBot/Commands/controllers/ListCommand';
import { CallbackQueryModule } from '@sendByBot/CallbackQuery/CallbackQueryModule';
import { StickersModule } from '@sendByBot/Stickers/StickersModule';
import { forwardRef, Module } from '@nestjs/common';
import { ImagesModule } from '@sendByBot/Images/ImagesModule';
import { EditCommand } from '@sendByBot/Commands/controllers/EditCommand';
import { VideosModule } from '@sendByBot/Videos/VideosModule';
import { CacheModule } from '@sendByBot/Cache/CacheModule';

@Module({
  providers: [
    ListCommand,
    EditCommand,
  ],
  imports: [
    StickersModule,
    ImagesModule,
    VideosModule,
    InlineKeyboardModule,
    CacheModule,
    forwardRef(() => CallbackQueryModule)
  ],
})
export class CommandsModule {}
