import { Module } from '@nestjs/common';
import { InlineQueryController } from './InlineQueryController';
import { ImagesModule } from '../Images/ImagesModule';
import { StickersModule } from '../Stickers/StickersModule';
import { VideosModule } from '../Videos/VideosModule';
import { AnalyticsModule } from '../Analytics/AnalyticsModule';

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
