import { Ctx, Message, On, Sender, Update } from 'nestjs-telegraf';
import { TContext } from '../Common/types/TContext';
import { StickersGetter } from './services/StickersGetter';
import { SceneName } from '../Scenes/enums/SceneName';
import { EncodingService } from '../Encoding/services/EncodingService';
import { CacheCallbackQueryService } from '../Cache/services/CacheCallbackQueryService';
import { TMessage } from '../Common/types/TMessage';

@Update()
export class StickersController {
  public constructor(
    private readonly stickersGetter: StickersGetter,
    private readonly encodingService: EncodingService,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService
  ) {}

  async onInlineQuery(
    @Ctx() ctx: TContext,
  ) {
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
  async onSticker(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
    @Message() message: TMessage,
  ) {
    if (!('sticker' in message)) {
      return;
    }

    await this.cacheCallbackQueryService.set(userId, {
      variant: 'sticker',
      id: message.sticker.file_id,
      uniqueStickerId: message.sticker.file_unique_id
    }, { ttl: 10_000 });

    void ctx.scene.enter(SceneName.SEND_STICKER_SCENE);
  }
}
