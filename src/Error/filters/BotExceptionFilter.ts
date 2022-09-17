import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { isMessageWithText } from '@sendByBot/Common/typeGuards/isMessageWithText';
import { TContext } from '@sendByBot/Common/types/TContext';
import { ConfigName } from '@sendByBot/Config/enums/ConfigName';
import { externalConfigService } from '@sendByBot/Config/services/ConfigService';
import { LoggerService } from '@sendByBot/Logger/services/LoggerService';

@Catch()
export class BotExceptionFilter extends BaseExceptionFilter {
  public constructor(private readonly logger: LoggerService) {
    super();
  }

  public catch(error: Error, host: ArgumentsHost): void {
    const ctx: TContext = host.getArgs()[0];

    const errorMessage =
      `<b>Server 🚫 ERROR FOUND</b> \n` +
      `<b>User</b>: ${ctx.from.username}\n` +
      `<b>Message</b>: ${
        isMessageWithText(ctx.message) && ctx.message?.text
      }\n` +
      `<b>Error Message</b>: ${error.message}\n` +
      `<b>Error Trace</b>: ${error.stack}`;

    this.logger.error(errorMessage);

    void ctx.tg.sendMessage(
      externalConfigService.get(ConfigName.EVENTS_CHANNEL_ID),
      errorMessage,
      {
        parse_mode: 'HTML',
      },
    );

    void ctx.reply(
      'Произошла ошибка сервера.\nОбратитесь к администратору: @daniil_jave',
    );
  }
}
