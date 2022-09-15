import { Ctx, On, Update } from 'nestjs-telegraf';
import { ImagesController } from '../Images/ImagesController';
import { StickersController } from '../Stickers/StickersController';
import { VideosController } from '../Videos/VideosController';
import { TContext } from '../Common/types/TContext';
import { ReadActionsService } from '../Analytics/services/ReadActionsService';
import { TReadActionType } from '../Analytics/types/TReadActionType';
import { IReadAction } from '../Analytics/types/IReadAction';

@Update()
export class InlineQueryController {
  public constructor(
    private readonly imagesController: ImagesController,
    private readonly stickersController: StickersController,
    private readonly videosController: VideosController,
    private readonly readActionsService: ReadActionsService
  ) {
  }

  @On('inline_query')
  async onInlineQuery(
    @Ctx() ctx: TContext,
  ) {
    const results = [];

    const images = await this.imagesController.onInlineQuery(ctx);
    const stickers = await this.stickersController.onInlineQuery(ctx);
    const videos = await this.videosController.onInlineQuery(ctx)

    results.push(...images);
    results.push(...stickers);
    results.push(...videos);

    ctx.answerInlineQuery(results, {
      cache_time: 10
    });

    this.makeAnalytics(ctx, images, stickers, videos);
  }

  private makeAnalytics(ctx: TContext, images: unknown[], stickers: unknown[], videos: unknown[]) {
    if (!ctx.inlineQuery.query) {
      return;
    }

    const getAnalyticsRequest = (actionType: TReadActionType): IReadAction => {
      return {
        actionType: actionType,
        code: ctx.inlineQuery.query,
        chatType: ctx.inlineQuery.chat_type,
        timestamp: Date.now(),
        lang: ctx.from.language_code,
        isPremium: Boolean(ctx.from.is_premium),
        userId: String(ctx.from.id),
      }
    }

    if (images.length) {
      void this.readActionsService.add(getAnalyticsRequest('image'))
    }
    if (videos.length) {
      void this.readActionsService.add(getAnalyticsRequest('video'))
    }
    if (stickers.length) {
      void this.readActionsService.add(getAnalyticsRequest('sticker'))
    }
  }
}
