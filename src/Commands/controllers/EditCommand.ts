import { Ctx, Message, On, Sender, Update } from 'nestjs-telegraf';

import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { isMessageWithText } from '@sendByBot/Common/typeGuards/isMessageWithText';
import { TContext } from '@sendByBot/Common/types/TContext';
import { TMessage } from '@sendByBot/Common/types/TMessage';
import { ImagesGetter } from '@sendByBot/Images/services/ImagesGetter';
import { EditKeyboardService } from '@sendByBot/InlineKeyboard/services/EditKeyboardService';
import { StickersGetter } from '@sendByBot/Stickers/services/StickersGetter';
import { VideosGetter } from '@sendByBot/Videos/services/VideosGetter';

@Update()
export class EditCommand {
  public constructor(
    private readonly stickersGetter: StickersGetter,
    private readonly videosGetter: VideosGetter,
    private readonly imagesGetter: ImagesGetter,
    private readonly editKeyboardService: EditKeyboardService,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
  ) {}

  @On('text')
  public async onCommand(
    @Ctx() ctx: TContext,
    @Message() message: TMessage,
    @Sender('id') userId: string,
  ): Promise<void> {
    if (!isMessageWithText(message)) {
      return;
    }

    if (!message.text.startsWith('/edit')) {
      return;
    }

    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const [cmdName, format, id] = message.text.split('_');

    switch (format) {
      case 'sticker': {
        const stickers = await this.stickersGetter.getById(userId, id);
        const sticker = stickers?.[0];

        if (!sticker) {
          return;
        }
        const stickerId = String(sticker.sticker_id);

        await this.cacheCallbackQueryService.set(
          userId,
          {
            variant: 'sticker',
            id: stickerId,
            uniqueStickerId: sticker.unique_sticker_id,
            stickerId: sticker.sticker_id,
          },
          { ttl: 10_000 },
        );
        await ctx.replyWithSticker(stickerId, {
          reply_markup: this.editKeyboardService.getEditKeyboard(ctx.i18n),
        });
        break;
      }
      case 'video': {
        const videos = await this.videosGetter.getById(userId, id);
        const video = videos?.[0];

        if (!video) {
          return;
        }
        const videoId = String(video.video_id);

        await this.cacheCallbackQueryService.set(
          userId,
          {
            variant: 'video',
            id: videoId,
            uniqueVideoId: video.unique_video_id,
            videoId: video.video_id,
          },
          { ttl: 10_000 },
        );
        await ctx.replyWithVideo(videoId, {
          reply_markup: this.editKeyboardService.getEditKeyboard(ctx.i18n),
        });
        break;
      }
      case 'image': {
        const images = await this.imagesGetter.getById(userId, id);
        const image = images?.[0];

        if (!image) {
          return;
        }
        const photoId = String(image.image_id);

        await this.cacheCallbackQueryService.set(
          userId,
          {
            variant: 'image',
            id: photoId,
            uniqueImageId: image.unique_image_id,
            imageId: image.image_id,
          },
          { ttl: 10_000 },
        );
        await ctx.replyWithPhoto(photoId, {
          reply_markup: this.editKeyboardService.getEditKeyboard(ctx.i18n),
        });
        break;
      }
    }
  }
}
