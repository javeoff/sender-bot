import { Ctx, On, Update } from 'nestjs-telegraf';
import { ImagesController } from '../Images/ImagesController';
import { StickersController } from '../Stickers/StickersController';
import { VideosController } from '../Videos/VideosController';
import { TContext } from '../Common/types/TContext';

@Update()
export class InlineQueryController {
  public constructor(
    private readonly imagesController: ImagesController,
    private readonly stickersController: StickersController,
    private readonly videosController: VideosController,
  ) {
  }

  @On('inline_query')
  async onInlineQuery(
    @Ctx() ctx: TContext,
  ) {
    const results = [];

    results.push(...(await this.imagesController.onInlineQuery(ctx) || []));
    results.push(...(await this.stickersController.onInlineQuery(ctx) || []));
    results.push(...(await this.videosController.onInlineQuery(ctx) || []));

    ctx.answerInlineQuery(results, {
      cache_time: 10
    });
  }
}
