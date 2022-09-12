import { Injectable } from '@nestjs/common';
import { CallbackQueryName } from '../enums/CallbackQueryName';
import { isQueryWithName } from '../guards/isQueryWithName';
import { TContext } from '../../Common/types/TContext';
import { Ctx } from 'nestjs-telegraf';
import { CacheCallbackQueryService } from '../../Cache/services/CacheCallbackQueryService';
import { StickersGetter } from '../../Stickers/services/StickersGetter';
import { ImagesGetter } from '../../Images/services/ImagesGetter';
import { VideosGetter } from '../../Videos/services/VideosGetter';
import { RowEntitiesFactory } from '../../Common/factories/RowEntitiesFactory';

@Injectable()
export class GetCodeQuery {
  constructor(
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
    private readonly stickersGetter: StickersGetter,
    private readonly imagesGetter: ImagesGetter,
    private readonly videosGetter: VideosGetter,
  ) {}

  async onGetCode(
    @Ctx() ctx: TContext,
  ) {
    if (!isQueryWithName(ctx, CallbackQueryName.GET_CODE)) {
      return;
    }

    ctx.scene.leave();

    const userId = String(ctx.from.id);
    const cache = await this.cacheCallbackQueryService.get(userId);

    if (!cache) {
      return;
    }

    if ('uniqueStickerId' in cache) {
      const stickers = await this.stickersGetter.getByUniqueId(userId, cache.uniqueStickerId);
      const rowFactory = new RowEntitiesFactory();
      rowFactory.addStickerEntities(stickers);
      ctx.reply(
        'Список найденных стикеров:\n'
        + rowFactory.rows.join('\n')
      );
      return;
    }

    if ('uniqueImageId' in cache) {
      const images = await this.imagesGetter.getByUniqueId(userId, cache.uniqueImageId);
      const rowFactory = new RowEntitiesFactory();
      rowFactory.addStickerEntities(images);
      ctx.reply(
        'Список найденных изображений:\n'
        + rowFactory.rows.join('\n')
      );
      return;
    }

    if ('uniqueVideoId' in cache) {
      const videos = await this.videosGetter.getByUniqueId(userId, cache.uniqueVideoId);
      const rowFactory = new RowEntitiesFactory();
      rowFactory.addStickerEntities(videos);
      ctx.reply(
        'Список найденных видео:\n'
        + rowFactory.rows.join('\n')
      );
    }
  }
}
