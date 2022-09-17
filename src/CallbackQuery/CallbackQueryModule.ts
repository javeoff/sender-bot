import { InlineKeyboardModule } from '@sendByBot/InlineKeyboard/InlineKeyboardModule';
import { RenameCodeQuery } from '@sendByBot/CallbackQuery/queries/RenameCodeQuery';
import { CallbackQueryController } from '@sendByBot/CallbackQuery/CallbackQueryController';
import { GetCodeQuery } from '@sendByBot/CallbackQuery/queries/GetCodeQuery';
import { CommonModule } from '@sendByBot/Common/CommonModule';
import { StickersModule } from '@sendByBot/Stickers/StickersModule';
import { PagesService } from '@sendByBot/CallbackQuery/services/PagesService';
import { VideosModule } from '@sendByBot/Videos/VideosModule';
import { PrevPageQuery } from '@sendByBot/CallbackQuery/queries/PrevPageQuery';
import { CommandsModule } from '@sendByBot/Commands/CommandsModule';
import { DeleteQuery } from '@sendByBot/CallbackQuery/queries/DeleteQuery';
import { forwardRef, Module } from '@nestjs/common';
import { ImagesModule } from '@sendByBot/Images/ImagesModule';
import { ListQuery } from '@sendByBot/CallbackQuery/queries/ListQuery';
import { NextPageQuery } from '@sendByBot/CallbackQuery/queries/NextPageQuery';
import { CacheModule } from '@sendByBot/Cache/CacheModule';

@Module({
  providers: [
    DeleteQuery,
    ListQuery,
    GetCodeQuery,
    RenameCodeQuery,
    NextPageQuery,
    PrevPageQuery,
    PagesService,
    CallbackQueryController,
  ],
  exports: [
    PagesService
  ],
  imports: [
    StickersModule,
    VideosModule,
    ImagesModule,
    CacheModule,
    forwardRef(() => CommandsModule),
    CommonModule,
    InlineKeyboardModule,
  ],
})
export class CallbackQueryModule {}
