import { VideosGetter } from '@sendByBot/Videos/services/VideosGetter';
import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { Ctx, Message, On, Sender, Update } from 'nestjs-telegraf';
import { StickersGetter } from '@sendByBot/Stickers/services/StickersGetter';
import { isMessageWithText } from '@sendByBot/Common/typeGuards/isMessageWithText';
import { TContext } from '@sendByBot/Common/types/TContext';
import { EditKeyboardService } from '@sendByBot/InlineKeyboard/services/EditKeyboardService';
import { TMessage } from '@sendByBot/Common/types/TMessage';
import { ImagesGetter } from '@sendByBot/Images/services/ImagesGetter';

@Update()
export class EditCommand {
  constructor(
    private readonly stickersGetter: StickersGetter,
    private readonly videosGetter: VideosGetter,
    private readonly imagesGetter: ImagesGetter,
    private readonly editKeyboardService: EditKeyboardService,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService
  ) {}

  @On('text')
  async onCommand(
    @Ctx() ctx: TContext,
    @Message() message: TMessage,
    @Sender('id') userId: string
  ) {
    if (!isMessageWithText(message)) {
      return;
    }

    if (!message.text.startsWith('/edit')) {
      return;
    }

    const [cmdName, format, id] = message.text.split('_');

    switch(format) {
      case 'sticker': {
        const stickers = await this.stickersGetter.getById(userId, id);
        const sticker = stickers?.[0];
        if (!sticker) {
          return;
        }
        const stickerId = String(sticker.sticker_id);
        this.cacheCallbackQueryService.set(userId, {
          variant: 'sticker',
          id: stickerId,
          uniqueStickerId: sticker.unique_sticker_id
        }, { ttl: 10_000 })
        ctx.replyWithSticker(stickerId, {
          reply_markup: this.editKeyboardService.getEditKeyboard(ctx.i18n)
        })
        break;
      }
      case 'video': {
        const videos = await this.videosGetter.getById(userId, id);
        const video = videos?.[0];
        if (!video) {
          return;
        }
        const videoId = String(video.video_id);
        this.cacheCallbackQueryService.set(userId, {
          variant: 'video',
          id: videoId,
          uniqueVideoId: video.unique_video_id
        }, { ttl: 10_000 })
        ctx.replyWithVideo(videoId, {
          reply_markup: this.editKeyboardService.getEditKeyboard(ctx.i18n)
        })
        break;
      }
      case 'image': {
        const images = await this.imagesGetter.getById(userId, id);
        const image = images?.[0];
        if (!image) {
          return;
        }
        const photoId = String(image.image_id);
        this.cacheCallbackQueryService.set(userId, {
          variant: 'image',
          id: photoId,
          uniqueImageId: image.unique_image_id
        }, { ttl: 10_000 })
        ctx.replyWithPhoto(photoId, {
          reply_markup: this.editKeyboardService.getEditKeyboard(ctx.i18n)
        })
        break;
      }
    }
  }
}
