import { Ctx, Message, On, Scene, SceneEnter } from 'nestjs-telegraf';

import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { CacheScenesService } from '@sendByBot/Cache/services/CacheScenesService';
import { isMessageWithText } from '@sendByBot/Common/typeGuards/isMessageWithText';
import { TContext } from '@sendByBot/Common/types/TContext';
import { TMessage } from '@sendByBot/Common/types/TMessage';
import { ImagesSetter } from '@sendByBot/Images/services/ImagesSetter';
import { SceneName } from '@sendByBot/Scenes/enums/SceneName';
import { StickersSetter } from '@sendByBot/Stickers/services/StickersSetter';
import { VideosSetter } from '@sendByBot/Videos/services/VideosSetter';

@Scene(SceneName.RENAME_CODE_SCENE)
export class RenameCodeScene {
  public constructor(
    private readonly cacheScenesService: CacheScenesService,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
    private readonly stickersSetter: StickersSetter,
    private readonly imagesSetter: ImagesSetter,
    private readonly videosSetter: VideosSetter,
  ) {}

  @SceneEnter()
  public onSceneEnter(@Ctx() ctx: TContext): void {
    void ctx.reply(ctx.i18n.t('scenes.confirm_code_rename'));
  }

  @On('text')
  public async onText(
    @Ctx() ctx: TContext,
    @Message() message: TMessage,
  ): Promise<void> {
    void ctx.scene.leave();
    if (!isMessageWithText(message)) {
      return;
    }

    const userId = String(ctx.from.id);
    const text = message.text;

    const cache = await this.cacheCallbackQueryService.get(userId);

    if (!cache) {
      return;
    }

    switch (cache.variant) {
      case 'sticker':
        await this.stickersSetter.change(
          {
            sticker_id: cache.id,
          },
          {
            code: text,
          },
        );
        break;
      case 'video':
        await this.videosSetter.change(
          {
            video_id: cache.id,
          },
          {
            code: text,
          },
        );
        break;
      case 'image':
        await this.imagesSetter.change(
          {
            image_id: cache.id,
          },
          {
            code: text,
          },
        );
        break;
    }

    void ctx.replyWithMarkdown(
      ctx.i18n.t('scenes.success_code_rename', {
        code: text,
      }),
    );
  }
}
