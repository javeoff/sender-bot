import { Module } from '@nestjs/common';
import { InlineQueryController } from './InlineQueryController';
import { ImagesModule } from '../Images/ImagesModule';
import { StickersModule } from '../Stickers/StickersModule';
import { VideosModule } from '../Videos/VideosModule';

@Module({
  providers: [InlineQueryController],
  imports: [ImagesModule, StickersModule, VideosModule],
})
export class InlineQueryModule {}
