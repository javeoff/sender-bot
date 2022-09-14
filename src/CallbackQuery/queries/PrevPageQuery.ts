import { Injectable } from '@nestjs/common';
import { Ctx } from 'nestjs-telegraf';
import { isQueryWithName } from '../guards/isQueryWithName';
import { TContext } from '../../Common/types/TContext';
import { CallbackQueryName } from '../enums/CallbackQueryName';
import { CachePagesService } from '../../Cache/services/CachePagesService';
import { PagesKeyboardService } from '../../InlineKeyboard/services/PagesKeyboardService';
import { PagesListFactory } from '../../Common/factories/PagesListFactory';
import { PagesService } from '../services/PagesService';

@Injectable()
export class PrevPageQuery {
  constructor(
    private readonly cachePagesService: CachePagesService,
    private readonly pagesKeyboardService: PagesKeyboardService,
    private readonly pagesService: PagesService,
  ) {}

  async onPrevPage(
    @Ctx() ctx: TContext,
  ) {
    if (!isQueryWithName(ctx, CallbackQueryName.PREV_PAGE)) {
      return;
    }

    ctx.scene.leave();
    const userId = String(ctx.from.id);

    const take = 5;

    const cache = await this.cachePagesService.get(userId);
    const newPageIndex = cache.pageIndex - 1;

    if (newPageIndex < 0) {
      return;
    }

    const {data: rows, hasNext } = await this.pagesService.getPageRowsByUserId(
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
    })

    if (!cache) {
      return;
    }

    const hideLeft = newPageIndex - 1 < 0;

    ctx.telegram.editMessageText(
      cache.chatId,
      Number(cache.messageId),
      undefined,
      new PagesListFactory(ctx.i18n).createReply(rows),
      {
        reply_markup: this.pagesKeyboardService.getPagesKeyboard(
          hideLeft,
          !hasNext,
        )
      }
    );
  }
}
