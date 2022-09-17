import { Module } from '@nestjs/common';
import { InlineKeyboardModule } from '@sendByBot/InlineKeyboard/InlineKeyboardModule';
import { UsersModule } from '@sendByBot/Users/UsersModule';
import { InlineQueryModule } from '@sendByBot/InlineQuery/InlineQueryModule';
import { ConfigModule } from '@sendByBot/Config/ConfigModule';
import { AppController } from '@sendByBot/AppController';
import { CommonModule } from '@sendByBot/Common/CommonModule';
import { StickersModule } from '@sendByBot/Stickers/StickersModule';
import { SceneModule } from '@sendByBot/Scenes/SceneModule';
import { TelegrafModule } from 'nestjs-telegraf';
import { AnalyticsModule } from '@sendByBot/Analytics/AnalyticsModule';
import { VideosModule } from '@sendByBot/Videos/VideosModule';
import { SystemErrorModule } from '@sendByBot/SystemError/SystemErrorModule';
import { ConfigService } from '@sendByBot/Config/services/ConfigService';
import { ConfigName } from '@sendByBot/Config/enums/ConfigName';
import { CallbackQueryModule } from '@sendByBot/CallbackQuery/CallbackQueryModule';
import { EncodingModule } from '@sendByBot/Encoding/EncodingModule';
import { CommandsModule } from '@sendByBot/Commands/CommandsModule';
import { i18nMiddleware } from '@sendByBot/Locale/middlewares/i18nMiddleware';
import { ImagesModule } from '@sendByBot/Images/ImagesModule';
import { sessionMiddleware } from '@sendByBot/Common/middlewares/sessionMiddleware';
import { ErrorModule } from '@sendByBot/Error/ErrorModule';
import { CacheModule } from '@sendByBot/Cache/CacheModule';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          token: configService.get(ConfigName.BOT_TOKEN),
          middlewares: [sessionMiddleware, i18nMiddleware],
        }
      },
      inject: [ConfigService],
    }),
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
  providers: [
    AppController,
  ],
})
export class AppModule {}
