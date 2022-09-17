import { Module } from '@nestjs/common';
import { InlineQueryController } from '@sendByBot/InlineQuery/InlineQueryController';
import { StickersModule } from '@sendByBot/Stickers/StickersModule';
import { ImagesModule } from '@sendByBot/Images/ImagesModule';
import { VideosModule } from '@sendByBot/Videos/VideosModule';
import { AnalyticsModule } from '@sendByBot/Analytics/AnalyticsModule';

@Module({
  providers: [InlineQueryController],
  imports: [
    ImagesModule,
    StickersModule,
    VideosModule,
    AnalyticsModule,
  ],
})
export class InlineQueryModule {}
