import { Injectable } from '@nestjs/common';
import { StickersSetter } from '@sendByBot/Stickers/services/StickersSetter';
import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { VideosSetter } from '@sendByBot/Videos/services/VideosSetter';
import { Ctx } from 'nestjs-telegraf';
import { ImagesSetter } from '@sendByBot/Images/services/ImagesSetter';
import { TContext } from '@sendByBot/Common/types/TContext';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { isQueryWithName } from '@sendByBot/CallbackQuery/guards/isQueryWithName';

@Injectable()
export class DeleteQuery {
  constructor(
    private readonly stickersSetter: StickersSetter,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
    private readonly imagesSetter: ImagesSetter,
    private readonly videosSetter: VideosSetter,
  ) {}

  async onDelete(
    @Ctx() ctx: TContext,
  ) {
    if (!isQueryWithName(ctx, CallbackQueryName.DELETE)) {
      return;
    }

    ctx.scene.leave();

    const userId = String(ctx.from.id);
    const cache = await this.cacheCallbackQueryService.get(userId);

    if (!cache) {
      return;
    }

    if ('uniqueStickerId' in cache) {
      this.stickersSetter.removeByUniqueStickerId(cache.uniqueStickerId);
      ctx.reply('Стикер успешно удален из базы');
      return;
    }

    if ('uniqueImageId' in cache) {
      this.imagesSetter.removeByImageUniqueId(cache.uniqueImageId);
      ctx.reply('Фото успешно удалено из базы');
      return;
    }

    if ('uniqueVideoId' in cache) {
      this.videosSetter.removeByVideoUniqueId(cache.uniqueVideoId);
      ctx.reply('Видео успешно удалено из базы');
      return;
    }
  }
}
