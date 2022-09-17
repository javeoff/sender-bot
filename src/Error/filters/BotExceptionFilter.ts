import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { isMessageWithText } from '@sendByBot/Common/typeGuards/isMessageWithText';
import { TContext } from '@sendByBot/Common/types/TContext';

@Catch()
export class BotExceptionFilter extends BaseExceptionFilter {
  async catch(error: Error, host: ArgumentsHost) {
    const ctx: TContext = host.getArgs()[0];
    const eventsChannelId = '@sendbybot_events'

    ctx.tg.sendMessage(
      eventsChannelId,
      `<b>Server 🚫 ERROR FOUND</b> \n` +
      `<b>User</b>: ${ctx.from.username}\n` +
      `<b>Message</b>: ${isMessageWithText(ctx.message) && ctx.message?.text}\n` +
      `<b>Error Message</b>: ${error.message}\n` +
      `<b>Error Trace</b>: ${error.stack}`,
      {
        parse_mode: 'HTML',
      }
    )

    ctx.reply('Произошла ошибка сервера.\nОбратитесь к администратору: @daniil_jave')
  }
}
