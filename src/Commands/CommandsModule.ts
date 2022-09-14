import { forwardRef, Module } from '@nestjs/common';
import { ListCommand } from './controllers/ListCommand';
import { StickersModule } from '../Stickers/StickersModule';
import { ImagesModule } from '../Images/ImagesModule';
import { VideosModule } from '../Videos/VideosModule';
import { EditCommand } from './controllers/EditCommand';
import { InlineKeyboardModule } from '../InlineKeyboard/InlineKeyboardModule';
import { CacheModule } from '../Cache/CacheModule';
import { CallbackQueryModule } from '../CallbackQuery/CallbackQueryModule';

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
