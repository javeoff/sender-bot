import { Ctx, Message, On, Scene, SceneEnter, Sender } from 'nestjs-telegraf';
import { SceneName } from '../enums/SceneName';
import { TContext } from '../../Common/types/TContext';
import { SceneLocaleService } from '../services/SceneLocaleService';
import { TMessage } from '../../Common/types/TMessage';
import { isMessageWithText } from '../../Common/typeGuards/isMessageWithText';
import { ImageEntity } from '../../Images/entities/ImageEntity';
import { ImagesSetter } from '../../Images/services/ImagesSetter';
import { CacheScenesService } from '../../Cache/services/CacheScenesService';
import { SceneKeyboardService } from '../../InlineKeyboard/services/SceneKeyboardService';
import { ImagesGetter } from '../../Images/services/ImagesGetter';

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
  async onSceneEnter(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
    @Message() message: TMessage,
  ) {
    if (!('photo' in message)) {
      return;
    }

    const [SMALL_PHOTO, MEDIUM_PHOTO, LARGE_PHOTO] = message.photo;
    const fileId = LARGE_PHOTO?.file_id || MEDIUM_PHOTO?.file_id || SMALL_PHOTO?.file_id;
    const uniqueFileId = LARGE_PHOTO?.file_unique_id || MEDIUM_PHOTO?.file_unique_id || SMALL_PHOTO?.file_unique_id;
    const caption = message?.caption;

    if (!fileId || !uniqueFileId) {
      ctx.scene.leave();
      return;
    }

    if (caption) {
      const image = new ImageEntity();
      image.unique_image_id = uniqueFileId;
      image.image_id = fileId;
      image.user_id = userId;
      image.code = message.caption;

      await this.imagesSetter.add(image);
      ctx.reply(this.sceneLocaleService.getSuccessSaveMediaMessage(
        message.caption
      ));
      ctx.scene.leave();
      return;
    }

    await this.cacheScenesService.set(userId, {
      photoId: fileId,
      uniquePhotoId: uniqueFileId,
    }, { ttl: 10_000 });

    const isExisting = await this.imagesGetter.hasByUniqueId(
      userId,
      uniqueFileId,
    );

    ctx.reply(ctx.i18n.t('scenes.success_load_media', {
      entityName: 'фотографии'
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
  ) {
    ctx.scene.leave();
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

    ctx.reply(ctx.i18n.t('scenes.success_save_media', {
      code: message.text
    }));
  }
}
