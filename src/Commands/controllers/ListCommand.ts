import { Command, Ctx, Sender, Update } from 'nestjs-telegraf';

import { CachePagesService } from '@sendByBot/Cache/services/CachePagesService';
import { PagesService } from '@sendByBot/CallbackQuery/services/PagesService';
import { PagesListFactory } from '@sendByBot/Common/factories/PagesListFactory';
import { TContext } from '@sendByBot/Common/types/TContext';
import { PagesKeyboardService } from '@sendByBot/InlineKeyboard/services/PagesKeyboardService';

@Update()
export class ListCommand {
  public constructor(
    private readonly pagesKeyboardService: PagesKeyboardService,
    private readonly cachePagesService: CachePagesService,
    private readonly pagesService: PagesService,
  ) {}

  @Command('list')
  public async onCommand(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
  ): Promise<void> {
    const factory = new PagesListFactory(ctx.i18n);
    const { data: rows, hasNext } = await this.pagesService.getPageRowsByUserId(
      userId,
    );

    const msg = await ctx.reply(factory.createReply(rows), {
      reply_markup: this.pagesKeyboardService.getPagesKeyboard(true, !hasNext),
    });

    this.cachePagesService.set(userId, {
      chatId: String(msg.chat.id),
      messageId: String(msg.message_id),
      pageIndex: 0,
    });
  }
}
