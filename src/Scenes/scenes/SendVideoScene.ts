import { SceneName } from '../enums/SceneName';
import { Ctx, Message, On, Scene, SceneEnter, Sender } from 'nestjs-telegraf';
import { TContext } from '../../Common/types/TContext';
import { SceneLocaleService } from '../services/SceneLocaleService';
import { isMessageWithText } from '../../Common/typeGuards/isMessageWithText';
import { TMessage } from '../../Common/types/TMessage';
import { VideoEntity } from '../../Videos/entities/VideoEntity';
import { VideosSetter } from '../../Videos/services/VideosSetter';
import { CacheScenesService } from '../../Cache/services/CacheScenesService';
import { VideosGetter } from '../../Videos/services/VideosGetter';
import { SceneKeyboardService } from '../../InlineKeyboard/services/SceneKeyboardService';

@Scene(SceneName.SEND_VIDEO_SCENE)
export class SendVideoScene {
  public constructor(
    private readonly mediaLocaleService: SceneLocaleService,
    private readonly videosSetter: VideosSetter,
    private readonly videosGetter: VideosGetter,
    private readonly sceneLocaleService: SceneLocaleService,
    private readonly cacheScenesService: CacheScenesService,
    private readonly sceneKeyboardService: SceneKeyboardService,
  ) {}

  @SceneEnter()
  async onSceneEnter(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
  ) {
    const message = ctx.message;

    if (!('video' in message)) {
      return;
    }

    const fileId = message.video.file_id;
    const uniqueFileId = message.video.file_unique_id;
    const caption = message.caption;
    const thumb = message.video.thumb;

    if (caption) {
      const video = new VideoEntity();
      video.unique_video_id = uniqueFileId;
      video.video_id = fileId;
      video.user_id = userId;
      video.code = message.caption;
      video.thumb_id = thumb.file_id;

      await this.videosSetter.add(video);
      ctx.reply(this.sceneLocaleService.getSuccessSaveMediaMessage(
        message.caption
      ));
      ctx.scene.leave();
      return;
    }

    await this.cacheScenesService.set(userId, {
      videoId: fileId,
      uniqueVideoId: uniqueFileId,
      thumbId: thumb.file_id,
    }, { ttl: 10_000 });

    const isExisting = await this.videosGetter.hasByUniqueId(
      userId,
      fileId,
    );

    ctx.reply(this.mediaLocaleService.getSuccessLoadMediaMessage(
      'видео'
    ), {
      reply_markup: this.sceneKeyboardService.getKeyboard(isExisting)
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

    if (!('videoId' in cache)) {
      return;
    }

    const video = new VideoEntity();
    video.unique_video_id = cache.uniqueVideoId;
    video.video_id = cache.videoId;
    video.user_id = userId;
    video.code = message.text;
    video.thumb_id = cache.thumbId;

    await this.videosSetter.add(video);

    ctx.reply(this.mediaLocaleService.getSuccessSaveMediaMessage(
      message.text
    ));
  }
}
