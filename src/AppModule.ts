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
import { loadDotenv } from './Common/utils/loadDotenv';
import { CommandsModule } from './Commands/CommandsModule';
import { InlineKeyboardModule } from './InlineKeyboard/InlineKeyboardModule';
import { UsersModule } from './Users/UsersModule';
import { i18nMiddleware } from './Locale/middlewares/i18nMiddleware';

loadDotenv();

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN,
      middlewares: [sessionMiddleware, i18nMiddleware],
    }),
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
  ],
  providers: [
    AppController,
  ],
})
export class AppModule {}
