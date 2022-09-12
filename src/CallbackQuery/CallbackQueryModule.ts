import { forwardRef, Module } from '@nestjs/common';
import { StickersModule } from '../Stickers/StickersModule';
import { CacheModule } from '../Cache/CacheModule';
import { CommandsModule } from '../Commands/CommandsModule';
import { ListQuery } from './queries/ListQuery';
import { CallbackQueryController } from './CallbackQueryController';
import { DeleteQuery } from './queries/DeleteQuery';
import { ImagesModule } from '../Images/ImagesModule';
import { VideosModule } from '../Videos/VideosModule';
import { GetCodeQuery } from './queries/GetCodeQuery';
import { RenameCodeQuery } from './queries/RenameCodeQuery';
import { NextPageQuery } from './queries/NextPageQuery';
import { PrevPageQuery } from './queries/PrevPageQuery';
import { CommonModule } from '../Common/CommonModule';
import { InlineKeyboardModule } from '../InlineKeyboard/InlineKeyboardModule';
import { PagesService } from './services/PagesService';

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
