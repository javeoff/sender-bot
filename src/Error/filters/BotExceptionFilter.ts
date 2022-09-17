import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { isMessageWithText } from '@sendByBot/Common/typeGuards/isMessageWithText';
import { TContext } from '@sendByBot/Common/types/TContext';
import { externalConfigService } from '@sendByBot/Config/services/ConfigService';
import { ConfigName } from '@sendByBot/Config/enums/ConfigName';

@Catch()
export class BotExceptionFilter extends BaseExceptionFilter {
  async catch(error: Error, host: ArgumentsHost) {
    const ctx: TContext = host.getArgs()[0];

    ctx.tg.sendMessage(
      externalConfigService.get(ConfigName.EVENTS_CHANNEL_ID),
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
