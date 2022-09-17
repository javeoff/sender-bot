import { Module } from '@nestjs/common';

import { BotExceptionFilter } from '@sendByBot/Error/filters/BotExceptionFilter';

@Module({
  providers: [BotExceptionFilter],
})
export class ErrorModule {}
