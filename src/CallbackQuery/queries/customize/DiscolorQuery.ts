import { Action, Ctx, Sender, Update } from 'nestjs-telegraf';
import { Readable } from 'node:stream';
import sharp from 'sharp';

import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { getFileIdFromCache } from '@sendByBot/Cache/utils/getFileIdFromCache';
import { CallbackQueryName } from '@sendByBot/CallbackQuery/enums/CallbackQueryName';
import { TContext } from '@sendByBot/Common/types/TContext';
import { ReplyBuilder } from '@sendByBot/Common/utils/builders/ReplyBuilder';
import { getBufferFromFileId } from '@sendByBot/Common/utils/getBufferFromFileId';
import { CustomizeKeyboardService } from '@sendByBot/InlineKeyboard/services/CustomizeKeyboardService';

@Update()
export class DiscolorQuery {
  public constructor(
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
    private readonly customizeKeyboardService: CustomizeKeyboardService,
  ) {}

  @Action(CallbackQueryName.DISCOLOR)
  public async onDiscolor(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
  ): Promise<void> {
    const cache = await this.cacheCallbackQueryService.get(userId);

    if (!cache) {
      return;
    }

    await ctx.tg.deleteMessage(cache.chatId, Number(cache.messageId));

    const fileId = getFileIdFromCache(cache);
    const newBuffer = await sharp(await getBufferFromFileId(ctx, fileId))
      .greyscale()
      .toBuffer();

    const reply = new ReplyBuilder();

    reply.setText('Выберите вариант кастомизации:');
    reply.setImage(Readable.from(newBuffer));
    reply.setKeyboard(this.customizeKeyboardService.getKeyboard(true));
    const msg = await reply.send(ctx);

    if ('photo' in msg) {
      await this.cacheCallbackQueryService.set(userId, {
        variant: 'image',
        uniqueImageId: String(msg.photo[0].file_unique_id),
        imageId: String(msg.photo[0].file_id),
        id: String(msg.photo[0].file_id),
        messageId: String(msg.message_id),
        chatId: String(msg.chat.id),
      });
    }
  }
}
