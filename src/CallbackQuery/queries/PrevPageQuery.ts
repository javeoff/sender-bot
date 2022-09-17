import { Injectable } from '@nestjs/common';
import { Ctx } from 'nestjs-telegraf';

import { CachePagesService } from '@sendByBot/Cache/services/CachePagesService';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { isQueryWithName } from '@sendByBot/CallbackQuery/guards/isQueryWithName';
import { PagesService } from '@sendByBot/CallbackQuery/services/PagesService';
import { PagesListFactory } from '@sendByBot/Common/factories/PagesListFactory';
import { TContext } from '@sendByBot/Common/types/TContext';
import { PagesKeyboardService } from '@sendByBot/InlineKeyboard/services/PagesKeyboardService';

@Injectable()
export class PrevPageQuery {
  public constructor(
    private readonly cachePagesService: CachePagesService,
    private readonly pagesKeyboardService: PagesKeyboardService,
    private readonly pagesService: PagesService,
  ) {}

  public async onPrevPage(@Ctx() ctx: TContext): Promise<void> {
    if (!isQueryWithName(ctx, CallbackQueryName.PREV_PAGE)) {
      return;
    }

    void ctx.scene.leave();
    const userId = String(ctx.from.id);

    const take = 5;

    const cache = await this.cachePagesService.get(userId);
    const newPageIndex = cache.pageIndex - 1;

    if (newPageIndex < 0) {
      return;
    }

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

    const hideLeft = newPageIndex - 1 < 0;

    void ctx.telegram.editMessageText(
      cache.chatId,
      Number(cache.messageId),
      undefined,
      new PagesListFactory(ctx.i18n).createReply(rows),
      {
        reply_markup: this.pagesKeyboardService.getPagesKeyboard(
          hideLeft,
          !hasNext,
        ),
      },
    );
  }
}
