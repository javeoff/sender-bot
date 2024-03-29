import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';

import { LoggerLevel } from '@sendByBot/Logger/enums/LoggerLevel';

@Injectable()
export class LoggerService {
  public constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly winstonLogger: WinstonLogger,
  ) {}

  public error(text: string): void {
    this.log(LoggerLevel.ERROR, text);
  }

  public warn(text: string): void {
    this.log(LoggerLevel.WARNING, text);
  }

  public info(text: string): void {
    this.log(LoggerLevel.INFO, text);
  }

  private log(level: LoggerLevel, message: string): void {
    this.winstonLogger.log(
      level,
      JSON.stringify({
        message,
      }),
    );
  }
}
