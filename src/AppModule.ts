import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './AppController';
import { SceneModule } from './Scenes/SceneModule';
import { sessionMiddleware } from './Common/middlewares/sessionMiddleware';
import { StickersModule } from './Stickers/StickersModule';
import { VideosModule } from './Videos/VideosModule';
import { ImagesModule } from './Images/ImagesModule';
import { InlineQueryModule } from './InlineQuery/InlineQueryModule';
import { CommonModule } from './Common/CommonModule';
import { ConfigModule } from './Config/ConfigModule';
import { EncodingModule } from './Encoding/EncodingModule';
import { CallbackQueryModule } from './CallbackQuery/CallbackQueryModule';
import { CacheModule } from './Cache/CacheModule';
import { CommandsModule } from './Commands/CommandsModule';
import { InlineKeyboardModule } from './InlineKeyboard/InlineKeyboardModule';
import { UsersModule } from './Users/UsersModule';
import { i18nMiddleware } from './Locale/middlewares/i18nMiddleware';
import { AnalyticsModule } from './Analytics/AnalyticsModule';
import { ConfigService } from './Config/services/ConfigService';
import { ConfigName } from './Config/enums/ConfigName';
import { SystemErrorModule } from './SystemError/SystemErrorModule';
import { ErrorModule } from './Error/ErrorModule';

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
