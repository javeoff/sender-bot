import { Injectable } from '@nestjs/common';
import { Ctx } from 'nestjs-telegraf';

import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { Query } from '@sendByBot/CallbackQuery/decorators/Query';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { TContext } from '@sendByBot/Common/types/TContext';
import { ImagesSetter } from '@sendByBot/Images/services/ImagesSetter';
import { StickersSetter } from '@sendByBot/Stickers/services/StickersSetter';
import { VideosSetter } from '@sendByBot/Videos/services/VideosSetter';

@Injectable()
export class DeleteQuery {
  public constructor(
    private readonly stickersSetter: StickersSetter,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
    private readonly imagesSetter: ImagesSetter,
    private readonly videosSetter: VideosSetter,
  ) {}

  @Query(CallbackQueryName.DELETE)
  public async onDelete(@Ctx() ctx: TContext): Promise<void> {
    // if (!isQueryWithName(ctx, CallbackQueryName.DELETE)) {
    //   return;
    // }

    void ctx.scene.leave();

    const userId = String(ctx.from.id);
    const cache = await this.cacheCallbackQueryService.get(userId);

    if (!cache) {
      return;
    }

    if ('uniqueStickerId' in cache) {
      this.stickersSetter.removeByUniqueStickerId(cache.uniqueStickerId);
      void ctx.reply('Стикер успешно удален из базы');
      return;
    }

    if ('uniqueImageId' in cache) {
      this.imagesSetter.removeByImageUniqueId(cache.uniqueImageId);
      void ctx.reply('Фото успешно удалено из базы');
      return;
    }

    if ('uniqueVideoId' in cache) {
      this.videosSetter.removeByVideoUniqueId(cache.uniqueVideoId);
      void ctx.reply('Видео успешно удалено из базы');
      return;
    }
  }
}
