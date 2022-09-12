import { forwardRef, Module } from '@nestjs/common';
import { ListCommand } from './controllers/ListCommand';
import { StickersModule } from '../Stickers/StickersModule';
import { ImagesModule } from '../Images/ImagesModule';
import { VideosModule } from '../Videos/VideosModule';
import { EditCommand } from './controllers/EditCommand';
import { InlineKeyboardModule } from '../InlineKeyboard/InlineKeyboardModule';
import { ListCommandService } from './services/ListCommandService';
import { CacheModule } from '../Cache/CacheModule';
import { CallbackQueryModule } from '../CallbackQuery/CallbackQueryModule';

@Module({
  providers: [
    ListCommandService,
    ListCommand,
    EditCommand,
  ],
  exports: [
    ListCommandService,
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
