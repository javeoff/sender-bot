import { Ctx } from 'nestjs-telegraf';
import { StickersSetter } from '../../Stickers/services/StickersSetter';
import { CacheCallbackQueryService } from '../../Cache/services/CacheCallbackQueryService';
import { TContext } from '../../Common/types/TContext';
import { CallbackQueryName } from '../enums/CallbackQueryName';
import { Injectable } from '@nestjs/common';
import { ImagesSetter } from '../../Images/services/ImagesSetter';
import { VideosSetter } from '../../Videos/services/VideosSetter';
import { isQueryWithName } from '../guards/isQueryWithName';

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
