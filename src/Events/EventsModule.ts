import { Module } from '@nestjs/common';

import { ForwardMessage } from '@sendByBot/Events/events/ForwardMessage';
import { ImagesModule } from '@sendByBot/Images/ImagesModule';
import { StickersModule } from '@sendByBot/Stickers/StickersModule';
import { VideosModule } from '@sendByBot/Videos/VideosModule';

@Module({
  providers: [ForwardMessage],
  imports: [ImagesModule, VideosModule, StickersModule],
})
export class EventsModule {}
