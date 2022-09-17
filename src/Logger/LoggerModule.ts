import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { WinstonOptionsFactory } from '@sendByBot/Logger/factories/WinstonOptionsFactory';
import { LoggerService } from '@sendByBot/Logger/services/LoggerService';

@Global()
@Module({
  providers: [LoggerService, WinstonOptionsFactory],
  exports: [LoggerService, WinstonOptionsFactory],
  imports: [
    WinstonModule.forRootAsync({
      inject: [WinstonOptionsFactory],
      useFactory: (optionsFactory: WinstonOptionsFactory) =>
        optionsFactory.create(),
    }),
  ],
})
export class LoggerModule {}
