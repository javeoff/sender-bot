import { Ctx, Message, On, Sender, Update } from 'nestjs-telegraf';
import { TContext } from '../Common/types/TContext';
import { SceneName } from '../Scenes/enums/SceneName';
import { ImagesGetter } from './services/ImagesGetter';
import { EncodingService } from '../Encoding/services/EncodingService';
import { TMessage } from '../Common/types/TMessage';
import { CacheCallbackQueryService } from '../Cache/services/CacheCallbackQueryService';

@Update()
export class ImagesController {
  constructor(
    private readonly imagesGetter: ImagesGetter,
    private readonly encodingService: EncodingService,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
  ) {}

  async onInlineQuery(
    @Ctx() ctx: TContext,
  ) {
    const query = ctx.inlineQuery.query;
    const images = await this.imagesGetter.getByCode(
      String(ctx.from.id),
      query,
    );

    if (!images?.length) {
      return [];
    }

    return images.map((image) => ({
      type: 'photo',
      photo_file_id: image.image_id,
      id: this.encodingService.hash(image.id + image.image_id),
    }))
  }

  @On('photo')
  async onPhoto(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
    @Message() message: TMessage,
  ) {
    if (!('photo' in message)) {
      return;
    }

    const photo = message.photo[0];

    await this.cacheCallbackQueryService.set(userId, {
      variant: 'image',
      id: photo.file_id,
      uniqueImageId: photo.file_unique_id,
    }, { ttl: 10_000 });

    void ctx.scene.enter(SceneName.SEND_PHOTO_SCENE);
  }
}
