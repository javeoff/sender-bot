import { SceneName } from '../enums/SceneName';
import { Ctx, Message, On, Scene, SceneEnter, Sender } from 'nestjs-telegraf';
import { VideoEntity } from '@sendByBot/Videos/entities/VideoEntity';
import { VideosGetter } from '@sendByBot/Videos/services/VideosGetter';
import { TMessage } from '@sendByBot/Common/types/TMessage';
import { VideosSetter } from '@sendByBot/Videos/services/VideosSetter';
import { SceneKeyboardService } from '@sendByBot/InlineKeyboard/services/SceneKeyboardService';
import { isMessageWithText } from '@sendByBot/Common/typeGuards/isMessageWithText';
import { TContext } from '@sendByBot/Common/types/TContext';
import { SceneLocaleService } from '@sendByBot/Scenes/services/SceneLocaleService';
import { CacheScenesService } from '@sendByBot/Cache/services/CacheScenesService';

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

    ctx.reply(ctx.i18n.t('scenes.success_load_media', {
      entityName: 'видео'
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

    ctx.reply(ctx.i18n.t('scenes.success_save_media', {
      code: message.text
    }));
  }
}
