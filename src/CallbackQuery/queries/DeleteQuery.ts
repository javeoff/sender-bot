import { Action, Ctx, Update } from 'nestjs-telegraf';

import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { TContext } from '@sendByBot/Common/types/TContext';
import { ImagesSetter } from '@sendByBot/Images/services/ImagesSetter';
import { StickersSetter } from '@sendByBot/Stickers/services/StickersSetter';
import { VideosSetter } from '@sendByBot/Videos/services/VideosSetter';

@Update()
export class DeleteQuery {
  public constructor(
    private readonly stickersSetter: StickersSetter,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
    private readonly imagesSetter: ImagesSetter,
    private readonly videosSetter: VideosSetter,
  ) {}

  @Action(CallbackQueryName.DELETE)
  public async onDelete(@Ctx() ctx: TContext): Promise<void> {
    // if (!isQueryWithName(ctx, CallbackQueryName.DELETE)) {
    //   return;
    // }

    await ctx.scene.leave();

    const userId = String(ctx.from.id);
    const cache = await this.cacheCallbackQueryService.get(userId);

    if (!cache) {
      return;
    }

    if ('uniqueStickerId' in cache) {
      await this.stickersSetter.removeByUniqueStickerId(cache.uniqueStickerId);
      await ctx.reply('Стикер успешно удален из базы');
      return;
    }

    if ('uniqueImageId' in cache) {
      await this.imagesSetter.removeByImageUniqueId(cache.uniqueImageId);
      await ctx.reply('Фото успешно удалено из базы');
      return;
    }

    if ('uniqueVideoId' in cache) {
      await this.videosSetter.removeByVideoUniqueId(cache.uniqueVideoId);
      await ctx.reply('Видео успешно удалено из базы');
      return;
    }
  }
}
