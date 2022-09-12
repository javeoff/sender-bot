import { Ctx, Message, On, Sender, Update } from 'nestjs-telegraf';
import { TContext } from '../Common/types/TContext';
import { SceneName } from '../Scenes/enums/SceneName';
import { VideosGetter } from './services/VideosGetter';
import { EncodingService } from '../Encoding/services/EncodingService';
import { TMessage } from '../Common/types/TMessage';
import { CacheCallbackQueryService } from '../Cache/services/CacheCallbackQueryService';

@Update()
export class VideosController {
  constructor(
    private readonly videosGetter: VideosGetter,
    private readonly encodingService: EncodingService,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
  ) {
  }

  async onInlineQuery(
    @Ctx() ctx: TContext
  ) {
    const query = ctx.inlineQuery.query;
    const videos = await this.videosGetter.getByCode(
      String(ctx.from.id),
      query,
    );

    if (!videos?.length) {
      return [];
    }

    const queries: Record<string, unknown>[] = [];

    for (let video of videos) {
      const fileLink = await ctx.telegram.getFileLink(video.thumb_id);
      queries.push({
        type: 'video',
        title: '@sendstick_bot - ' + video.code,
        video_file_id: video.video_id,
        thumb_url: fileLink.toString(),
        id: this.encodingService.hash(video.id + video.video_id),
      })
    }

    return queries;
  }

  @On('video')
  async onVideo(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
    @Message() message: TMessage,
  ) {
    if (!('video' in message)) {
      return;
    }

    const video = message.video

    await this.cacheCallbackQueryService.set(userId, {
      variant: 'video',
      id: video.file_id,
      uniqueVideoId: video.file_unique_id
    }, { ttl: 10_000 });
    void ctx.scene.enter(SceneName.SEND_VIDEO_SCENE);
  }
}
