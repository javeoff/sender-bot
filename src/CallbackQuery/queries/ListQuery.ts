import { Ctx, Sender } from 'nestjs-telegraf';
import { Injectable } from '@nestjs/common';
import { TContext } from '@sendByBot/Common/types/TContext';
import { PagesService } from '@sendByBot/CallbackQuery/services/PagesService';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { PagesListFactory } from '@sendByBot/Common/factories/PagesListFactory';
import { isQueryWithName } from '@sendByBot/CallbackQuery/guards/isQueryWithName';

@Injectable()
export class ListQuery {
  constructor(
    private readonly pagesService: PagesService,
  ) {}

  async onListQuery(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
  ) {
    if (!isQueryWithName(ctx, CallbackQueryName.LIST)) {
      return;
    }

    ctx.scene.leave()

    const factory = new PagesListFactory(ctx.i18n);
    const {data: rows} = await this.pagesService.getPageRowsByUserId(userId);

    ctx.reply(factory.createReply(rows))
  }
}
