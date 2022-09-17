import { SceneName } from '../enums/SceneName';
import { Ctx, Message, On, Scene, SceneEnter, Sender } from 'nestjs-telegraf';
import { StickersSetter } from '@sendByBot/Stickers/services/StickersSetter';
import { TMessage } from '@sendByBot/Common/types/TMessage';
import { StickersGetter } from '@sendByBot/Stickers/services/StickersGetter';
import { SceneKeyboardService } from '@sendByBot/InlineKeyboard/services/SceneKeyboardService';
import { isMessageWithText } from '@sendByBot/Common/typeGuards/isMessageWithText';
import { StickerEntity } from '@sendByBot/Stickers/entities/StickerEntity';
import { TContext } from '@sendByBot/Common/types/TContext';
import { SceneLocaleService } from '@sendByBot/Scenes/services/SceneLocaleService';
import { CacheScenesService } from '@sendByBot/Cache/services/CacheScenesService';

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

    ctx.reply(ctx.i18n.t('scenes.success_load_media', {
      entityName: 'стикера'
    }), {
      reply_markup: this.sceneKeyboardService.getKeyboard(
        ctx.i18n,
        isExisting
      )
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

    ctx.reply(ctx.i18n.t('scenes.success_save_media', {
      code: message.text
    }));
  }
}
