import { Ctx, Message, On, Sender, Update } from 'nestjs-telegraf';

import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { TContext } from '@sendByBot/Common/types/TContext';
import { TInlineQueries } from '@sendByBot/Common/types/TInlineQueries';
import { TMessage } from '@sendByBot/Common/types/TMessage';
import { getPhotoFromMessage } from '@sendByBot/Common/utils/getPhotoFromMessage';
import { EncodingService } from '@sendByBot/Encoding/services/EncodingService';
import { ImagesGetter } from '@sendByBot/Images/services/ImagesGetter';
import { SceneName } from '@sendByBot/Scenes/enums/SceneName';

@Update()
export class ImagesController {
  public constructor(
    private readonly imagesGetter: ImagesGetter,
    private readonly encodingService: EncodingService,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
  ) {}

  public async onInlineQuery(@Ctx() ctx: TContext): Promise<TInlineQueries> {
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
    }));
  }

  @On('photo')
  public async onPhoto(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
    @Message() message: TMessage,
  ): Promise<void> {
    if (!('photo' in message)) {
      return;
    }

    const { file_id: fileId, file_unique_id: uniqueFileId } =
      getPhotoFromMessage(message);

    await this.cacheCallbackQueryService.set(
      userId,
      {
        variant: 'image',
        id: fileId,
        uniqueImageId: uniqueFileId,
        imageId: fileId,
      },
      { ttl: 10_000 },
    );

    await ctx.scene.enter(SceneName.SEND_PHOTO_SCENE);
  }
}
