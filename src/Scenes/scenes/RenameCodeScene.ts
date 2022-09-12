import { Ctx, Message, On, Scene, SceneEnter, Sender } from 'nestjs-telegraf';
import { TContext } from '../../Common/types/TContext';
import { isMessageWithText } from '../../Common/typeGuards/isMessageWithText';
import { TMessage } from '../../Common/types/TMessage';
import { CacheCallbackQueryService } from '../../Cache/services/CacheCallbackQueryService';
import { CacheScenesService } from '../../Cache/services/CacheScenesService';
import { SceneName } from '../enums/SceneName';
import { StickersSetter } from '../../Stickers/services/StickersSetter';
import { ImagesSetter } from '../../Images/services/ImagesSetter';
import { VideosSetter } from '../../Videos/services/VideosSetter';

@Scene(SceneName.RENAME_CODE_SCENE)
export class RenameCodeScene {
  constructor (
    private readonly cacheScenesService: CacheScenesService,
    private readonly cacheCallbackQueryService: CacheCallbackQueryService,
    private readonly stickersSetter: StickersSetter,
    private readonly imagesSetter: ImagesSetter,
    private readonly videosSetter: VideosSetter,
  ) {}

  @SceneEnter()
  public onSceneEnter(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
  ) {
    ctx.reply('Отправь новый код');
    console.log('cococococ');
  }

  @On('text')
  async onText(
    @Ctx() ctx: TContext,
    @Message() message: TMessage,
  ) {
    ctx.scene.leave();
    console.log('dfsdfsdf');
    if (!isMessageWithText(message)) {
      return;
    }

    const userId = String(ctx.from.id);
    const text = message.text;

    const cache = await this.cacheCallbackQueryService.get(userId);

    console.log('cache', cache);

    switch(cache.variant) {
      case 'sticker':
        await this.stickersSetter.change({
          sticker_id: cache.id
        }, {
          code: text
        })
        break;
      case 'video':
        await this.videosSetter.change({
          video_id: cache.id
        }, {
          code: text
        })
        break;
      case 'image':
        await this.imagesSetter.change({
          image_id: cache.id
        }, {
          code: text
        })
        break;
    }

    ctx.reply('Код успешно изменен\n Ввод: @sendstick_bot ' + text)
  }
}
