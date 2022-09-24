import { Action, Ctx, Sender, Update } from 'nestjs-telegraf';

import { CallbackQueryName } from '../enums/CallbackQueryName';
import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { CacheScenesService } from '@sendByBot/Cache/services/CacheScenesService';
import { TContext } from '@sendByBot/Common/types/TContext';
import { ReplyBuilder } from '@sendByBot/Common/utils/builders/ReplyBuilder';
import { CustomizeKeyboardService } from '@sendByBot/InlineKeyboard/services/CustomizeKeyboardService';

@Update()
export class CustomizeQuery {
  public constructor(
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
    private readonly customizeKeyboardService: CustomizeKeyboardService,
    private readonly cacheScenesService: CacheScenesService,
  ) {}

  @Action(CallbackQueryName.CUSTOMIZE)
  public async onCustomizeQuery(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
  ): Promise<void> {
    const scenesCache = await this.cacheScenesService.get(userId);
    const cache = await this.cacheCallbackQueryService.get(userId);

    if (!scenesCache || !cache) {
      return;
    }

    await ctx.scene.leave();

    await ctx.tg.deleteMessage(
      Number(scenesCache.chatId),
      Number(scenesCache.messageId),
    );

    const reply = new ReplyBuilder();

    reply.setText('Выберите вариант кастомизации:');
    reply.setKeyboard(this.customizeKeyboardService.getKeyboard());
    const msg = await reply.send(ctx);

    await this.cacheCallbackQueryService.set(userId, {
      ...cache,
      messageId: String(msg.message_id),
      chatId: String(msg.chat.id),
    });
  }
}
