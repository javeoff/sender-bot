import { Action, Ctx, Update } from 'nestjs-telegraf';

import { CachePagesService } from '@sendByBot/Cache/services/CachePagesService';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { PagesService } from '@sendByBot/CallbackQuery/services/PagesService';
import { PagesListFactory } from '@sendByBot/Common/factories/PagesListFactory';
import { TContext } from '@sendByBot/Common/types/TContext';
import { PagesKeyboardService } from '@sendByBot/InlineKeyboard/services/PagesKeyboardService';

@Update()
export class NextPageQuery {
  public constructor(
    private readonly cachePagesService: CachePagesService,
    private readonly pagesKeyboardService: PagesKeyboardService,
    private readonly pagesService: PagesService,
  ) {}

  @Action(CallbackQueryName.NEXT_PAGE)
  public async onNextPage(@Ctx() ctx: TContext): Promise<void> {
    const userId = String(ctx.from.id);

    await ctx.scene.leave();

    const take = 5;

    const cache = await this.cachePagesService.get(userId);

    if (!cache) {
      return;
    }

    const newPageIndex = cache.pageIndex + 1;

    const { data: rows, hasNext } = await this.pagesService.getPageRowsByUserId(
      userId,
      newPageIndex * take,
      take,
    );

    if (!rows?.length) {
      return;
    }

    await this.cachePagesService.set(userId, {
      ...cache,
      pageIndex: newPageIndex,
    });

    if (!cache) {
      return;
    }

    await ctx.telegram.editMessageText(
      cache.chatId,
      Number(cache.messageId),
      undefined,
      new PagesListFactory(ctx.i18n).createReply(rows),
      {
        reply_markup: this.pagesKeyboardService.getPagesKeyboard(
          false,
          !hasNext,
        ),
      },
    );
  }
}
