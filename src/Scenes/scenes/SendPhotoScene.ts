import { Ctx, Message, On, Scene, SceneEnter, Sender } from 'nestjs-telegraf';

import { CacheScenesService } from '@sendByBot/Cache/services/CacheScenesService';
import { isMessageWithText } from '@sendByBot/Common/typeGuards/isMessageWithText';
import { TContext } from '@sendByBot/Common/types/TContext';
import { TMessage } from '@sendByBot/Common/types/TMessage';
import { ImageEntity } from '@sendByBot/Images/entities/ImageEntity';
import { ImagesGetter } from '@sendByBot/Images/services/ImagesGetter';
import { ImagesSetter } from '@sendByBot/Images/services/ImagesSetter';
import { SceneKeyboardService } from '@sendByBot/InlineKeyboard/services/SceneKeyboardService';
import { SceneName } from '@sendByBot/Scenes/enums/SceneName';
import { SceneLocaleService } from '@sendByBot/Scenes/services/SceneLocaleService';

@Scene(SceneName.SEND_PHOTO_SCENE)
export class SendPhotoScene {
  public constructor(
    private readonly sceneLocaleService: SceneLocaleService,
    private readonly cacheScenesService: CacheScenesService,
    private readonly imagesSetter: ImagesSetter,
    private readonly imagesGetter: ImagesGetter,
    private readonly sceneKeyboardService: SceneKeyboardService,
  ) {}

  @SceneEnter()
  public async onSceneEnter(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
    @Message() message: TMessage,
  ): Promise<void> {
    if (!('photo' in message)) {
      return;
    }

    const [SMALL_PHOTO, MEDIUM_PHOTO, LARGE_PHOTO] = message.photo;
    const fileId =
      LARGE_PHOTO?.file_id || MEDIUM_PHOTO?.file_id || SMALL_PHOTO?.file_id;
    const uniqueFileId =
      LARGE_PHOTO?.file_unique_id ||
      MEDIUM_PHOTO?.file_unique_id ||
      SMALL_PHOTO?.file_unique_id;
    const caption = message?.caption;

    if (!fileId || !uniqueFileId) {
      void ctx.scene.leave();
      return;
    }

    if (caption) {
      const image = new ImageEntity();

      image.unique_image_id = uniqueFileId;
      image.image_id = fileId;
      image.user_id = userId;
      image.code = message.caption;

      await this.imagesSetter.add(image);
      void ctx.reply(
        this.sceneLocaleService.getSuccessSaveMediaMessage(message.caption),
      );
      void ctx.scene.leave();
      return;
    }

    await this.cacheScenesService.set(
      userId,
      {
        photoId: fileId,
        uniquePhotoId: uniqueFileId,
      },
      { ttl: 10_000 },
    );

    const isExisting = await this.imagesGetter.hasByUniqueId(
      userId,
      uniqueFileId,
    );

    void ctx.reply(
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
  }

  @On('text')
  public async onText(
    @Ctx() ctx: TContext,
    @Message() message: TMessage,
    @Sender('id') userId: string,
  ): Promise<void> {
    void ctx.scene.leave();
    if (!isMessageWithText(message)) {
      return;
    }

    const cache = await this.cacheScenesService.get(userId);

    if (!('photoId' in cache)) {
      return;
    }

    const image = new ImageEntity();

    image.unique_image_id = cache.uniquePhotoId;
    image.image_id = cache.photoId;
    image.user_id = userId;
    image.code = message.text;

    await this.imagesSetter.add(image);

    void ctx.reply(
      ctx.i18n.t('scenes.success_save_media', {
        code: message.text,
      }),
    );
  }
}
