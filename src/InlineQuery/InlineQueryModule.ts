import { Module } from '@nestjs/common';

import { AnalyticsModule } from '@sendByBot/Analytics/AnalyticsModule';
import { ImagesModule } from '@sendByBot/Images/ImagesModule';
import { InlineQueryController } from '@sendByBot/InlineQuery/InlineQueryController';
import { StickersModule } from '@sendByBot/Stickers/StickersModule';
import { VideosModule } from '@sendByBot/Videos/VideosModule';

@Module({
  providers: [InlineQueryController],
  imports: [ImagesModule, StickersModule, VideosModule, AnalyticsModule],
})
export class InlineQueryModule {}
