import { Injectable } from '@nestjs/common';
import { isQueryWithName } from '../guards/isQueryWithName';
import { CallbackQueryName } from '../enums/CallbackQueryName';
import { Ctx } from 'nestjs-telegraf';
import { TContext } from '../../Common/types/TContext';
import { CachePagesService } from '../../Cache/services/CachePagesService';
import { PagesKeyboardService } from '../../InlineKeyboard/services/PagesKeyboardService';
import { PagesListFactory } from '../../Common/factories/PagesListFactory';
import { PagesService } from '../services/PagesService';

@Injectable()
export class NextPageQuery {
  constructor(
    private readonly cachePagesService: CachePagesService,
    private readonly pagesKeyboardService: PagesKeyboardService,
    private readonly pagesService: PagesService,
  ) {}

  async onNextPage(
    @Ctx() ctx: TContext,
  ) {
    if (!isQueryWithName(ctx, CallbackQueryName.NEXT_PAGE)) {
      return;
    }

    const userId = String(ctx.from.id);
    ctx.scene.leave();

    const take = 5;

    const cache = await this.cachePagesService.get(userId);
    const newPageIndex = cache.pageIndex + 1;

    const {
      data: rows,
      hasNext
    } = await this.pagesService.getPageRowsByUserId(
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

    console.log('hasNext', hasNext);

    ctx.telegram.editMessageText(
      cache.chatId,
      Number(cache.messageId),
      undefined,
      new PagesListFactory(ctx.i18n).createReply(rows),
      {
        reply_markup: this.pagesKeyboardService.getPagesKeyboard(
          false,
          !hasNext
        )
      }
    );
  }
}
