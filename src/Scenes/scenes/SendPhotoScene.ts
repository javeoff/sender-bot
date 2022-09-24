import { Ctx, Message, On, Scene, SceneEnter, Sender } from 'nestjs-telegraf';

import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { CacheScenesService } from '@sendByBot/Cache/services/CacheScenesService';
import { isMessageWithText } from '@sendByBot/Common/typeGuards/isMessageWithText';
import { TContext } from '@sendByBot/Common/types/TContext';
import { TMessage } from '@sendByBot/Common/types/TMessage';
import { getPhotoFromMessage } from '@sendByBot/Common/utils/getPhotoFromMessage';
import { ImageEntity } from '@sendByBot/Images/entities/ImageEntity';
import { ImagesGetter } from '@sendByBot/Images/services/ImagesGetter';
import { ImagesSetter } from '@sendByBot/Images/services/ImagesSetter';
import { SceneKeyboardService } from '@sendByBot/InlineKeyboard/services/SceneKeyboardService';
import { SendCodeKeyboardService } from '@sendByBot/InlineKeyboard/services/SendCodeKeyboardService';
import { SceneName } from '@sendByBot/Scenes/enums/SceneName';
import { SceneLocaleService } from '@sendByBot/Scenes/services/SceneLocaleService';

@Scene(SceneName.SEND_PHOTO_SCENE)
export class SendPhotoScene {
  public constructor(
    private readonly sceneLocaleService: SceneLocaleService,
    private readonly cacheScenesService: CacheScenesService,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
    private readonly imagesSetter: ImagesSetter,
    private readonly imagesGetter: ImagesGetter,
    private readonly sceneKeyboardService: SceneKeyboardService,
    private readonly sendCodeKeyboardService: SendCodeKeyboardService,
  ) {}

  @SceneEnter()
  public async onSceneEnter(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
    @Message() message: TMessage,
  ): Promise<void> {
    let fileId = '';
    let uniqueFileId = '';
    let caption = '';

    console.log('ctx.scene.state', ctx.scene.state, message);

    if (!message || !('photo' in message)) {
      const cache = await this.cacheCallbackQueryService.get(userId);

      console.log('cache', cache);

      if (!cache || cache.variant !== 'image') {
        await ctx.scene.leave();
        return;
      }

      fileId = cache?.imageId;
      uniqueFileId = cache?.uniqueImageId;
    }

    if (message && 'photo' in message) {
      const photo = getPhotoFromMessage(message);

      fileId = photo.file_id;
      uniqueFileId = photo.file_unique_id;
      caption = message?.caption;
    }

    if (!fileId || !uniqueFileId) {
      await ctx.scene.leave();
      return;
    }

    if (caption) {
      const image = new ImageEntity();

      image.unique_image_id = uniqueFileId;
      image.image_id = fileId;
      image.user_id = userId;
      image.code = caption;

      await this.imagesSetter.add(image);
      await ctx.reply(
        this.sceneLocaleService.getSuccessSaveMediaMessage(caption),
        {
          reply_markup: this.sendCodeKeyboardService.getKeyboard(
            caption,
            ctx.i18n,
          ),
        },
      );
      await ctx.scene.leave();
      return;
    }

    await ctx.reply('123');

    const isExisting = await this.imagesGetter.hasByUniqueId(
      userId,
      uniqueFileId,
    );

    const msg = await ctx.reply(
      ctx.i18n.t('scenes.success_load_media', {
        entityName: 'фотографии',
      }),
      {
        reply_markup: this.sceneKeyboardService.getKeyboard(
          ctx.i18n,
          isExisting,
        ),
      },
    );

    await this.cacheScenesService.set(
      userId,
      {
        photoId: fileId,
        uniquePhotoId: uniqueFileId,
        messageId: String(msg.message_id),
        chatId: String(msg.chat.id),
      },
      { ttl: 10_000 },
    );
  }

  @On('text')
  public async onText(
    @Ctx() ctx: TContext,
    @Message() message: TMessage,
    @Sender('id') userId: string,
  ): Promise<void> {
    await ctx.scene.leave();
    if (!isMessageWithText(message)) {
      return;
    }

    const cache = await this.cacheScenesService.get(userId);

    if (!cache || !('photoId' in cache)) {
      return;
    }

    const image = new ImageEntity();

    image.unique_image_id = cache.uniquePhotoId;
    image.image_id = cache.photoId;
    image.user_id = userId;
    image.code = message.text;

    await this.imagesSetter.add(image);

    await ctx.replyWithMarkdown(
      ctx.i18n.t('scenes.success_save_media', {
        code: message.text,
      }),
      {
        reply_markup: this.sendCodeKeyboardService.getKeyboard(
          message.text,
          ctx.i18n,
        ),
      },
    );
  }
}
