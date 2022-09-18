import { Ctx, Message, On, Sender, Update } from 'nestjs-telegraf';

import { TContext } from '@sendByBot/Common/types/TContext';
import { TMessage } from '@sendByBot/Common/types/TMessage';
import { ImagesController } from '@sendByBot/Images/ImagesController';
import { StickersController } from '@sendByBot/Stickers/StickersController';
import { VideosController } from '@sendByBot/Videos/VideosController';

@Update()
export class ForwardMessage {
  public constructor(
    private readonly imagesController: ImagesController,
    private readonly stickerController: StickersController,
    private readonly videosController: VideosController,
  ) {}

  @On('forward_date')
  public async onForward(
    @Ctx() ctx: TContext,
    @Sender('id') userId: string,
    @Message() message: TMessage,
  ): Promise<void> {
    console.log('1111');
    await this.videosController.onVideo(ctx, userId, message);
    await this.stickerController.onSticker(ctx, userId, message);
    await this.imagesController.onPhoto(ctx, userId, message);
  }
}
