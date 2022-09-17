import { forwardRef, Module } from '@nestjs/common';

import { CacheModule } from '@sendByBot/Cache/CacheModule';
import { CallbackQueryController } from '@sendByBot/CallbackQuery/CallbackQueryController';
import { DeleteQuery } from '@sendByBot/CallbackQuery/queries/DeleteQuery';
import { GetCodeQuery } from '@sendByBot/CallbackQuery/queries/GetCodeQuery';
import { ListQuery } from '@sendByBot/CallbackQuery/queries/ListQuery';
import { NextPageQuery } from '@sendByBot/CallbackQuery/queries/NextPageQuery';
import { PrevPageQuery } from '@sendByBot/CallbackQuery/queries/PrevPageQuery';
import { RenameCodeQuery } from '@sendByBot/CallbackQuery/queries/RenameCodeQuery';
import { PagesService } from '@sendByBot/CallbackQuery/services/PagesService';
import { CommandsModule } from '@sendByBot/Commands/CommandsModule';
import { CommonModule } from '@sendByBot/Common/CommonModule';
import { ImagesModule } from '@sendByBot/Images/ImagesModule';
import { InlineKeyboardModule } from '@sendByBot/InlineKeyboard/InlineKeyboardModule';
import { StickersModule } from '@sendByBot/Stickers/StickersModule';
import { VideosModule } from '@sendByBot/Videos/VideosModule';

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
  exports: [PagesService],
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
