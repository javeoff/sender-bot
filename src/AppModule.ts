import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';

import { AnalyticsModule } from '@sendByBot/Analytics/AnalyticsModule';
import { AppController } from '@sendByBot/AppController';
import { CacheModule } from '@sendByBot/Cache/CacheModule';
import { CallbackQueryModule } from '@sendByBot/CallbackQuery/CallbackQueryModule';
import { CommandsModule } from '@sendByBot/Commands/CommandsModule';
import { CommonModule } from '@sendByBot/Common/CommonModule';
import { sessionMiddleware } from '@sendByBot/Common/middlewares/sessionMiddleware';
import { ConfigModule } from '@sendByBot/Config/ConfigModule';
import { ConfigName } from '@sendByBot/Config/enums/ConfigName';
import { ConfigService } from '@sendByBot/Config/services/ConfigService';
import { EncodingModule } from '@sendByBot/Encoding/EncodingModule';
import { ErrorModule } from '@sendByBot/Error/ErrorModule';
import { ImagesModule } from '@sendByBot/Images/ImagesModule';
import { InlineKeyboardModule } from '@sendByBot/InlineKeyboard/InlineKeyboardModule';
import { InlineQueryModule } from '@sendByBot/InlineQuery/InlineQueryModule';
import { i18nMiddleware } from '@sendByBot/Locale/middlewares/i18nMiddleware';
import { LoggerModule } from '@sendByBot/Logger/LoggerModule';
import { SceneModule } from '@sendByBot/Scenes/SceneModule';
import { StickersModule } from '@sendByBot/Stickers/StickersModule';
import { SystemErrorModule } from '@sendByBot/SystemError/SystemErrorModule';
import { UsersModule } from '@sendByBot/Users/UsersModule';
import { VideosModule } from '@sendByBot/Videos/VideosModule';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          token: configService.get(ConfigName.BOT_TOKEN),
          middlewares: [sessionMiddleware, i18nMiddleware],
        };
      },
      inject: [ConfigService],
    }),
    LoggerModule,
    AnalyticsModule,
    CommonModule,
    SceneModule,
    UsersModule,
    VideosModule,
    StickersModule,
    ImagesModule,
    InlineKeyboardModule,
    InlineQueryModule,
    CallbackQueryModule,
    ConfigModule,
    EncodingModule,
    CacheModule,
    CommandsModule,
    ErrorModule,
    SystemErrorModule,
  ],
  providers: [AppController],
})
export class AppModule {}
