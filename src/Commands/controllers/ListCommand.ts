import { Command, Ctx, Message, Sender, Update } from 'nestjs-telegraf';
import { TContext } from '../../Common/types/TContext';
import { ListCommandService } from '../services/ListCommandService';
import { PagesKeyboardService } from '../../InlineKeyboard/services/PagesKeyboardService';
import { CachePagesService } from '../../Cache/services/CachePagesService';
import { TMessage } from '../../Common/types/TMessage';
import { PagesListFactory } from '../../Common/factories/PagesListFactory';
import { PagesService } from '../../CallbackQuery/services/PagesService';

@Update()
export class ListCommand {
  constructor(
    private readonly listCommandService: ListCommandService,
    private readonly pagesKeyboardService: PagesKeyboardService,
    private readonly cachePagesService: CachePagesService,
    private readonly pagesService: PagesService,
  ) {}

  @Command('list')
  async onCommand(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
    @Message() message: TMessage,
  ) {
    const factory = new PagesListFactory();
    const {data: rows, hasNext } = await this.pagesService.getPageRowsByUserId(userId);

    console.log('hasNext', hasNext);

    const msg = await ctx.reply(factory.createReply(rows), {
      reply_markup: this.pagesKeyboardService.getPagesKeyboard(
        true,
        !hasNext
      )
    })

    this.cachePagesService.set(userId, {
      chatId: String(msg.chat.id),
      messageId: String(msg.message_id),
      pageIndex: 0,
    })
  }
}
