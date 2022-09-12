import { Ctx, Message, On, Sender, Update } from 'nestjs-telegraf';
import { TContext } from '../../Common/types/TContext';
import { TMessage } from '../../Common/types/TMessage';
import { isMessageWithText } from '../../Common/typeGuards/isMessageWithText';
import { StickersGetter } from '../../Stickers/services/StickersGetter';
import { VideosGetter } from '../../Videos/services/VideosGetter';
import { ImagesGetter } from '../../Images/services/ImagesGetter';
import { ImagesSender } from '../../Images/services/ImagesSender';
import { EditKeyboardService } from '../../InlineKeyboard/services/EditKeyboardService';
import { CacheCallbackQueryService } from '../../Cache/services/CacheCallbackQueryService';

@Update()
export class EditCommand {
  constructor(
    private readonly stickersGetter: StickersGetter,
    private readonly videosGetter: VideosGetter,
    private readonly imagesGetter: ImagesGetter,
    private readonly imagesSender: ImagesSender,
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
        })
        ctx.replyWithSticker(stickerId, {
          reply_markup: this.editKeyboardService.getEditKeyboard()
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
        })
        ctx.replyWithVideo(videoId, {
          reply_markup: this.editKeyboardService.getEditKeyboard()
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
        })
        ctx.replyWithPhoto(photoId, {
          reply_markup: this.editKeyboardService.getEditKeyboard()
        })
        break;
      }
    }
  }
}
