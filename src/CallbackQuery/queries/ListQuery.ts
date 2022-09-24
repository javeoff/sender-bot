import { Action, Ctx, Sender, Update } from 'nestjs-telegraf';

import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { PagesService } from '@sendByBot/CallbackQuery/services/PagesService';
import { PagesListFactory } from '@sendByBot/Common/factories/PagesListFactory';
import { TContext } from '@sendByBot/Common/types/TContext';

@Update()
export class ListQuery {
  public constructor(private readonly pagesService: PagesService) {}

  @Action(CallbackQueryName.LIST)
  public async onListQuery(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
  ): Promise<void> {
    await ctx.scene.leave();

    const factory = new PagesListFactory(ctx.i18n);
    const { data: rows } = await this.pagesService.getPageRowsByUserId(userId);

    await ctx.reply(factory.createReply(rows));
  }
}
