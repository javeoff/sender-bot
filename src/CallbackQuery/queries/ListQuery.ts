import { Injectable } from '@nestjs/common';
import { Ctx, Sender } from 'nestjs-telegraf';

import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { isQueryWithName } from '@sendByBot/CallbackQuery/guards/isQueryWithName';
import { PagesService } from '@sendByBot/CallbackQuery/services/PagesService';
import { PagesListFactory } from '@sendByBot/Common/factories/PagesListFactory';
import { TContext } from '@sendByBot/Common/types/TContext';

@Injectable()
export class ListQuery {
  public constructor(private readonly pagesService: PagesService) {}

  public async onListQuery(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
  ): Promise<void> {
    if (!isQueryWithName(ctx, CallbackQueryName.LIST)) {
      return;
    }

    void ctx.scene.leave();

    const factory = new PagesListFactory(ctx.i18n);
    const { data: rows } = await this.pagesService.getPageRowsByUserId(userId);

    void ctx.reply(factory.createReply(rows));
  }
}
