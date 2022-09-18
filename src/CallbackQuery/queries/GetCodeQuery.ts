import { Injectable } from '@nestjs/common';
import { Ctx } from 'nestjs-telegraf';

import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { Query } from '@sendByBot/CallbackQuery/decorators/Query';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { RowEntitiesFactory } from '@sendByBot/Common/factories/RowEntitiesFactory';
import { TContext } from '@sendByBot/Common/types/TContext';
import { ImagesGetter } from '@sendByBot/Images/services/ImagesGetter';
import { StickersGetter } from '@sendByBot/Stickers/services/StickersGetter';
import { VideosGetter } from '@sendByBot/Videos/services/VideosGetter';

@Injectable()
export class GetCodeQuery {
  public constructor(
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
    private readonly stickersGetter: StickersGetter,
    private readonly imagesGetter: ImagesGetter,
    private readonly videosGetter: VideosGetter,
  ) {}

  @Query(CallbackQueryName.GET_CODE)
  public async onGetCode(@Ctx() ctx: TContext): Promise<void> {
    void ctx.scene.leave();

    const userId = String(ctx.from.id);
    const cache = await this.cacheCallbackQueryService.get(userId);

    if (!cache) {
      return;
    }

    if ('uniqueStickerId' in cache) {
      const stickers = await this.stickersGetter.getByUniqueId(
        userId,
        cache.uniqueStickerId,
      );
      const rowFactory = new RowEntitiesFactory();

      rowFactory.addStickerEntities(stickers);
      void ctx.reply(
        'Список найденных стикеров:\n' + rowFactory.rows.join('\n'),
      );
      return;
    }

    if ('uniqueImageId' in cache) {
      const images = await this.imagesGetter.getByUniqueId(
        userId,
        cache.uniqueImageId,
      );
      const rowFactory = new RowEntitiesFactory();

      rowFactory.addStickerEntities(images);
      void ctx.reply(
        'Список найденных изображений:\n' + rowFactory.rows.join('\n'),
      );
      return;
    }

    if ('uniqueVideoId' in cache) {
      const videos = await this.videosGetter.getByUniqueId(
        userId,
        cache.uniqueVideoId,
      );
      const rowFactory = new RowEntitiesFactory();

      rowFactory.addStickerEntities(videos);
      void ctx.reply('Список найденных видео:\n' + rowFactory.rows.join('\n'));
    }
  }
}
