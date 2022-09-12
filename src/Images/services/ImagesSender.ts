import { Injectable } from '@nestjs/common';
import { TContext } from '../../Common/types/TContext';

@Injectable()
export class ImagesSender {
  send(ctx: TContext, imageId: string, options) {
    ctx.replyWithPhoto(imageId, options)
  }
}
