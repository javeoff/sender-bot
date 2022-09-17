import { BotExceptionFilter } from './filters/BotExceptionFilter';
import { Module } from '@nestjs/common';

@Module({
  providers: [BotExceptionFilter],
})
export class ErrorModule {}
