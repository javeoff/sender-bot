import { Ctx, Sender } from 'nestjs-telegraf';
import { CallbackQueryName } from '../enums/CallbackQueryName';
import { TContext } from '../../Common/types/TContext';
import { Injectable } from '@nestjs/common';
import { isQueryWithName } from '../guards/isQueryWithName';
import { PagesListFactory } from '../../Common/factories/PagesListFactory';
import { PagesService } from '../services/PagesService';

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
