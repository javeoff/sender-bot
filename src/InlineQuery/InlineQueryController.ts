import { Ctx, On, Update } from 'nestjs-telegraf';

import { ReadActionsService } from '@sendByBot/Analytics/services/ReadActionsService';
import { IReadAction } from '@sendByBot/Analytics/types/IReadAction';
import { TReadActionType } from '@sendByBot/Analytics/types/TReadActionType';
import { TContext } from '@sendByBot/Common/types/TContext';
import { ImagesController } from '@sendByBot/Images/ImagesController';
import { StickersController } from '@sendByBot/Stickers/StickersController';
import { VideosController } from '@sendByBot/Videos/VideosController';

@Update()
export class InlineQueryController {
  public constructor(
    private readonly imagesController: ImagesController,
    private readonly stickersController: StickersController,
    private readonly videosController: VideosController,
    private readonly readActionsService: ReadActionsService,
  ) {}

  @On('inline_query')
  public async onInlineQuery(@Ctx() ctx: TContext): Promise<void> {
    const results = [];

    const images = await this.imagesController.onInlineQuery(ctx);
    const stickers = await this.stickersController.onInlineQuery(ctx);
    const videos = await this.videosController.onInlineQuery(ctx);

    results.push(...images, ...stickers, ...videos);

    await ctx.answerInlineQuery(results, {
      cache_time: 10,
    });

    await this.makeAnalytics(ctx, images, stickers, videos);
  }

  private async makeAnalytics(
    ctx: TContext,
    images: unknown[],
    stickers: unknown[],
    videos: unknown[],
  ): Promise<void> {
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
      };
    };

    if (images.length > 0) {
      await this.readActionsService.add(getAnalyticsRequest('image'));
    }
    if (videos.length > 0) {
      await this.readActionsService.add(getAnalyticsRequest('video'));
    }
    if (stickers.length > 0) {
      await this.readActionsService.add(getAnalyticsRequest('sticker'));
    }
  }
}
