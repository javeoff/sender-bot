import { SceneName } from '../enums/SceneName';
import { Ctx, Message, On, Scene, SceneEnter, Sender } from 'nestjs-telegraf';
import { TContext } from '../../Common/types/TContext';
import { SceneLocaleService } from '../services/SceneLocaleService';
import { isMessageWithText } from '../../Common/typeGuards/isMessageWithText';
import { TMessage } from '../../Common/types/TMessage';
import { StickerEntity } from '../../Stickers/entities/StickerEntity';
import { StickersSetter } from '../../Stickers/services/StickersSetter';
import { CacheScenesService } from '../../Cache/services/CacheScenesService';
import { SceneKeyboardService } from '../../InlineKeyboard/services/SceneKeyboardService';
import { StickersGetter } from '../../Stickers/services/StickersGetter';

@Scene(SceneName.SEND_STICKER_SCENE)
export class SendStickerScene {
  public constructor(
    private readonly mediaLocaleService: SceneLocaleService,
    private readonly stickersGetter: StickersGetter,
    private readonly stickersSetter: StickersSetter,
    private readonly sceneKeyboardService: SceneKeyboardService,
    private readonly cacheScenesService: CacheScenesService,
  ) {}

  @SceneEnter()
  async onSceneEnter(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
  ): Promise<string> {
    const message = ctx.message;

    if (!('sticker' in message)) {
      return;
    }

    const sticker = message.sticker;
    const isExisting = await this.stickersGetter.hasByUniqueId(
      userId,
      sticker.file_unique_id,
    );
    await this.cacheScenesService.set(userId, {
      stickerId: sticker.file_id,
      uniqueStickerId: message.sticker.file_unique_id
    }, { ttl: 10_000 })

    ctx.reply(this.mediaLocaleService.getSuccessLoadMediaMessage(
      'стикера'
    ), {
      reply_markup: this.sceneKeyboardService.getKeyboard(isExisting)
    })
  }

  @On('text')
  async onText(
    @Ctx() ctx: TContext,
    @Message() message: TMessage,
    @Sender('id') userId: string,
  ): Promise<void> {
    ctx.scene.leave();
    if (!isMessageWithText(message)) {
      return;
    }

    const cache = await this.cacheScenesService.get(userId)

    if (!('stickerId' in cache)) {
      return;
    }

    const sticker = new StickerEntity();
    sticker.sticker_id = cache.stickerId;
    sticker.unique_sticker_id = cache.uniqueStickerId;
    sticker.user_id = userId;
    sticker.code = message.text;

    await this.stickersSetter.add(sticker);

    ctx.reply(this.mediaLocaleService.getSuccessSaveMediaMessage(
      message.text
    ));
  }
}
