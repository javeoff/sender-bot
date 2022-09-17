import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { TContext } from '../../Common/types/TContext';
import { isMessageWithText } from '../../Common/typeGuards/isMessageWithText';

@Catch()
export class BotExceptionFilter extends BaseExceptionFilter {
  async catch(error: Error, host: ArgumentsHost) {
    const ctx: TContext = host.getArgs()[0];

    ctx.tg.sendMessage(
      '1047424072',
      `<b>Server 🚫 ERROR FOUND</b> \n` +
      `<b>User</b>: ${ctx.from.username}\n` +
      `<b>Message</b>: ${isMessageWithText(ctx.message) && ctx.message?.text}\n` +
      `<b>Error Message</b>: ${error.message}\n` +
      `<b>Error Trace</b>: ${error.stack}`,
      {
        parse_mode: 'HTML',
      }
    )
    return 'Произошла ошибка сервера.\nОбратитесь к администратору: @daniil_jave';
  }
}
