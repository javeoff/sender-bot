import { Ctx, Message, On, Sender, Update } from 'nestjs-telegraf';

import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { TContext } from '@sendByBot/Common/types/TContext';
import { TInlineQueries } from '@sendByBot/Common/types/TInlineQueries';
import { TMessage } from '@sendByBot/Common/types/TMessage';
import { EncodingService } from '@sendByBot/Encoding/services/EncodingService';
import { SceneName } from '@sendByBot/Scenes/enums/SceneName';
import { StickersGetter } from '@sendByBot/Stickers/services/StickersGetter';

@Update()
export class StickersController {
  public constructor(
    private readonly stickersGetter: StickersGetter,
    private readonly encodingService: EncodingService,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
  ) {}

  public async onInlineQuery(@Ctx() ctx: TContext): Promise<TInlineQueries> {
    const query = ctx.inlineQuery.query;
    const stickers = await this.stickersGetter.getByCode(
      String(ctx.from.id),
      query,
    );

    if (!stickers?.length) {
      return [];
    }

    return stickers.map((sticker) => ({
      type: 'sticker',
      sticker_file_id: sticker.sticker_id,
      id: this.encodingService.hash(sticker.id + sticker.sticker_id),
    }));
  }

  @On('sticker')
  public async onSticker(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
    @Message() message: TMessage,
  ): Promise<void> {
    if (!('sticker' in message)) {
      return;
    }

    await this.cacheCallbackQueryService.set(
      userId,
      {
        variant: 'sticker',
        id: message.sticker.file_id,
        stickerId: message.sticker.file_id,
        uniqueStickerId: message.sticker.file_unique_id,
      },
      { ttl: 10_000 },
    );

    await ctx.scene.enter(SceneName.SEND_STICKER_SCENE);
  }
}
