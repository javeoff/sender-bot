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
export class NextPageQuery {
  public constructor(
    private readonly cachePagesService: CachePagesService,
    private readonly pagesKeyboardService: PagesKeyboardService,
    private readonly pagesService: PagesService,
  ) {}

  public async onNextPage(@Ctx() ctx: TContext): Promise<void> {
    if (!isQueryWithName(ctx, CallbackQueryName.NEXT_PAGE)) {
      return;
    }

    const userId = String(ctx.from.id);

    void ctx.scene.leave();

    const take = 5;

    const cache = await this.cachePagesService.get(userId);
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

    console.log('hasNext', hasNext);

    void ctx.telegram.editMessageText(
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
